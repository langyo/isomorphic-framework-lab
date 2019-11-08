import { connected } from './require';

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