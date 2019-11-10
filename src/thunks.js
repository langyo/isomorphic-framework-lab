const { actions } = require('./require');
const $ = require('./$');

let thunks = {};
let initState = { dialogs: {}, pages: {}, views: {} };

for (let type of ['dialogs', 'pages', 'views']) {
  for (let name of Object.keys(actions[type])) {
    for (let action of Object.keys(actions[type][name])) {
      if (action === 'init') {
        initState[type] = actions[type][name][action];
        continue;
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
              body: task.send ? task.send(payload, state) : {}
            }).then(res => res.json()).then(json => next(json, dispatch, state)));
            break;
          default:
            throw new Error('未知的流动作！');
        }
      }

      thunks[`${type}.${name}.${action}`] = payload => subThunks.reduce((prev, next) => prev(next), payload);
    }
  }
}

export { thunks, initState };