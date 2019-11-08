let actionDialogsReq = require.context('../actions/dialogs', true, /\.js$/);
let actionPagesReq = require.context('../actions/page', true, /\.js$/);
let actionViewsReq = require.context('../actions/view', true, /\.js$/);

let actions = { dialogs: {}, pages: {}, views: {} };

actionDialogsReq.keys().forEach(key =>
  actions.dialogs[key.slice(3, key.length - 3).splice('/').reduce((prev, next) => `${prev}.${next}`)] = actionDialogsReq(key).default
);
actionPagesReq.keys().forEach(key =>
  actions.pages[key.slice(3, key.length - 3).splice('/').reduce((prev, next) => `${prev}.${next}`)] = actionPagesReq(key).default
);
actionViewsReq.keys().forEach(key =>
  actions.views[key.slice(3, key.length - 3).splice('/').reduce((prev, next) => `${prev}.${next}`)] = actionViewsReq(key).default
);

const componentDialogsReq = require.context('../components/dialogs', true, /\.js$/);
const componentViewsReq = require.context('../components/views', true, /\.js$/);
const componentsPagesReq = require.context('../components/pages', true, /\.js$/);

let components = { dialogs: {}, pages: {}, views: {} };

componentDialogsReq.keys().forEach(key => {
  const dfs = (path, obj) => {
    let n = path.unshift();
    if(path.length === 0) {
      obj[n] = componentDialogsReq(key).default;
    } else {
      if (obj[n]) obj[n] = dfs(path, obj[n]);
      else obj[n] = dfs(path, {});
    }
    return obj;
  }
  components.dialogs = dfs(key.slice(3, key.length - 3).splite('/'), components.dialogs);
});
componentsPagesReq.keys().forEach(key => {
  const dfs = (path, obj) => {
    let n = path.unshift();
    if(path.length === 0) {
      obj[n] = componentsPagesReq(key).default;
    } else {
      if (obj[n]) obj[n] = dfs(path, obj[n]);
      else obj[n] = dfs(path, {});
    }
    return obj;
  }
  components.pages = dfs(key.slice(3, key.length - 3).splite('/'), components.pages);
});
componentViewsReq.keys().forEach(key => {
  const dfs = (path, obj) => {
    let n = path.unshift();
    if(path.length === 0) {
      obj[n] = componentViewsReq(key).default;
    } else {
      if (obj[n]) obj[n] = dfs(path, obj[n]);
      else obj[n] = dfs(path, {});
    }
    return obj;
  }
  components.views = dfs(key.slice(3, key.length - 3).splite('/'), components.views);
});

module.exports = {
  actions,
  components
};