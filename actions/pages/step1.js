export default {
  init: {
    grade: 1,
    classId: 1
  },
  
  selectGrade: $ => $.setState((payload, state) => ({
    grade: payload
  })),

  selectClass: $ => $.setState((payload, state) => ({
    classId: payload
  })),

  increaseStep: $ => $.dispatch(payload => ({
    type: 'views.stepper.increase'
  })) 
}