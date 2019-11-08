export default {
  increase: $ => $.setState((payload, state) => ({
    step: state.views.stepper.step + 1
  })),
  decrease: $ => $.setState((payload, state) => ({
    step: state.views.stepper.step - 1
  })),
  reset: $ => $.setState((payload, state) => ({
    step: 0
  }))
}