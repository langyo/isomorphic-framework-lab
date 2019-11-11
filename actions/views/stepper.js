export default {
  init: {
    step: 0
  },
  
  increase: $ => $.setState((payload, state) => ({
    step: state.views.stepper.step + 1
  })).dispatch((payload, state) => ({ type: 'framework.togglePage', payload: `step${state.views.stepper.step + 2}` })),
  decrease: $ => $.setState((payload, state) => ({
    step: state.views.stepper.step - 1
  })).dispatch((payload, state) => ({ type: 'framework.togglePage', payload: `step${state.views.stepper.step + 2}` })),
  reset: $ => $.setState((payload, state) => ({
    step: 0
  }))
}