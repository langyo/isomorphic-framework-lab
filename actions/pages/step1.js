export default {
  selectGrade: $ => $.setState((payload, state) => ({
    grade: payload
  })),

  selectClass: $ => $.setState((payload, state) => ({
    classId: payload
  }))
}