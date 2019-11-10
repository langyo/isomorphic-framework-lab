export default {
  init: {
    studentList: []
  },
  
  openAddMemberDialog: $ => $.dispatch(payload => ({
    type: 'dialog.addMemberDialog.open'
  })),
  addMember: $ => $.setState((payload, state) => {
    let studentList = state.pages.step2.studentList;
    studentList.push(payload);
    return { studentList };
  }),
  deleteMember: $ => $.setState((payload, state) => {
    let studentList = Array.prototype.slice.call(state.pages.step2.studentList);
    studentList.splice(payload, 1);
    return { studentList };
  })
}