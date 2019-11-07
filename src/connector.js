const requireFuncDialogs = require.context('../components/dialogs', true, /\.js$/);
const requireFuncViews = require.context('../components/views', true, /\.js$/);
const requireFuncPages = require.context('../components/pages', true, /\.js$/);

let components = { dialogs: {}, pages: {}, views: {} };

requireFuncDialogs.keys().forEach(key => {
  const dfs = (path, obj) => {
    let n = path.unshift();
    if(path.length === 0) {
      obj[n] = requireFuncDialogs(key).default;
    } else {
      if (obj[n]) obj[n] = dfs(path, obj[n]);
      else obj[n] = dfs(path, {});
    }
    return obj;
  }
  components.dialogs = dfs(key.slice(3, key.length - 3).splite('/'), components.dialogs);
});
requireFuncPages.keys().forEach(key => {
  const dfs = (path, obj) => {
    let n = path.unshift();
    if(path.length === 0) {
      obj[n] = requireFuncPages(key).default;
    } else {
      if (obj[n]) obj[n] = dfs(path, obj[n]);
      else obj[n] = dfs(path, {});
    }
    return obj;
  }
  components.pages = dfs(key.slice(3, key.length - 3).splite('/'), components.pages);
});
requireFuncViews.keys().forEach(key => {
  const dfs = (path, obj) => {
    let n = path.unshift();
    if(path.length === 0) {
      obj[n] = requireFuncViews(key).default;
    } else {
      if (obj[n]) obj[n] = dfs(path, obj[n]);
      else obj[n] = dfs(path, {});
    }
    return obj;
  }
  components.views = dfs(key.slice(3, key.length - 3).splite('/'), components.views);
});

let connected = { dialogs: {}, pages: {}, views: {} }

for(let i of Object.keys(components.dialogs)) {
  connected.dialogs[i] = connect(
    state => ({ ...state.dialogs[i] }),
    dispatch => (Object.keys(actions.dialogs[i]).reduce((prev, next) => ({
      ...prev,
      [next]: arg => dispatch(actions.dialogs[i][next](arg))
    }), {}))
  )(components.dialogs[i]);
}
for(let i of Object.keys(components.views)) {
  connected.views[i] = connect(
    state => ({ ...state.views[i] }),
    dispatch => (Object.keys(actions.views[i]).reduce((prev, next) => ({
      ...prev,
      [next]: arg => dispatch(actions.views[i][next](arg))
    }), {}))
  )(components.views[i]);
}
for(let i of Object.keys(components.pages)) {
  connected.pages[i] = connect(
    state => ({ ...state.pages[i] }),
    dispatch => (Object.keys(actions.pages[i]).reduce((prev, next) => ({
      ...prev,
      [next]: arg => dispatch(actions.pages[i][next](arg))
    }), {}))
  )(components.pages[i]);
}

export default connected;