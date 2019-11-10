import { handleActions } from 'redux-actions';
import { thunks, initState } from './thunks';

export default handleActions({
  'framework.updateState': (action, state) => {
    const merge = (obj1, obj2) => {
      let ret  = {...obj1};
      for(let i of Object.keys(obj2)) {
        if(typeof ret[i] === 'object' && typeof obj2[i] === 'object') {
          ret[i] = merge(ret[i], obj2[i]);
        }
        else if(Array.isArray(obj2[i])) {
          ret[i] = Array.slice.prototype.call(obj2[i]);
        }
        else ret[i] = obj2[i];
      };
      return ret;
    }
    return merge(state, action.payload);
  },

  'framework.togglePage': (action, state) => ({
    ...state,
    renderPage: action.payload
  }),
  
  ...thunks
}, {
  ...initState,
  renderPage: 'step1' // 这里应当作为配置文件提供比较好
});
