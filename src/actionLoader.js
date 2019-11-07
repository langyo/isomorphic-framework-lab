class $ {
  constructor() {
    this.taskList = [];
    this.fetchCache = {};
  }

  setState(func) {
    this.taskList.push({ type: 'setState', func });
    return this;
  }

  dispatch(func) {
    this.taskList.push({ type: 'dispatch', func });
    return this;
  }

  fetch(opinion) {
    this.fetchCache.fetch = opinion;
    return this;
  }

  send(func) {
    this.fetchCache.send = func;
    return this;
  }

  route(opinion) {
    this.fetchCache.route = opinion;
    return this;
  }

  handle(func) {
    this.fetchCache.handle = func;
    if (!(this.fetchCache.fetch && this.fetchCache.send && this.fetchCache.route)) throw new Error('必须提供完整的请求流！');
    this.taskList.push({ type: 'fetchCombine', ...this.fetchCache });
    this.fetchCache = {};
    return this;
  }
}

let dialogActionsRequireFunc = require.context('../actions/dialogs', true, /\.js$/);
let pageActionsRequireFunc = require.context('../actions/page', true, /\.js$/);
let viewActionsRequireFunc = require.context('../actions/view', true, /\.js$/);
let actions = { dialogs: {}, pages: {}, views: {} };
dialogActionsRequireFunc.keys().forEach(key =>
  actions.dialogs[key.slice(3).splice('/').reduce((prev, next) => `${prev}.${next}`)] = dialogActionsRequireFunc(key).default
);
pageActionsRequireFunc.keys().forEach(key =>
  actions.pages[key.slice(3).splice('/').reduce((prev, next) => `${prev}.${next}`)] = pageActionsRequireFunc(key).default
);
viewActionsRequireFunc.keys().forEach(key =>
  actions.views[key.slice(3).splice('/').reduce((prev, next) => `${prev}.${next}`)] = viewActionsRequireFunc(key).default
);
console.log(actions);

let thunks = {}, services = {}, initState = { dialogs: {}, pages: {}, views: {} };

for (let type of ['dialogs', 'pages', 'views']) {
  for (let name of Object.keys(actions[type])) {
    for (let action of Object.keys(actions[type][name])) {
      if (typeof actions[type][name][action] !== 'function') {
        if (action === 'init') initState[type] = actions[type][name][action];
        else throw Error('你应当使用只有一个参数的函数进行流式响应动作。');
      }

      let { taskList } = actions[type][name][action](new $());
      let subThunks = [];

      for (let task of taskList) {
        switch (task.type) {
          case 'setState':
            subThunks.push(next => (payload, dispatch, state) => {
              dispatch({
                type: 'framework.updateState',
                payload: {
                  views: {
                    [name]: task.func(payload, state)
                  }
                }
              });
              next(payload, dispatch, state);
            });
            break;
          case 'dispatch':
            subThunks.push(next => (payload, dispatch, state) => {
              dispatch(task.func(payload));
              next(payload, dispatch, state);
            });
            break;
          case 'fetchCombine':
            subThunks.push(next => (payload, dispatch, state) => fetch(task.fetch.host + task.route.path, {
              ...task.fetch,
              body: task.send(payload, state)
            }).then(res => res.json()).then(json => next(json, dispatch, state)));
            services[task.route.path] = context => (req, res) => task.handle(req.body, context, json => {
              res.send(JSON.stringify(json));
              res.end();
            });
            break;
          default:
            throw new Error('未知的流动作！');
        }
      }

      thunks[`${task}.${name}.${action}`] = payload => subThunks.reduce((prev, next) => prev(next), payload);
    }
  }
}

module.exports = {
  thunks,
  services,
  initState
};