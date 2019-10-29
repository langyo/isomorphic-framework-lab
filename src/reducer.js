import { handleActions } from 'redux-actions';
import types from './actionTypes';

const initialState = {
  activeStep: 0,
  drawerOpen: false,

  aboutDialogOpen: false,
  warnNoGradeOrClassDialogOpen: false,
  loginDialogOpen: false,
  addMemberDialogOpen: false,

  grade: null,
  classId: null,
  studentList: [],

  submitState: 'ready',

  fetchLatestState: 'ready',
  fetchLatestList: [],

  rootMode: false
};

export default handleActions({
  [types.increaseStep]: {
    next: (state, action) => ({
      ...state,
      activeStep: state.activeStep + 1
    }),
    throw: state => state
  },
  [types.decreaseStep]: {
    next: (state, action) => ({
      ...state,
      activeStep: state.activeStep - 1
    }),
    throw: state => state
  },
  [types.backToHeadStep]: {
    next: (state, action) => ({
      ...state,
      activeStep: 0
    }),
    throw: state => state
  },

  [types.openDrawer]: {
    next: (state, action) => ({
      ...state,
      drawerOpen: true
    }),
    throw: state => state
  },
  [types.closeDrawer]: {
    next: (state, action) => ({
      ...state,
      drawerOpen: false
    }),
    throw: state => state
  },

  [types.openAboutDialog]: {
    next: (state, action) => ({
      ...state,
      aboutDialogOpen: true
    }),
    throw: state => state
  },
  [types.closeAboutDialog]: {
    next: (state, action) => ({
      ...state,
      aboutDialogOpen: false
    }),
    throw: state => state
  },

  [types.openLoginDialog]: {
    next: (state, action) => ({
      ...state,
      loginDialogOpen: true
    }),
    throw: state => state
  },
  [types.closeLoginDialog]: {
    next: (state, action) => ({
      ...state,
      loginDialogOpen: false
    }),
    throw: state => state
  },

  [types.step1.selectGrade]: {
    next: (state, action) => ({
      ...state,
      grade: action.payload
    }),
    throw: state => state
  },
  [types.step1.selectClass]: {
    next: (state, action) => ({
      ...state,
      classId: action.payload
    }),
    throw: state => state
  },
  [types.step1.setWarnNoGradeOrClassDialog]: {
    next: (state, action) => ({
      ...state,
      warnNoGradeOrClassDialogOpen: action.payload
    }),
    throw: state => state
  },

  [types.step2.openAddMemberDialog]: {
    next: (state, action) => ({
      ...state,
      addMemberDialogOpen: true
    }),
    throw: state => state
  },
  [types.step2.closeAddMemberDialog]: {
    next: (state, action) => ({
      ...state,
      addMemberDialogOpen: false
    }),
    throw: state => state
  },
  [types.step2.submitAndCloseDialog]: {
    next: (state, action) => {
      let studentList = state.studentList;
      studentList.push({
        ...action.payload
      });
      return {
        ...state,
        addMemberDialogOpen: false,
        studentList
      }
    },
    throw: state => state
  },
  [types.step2.deleteMember]: {
    next: (state, action) => {
      let studentList = Array.prototype.slice.call(state.studentList);
      studentList.splice(action.payload, 1);
      return {
        ...state,
        studentList
      }
    },
    throw: state => state
  },

  [types.step3.changeState]: {
    next: (state, action) => ({
      ...state,
      submitState: action.payload
    }),
    throw: state => state
  },
  [types.step3.updateLatestList]: {
    next: (state, action) => ({
      ...state,
      fetchLatestList: action.payload
    }),
    throw: state => state
  },
  [types.step3.updateLatestListState]: {
    next: (state, action) => ({
      ...state,
      fetchLatestState: action.payload
    }),
    throw: state => state
  }
}, initialState);
