import types from './actionTypes';
import { createAction } from 'redux-actions';

export default {
  step1: {
    selectGrade: createAction(types.step1.selectGrade, grade => grade),
    selectClass: createAction(types.step1.selectClass, classId => classId)
  },
  step2: {
    openAddMemberDialog: createAction(types.step2.openAddMemberDialog),
    submitAndCloseDialog: createAction(types.step2.submitAndCloseDialog,
      (name, sex, reason) => ({name, sex, reason})),
    deleteMember: createAction(types.step2.deleteMember, id => id)
  },
  step3: {
    submitList: () => (dispatch, getState) => {
      fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          list: studentList,
          grade: grade,
          classId: classId
        })
      }).then(res => res.json()).then(json => {
        if(json.state === 'success') dispatch(changeState('success'));
        else dispatch(changeState(json.state));

        dispatch(fetchList());
      }).catch(err => {
        console.log(err);
        dispatch(changeState('fail'));
      });
    },
    fetchList: () => (dispatch, getState) => {

    },
    changeState: createAction(types.step3.changeState, state => state)
  }
};

export const changeBtnTextAsync = () => {
  return (dispatch, getState) => {
    if (!getState().isLoading) {
      dispatch(changeBtnText('正在加载中'));
    }
    axios.get('http://test.com').then(() => {
      if (getState().isLoading) {
        dispatch(changeBtnText('加载完毕'));
      }
    }).catch(() => {
      dispatch(changeBtnText('加载有误'));
    });
  };
};