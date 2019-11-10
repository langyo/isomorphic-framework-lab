export default {
  init: {
    isOpen: false
  },
  open: $ => $.setState(() => ({ isOpen: true })),
  close: $ => $.setState(() => ({ isOpen: false })),
  submit: $ => $.setState(() => ({ isOpen: false }))
    .dispatch(payload => ({ type: 'pages.step2.addMember', payload }))
}