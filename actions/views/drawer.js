export default {
  init: {
    isOpen: false,
    rootMode: false,
    rootUserName: ''
  },

  open: $ => $.setState((payload, state) => ({
      isOpen: true
  })),
  close: $ => $.setState((payload, state) => ({
    isOpen: false
  })),
  allowRoot: $ => $.setState((paylaod, state) => ({
    rootMode: true,
    rootUserName: payload.name
  })),
  disallowRoot: $ => $.setState((paylaod, state) => ({
    rootMode: false,
    rootUserName: payload.name
  })),

  openAboutDialog: $ => $.dispatch(payload => ({ type: 'dialogs.aboutDialog.open' })),
  openLoginDialog: $ => $.dispatch(payload => ({ type: 'dialogs.loginDialog.open' }))
}