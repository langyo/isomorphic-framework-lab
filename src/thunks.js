const { actions } = require('./require');
const $ = require('./$');

let thunks = {};
let initState = { dialogs: {}, pages: {}, views: {} };

for (let type of ['dialogs', 'pages', 'views']) {
  for (let name of Object.keys(actions[type])) {
    for (let action of Object.keys(actions[type][name])) {
      if (action === 'init') {
        initState[type][name] = actions[type][name].init;
        continue;
      }

      let { taskList } = actions[type][name][action](new $());
      let subThunks = [];

      for (let task of taskList) {
        switch (task.type) {
          case 'setState':
            subThunks.push((payload, dispatch, state) => {
              dispatch({
                type: 'framework.updateState',
                payload: {
                  [type]: {
                    [name]: task.func(payload, state)
                  }
                }
              });
              return payload;
            });
            break;
          case 'dispatch':
            subThunks.push((payload, dispatch, state) => {
              dispatch(task.func(payload));
              return payload;
            });
            break;
          case 'fetchCombine':
            // 记得都改为 js 的 generator
            subThunks.push((payload, dispatch, state) => fetch(task.fetch.host + task.route.path, {
              ...task.fetch,
              body: task.send ? task.send(payload, state) : {}
            }).then(res => res.json()).then(json => next(json, dispatch, state)));
            break;
          default:
            throw new Error('未知的流动作！');
        }
      }

      thunks[`${type}.${name}.${action}`] = payload => (dispatch, getState) => {
        let ret = payload;
        for(let thunk of subThunks) {
          ret = thunk(ret, dispatch, getState());
          console.log(ret);
        }
      };
    }
  }
}

export { thunks, initState };
