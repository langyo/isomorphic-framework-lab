export default {
  init: {
    isOpen: false,

    name: '',
    password: '',

    networkState: 'ready'
  },
  open: $ => $.setState(() => ({ isOpen: true })),
  close: $ => $.setState(() => ({ isOpen: false })),
  setName: $ => $.setState(payload => ({ name: payload })),
  setPassword: $ => $.setState(payload => ({ password: payload })),
  login: $ => $.setState(() => ({ networkState: 'loading' }))
    .fetch({ host: 'localhost' })
    .route({ path: '/api/account/login' })
    .send((payload, state) => ({ name: state.dialogs.loginDialog.name, password: state.dialogs.loginDialog.password }))
    .handle((payload, context, reply) => {

    })
    .setState((payload, state) => ({
      networkState: 'ready',
      password: payload.state === 'success' ? '' : state.dialogs.loginDialog.password,
      open: payload.state !== 'success'
    }))
    .dispatch(payload => payload.state === 'success' ? ({ type: 'dialogs.successSnackbar.open' }) : ({ type: 'dialogs.failSnackbar.open' }))
}