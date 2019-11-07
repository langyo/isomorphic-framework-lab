export default {
  init: {
    open: false,
    rootMode: false,
    rootUserName: ''
  },
  open: $ => $.setState((payload, state) => ({
    open: true
  })),
  close: $ => $.setState((payload, state) => ({
    open: false
  })),
  allowRoot: $ => $.setState((paylaod, state) => ({
    rootMode: true,
    rootUserName: payload.name
  })),
  disallowRoot: $ => $.setState((paylaod, state) => ({
    rootMode: false,
    rootUserName: payload.name
  }))
}