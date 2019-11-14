export default {
  init: {
    studentList: []
  },
  
  openAddMemberDialog: $ => $.dispatch(payload => ({
    type: 'dialogs.addMemberDialog.open'
  })),
  addMember: $ => $.setState((payload, state) => {
    let studentList = state.pages.step2.studentList;
    studentList.push(payload);
    return { studentList };
  }),
  deleteMember: $ => $.setState((payload, state) => {
    let studentList = state.pages.step2.studentList;
    studentList.splice(payload, 1);
    return { studentList };
  }),

  submitList: $ => $.dispatch(payload => ({
    type: 'pages.step3.submitList'
  })),

  increaseStep: $ => $.dispatch(payload => ({
    type: 'views.stepper.increase'
  })),
  decreaseStep: $ => $.dispatch(payload => ({
    type: 'views.stepper.decrease'
  }))
}