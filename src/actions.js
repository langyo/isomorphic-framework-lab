import { createAction } from 'redux-actions';
import { thunks } from './thunks';

export default {
  framework: {
    updateState: createAction('framework.updateState'),
    togglePage: createAction('framework.togglePage')
  },
  dialogs: Object.keys(thunks.dialogs).reduce((prev, name) => ({
    ...prev,
    [name]: Object.keys(thunks.dialogs[name]).reduce(
      ((prev, action) => ({
        ...prev,
        [/\.(.*)$/.exec(action)[1]]: createAction(/\.(.*)$/.exec(action)[1])
      })), ({ })
    )
  })),
  views: Object.keys(thunks.views).reduce((prev, name) => ({
    ...prev,
    [name]: Object.keys(thunks.views[name]).reduce(
      ((prev, action) => ({
        ...prev,
        [/\.(.*)$/.exec(action)[1]]: createAction(/\.(.*)$/.exec(action)[1])
      })), ({ })
    )
  })),
  pages: Object.keys(thunks.pages).reduce((prev, name) => ({
    ...prev,
    [name]: Object.keys(thunks.pages[name]).reduce(
      ((prev, action) => ({
        ...prev,
        [/\.(.*)$/.exec(action)[1]]: createAction(/\.(.*)$/.exec(action)[1])
      })), ({ })
    )
  }))
};
