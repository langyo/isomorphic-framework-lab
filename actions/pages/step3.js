export default {
  init: {
    submitState: 'ready',
    fetchLatestReportState: 'ready',

    latestReportList: []
  },

  changeState: $ => $.setState((payload, state) => ({
    submitState: payload
  })),
  updateLatestReportListState: $ => $.setState((payload, state) => ({
    fetchLatestState: payload
  })),

  backToHeadStep: $ => $.dispatch(payload => ({
    type: 'views.stepper.reset'
  })),

  submitList: $ => $.dispatch(payload => ({
    type: 'pages.step3.changeState',
    payload: 'loading'
  }))
  .fetch({
    host: ''
  })
  .send((payload, state) => ({
      list: state.pages.step2.studentList,
      grade: state.pages.step1.grade,
      classId: state.pages.step1.classId
  }))
  .route({ path: '/api/submit' })
  .handle((payload, context, replyFunc) => {
    console.log('[handle]:', payload)
    for(let i of payload.list) {
      (new context.db.logger({
        name: i.name,
        sex: i.sex,
        reason: i.reason,
        grade: req.body.grade,
        classId: req.body.classId
      })).save(err => {
        if(err) {
          replyFunc({ state: 'error' });
          return;
        }
      });
    }
    replyFunc({ state: 'success' });
  })
  .dispatch(payload => ({
    type: 'pages.step3.changeState',
    payload: payload.state
  }))
}