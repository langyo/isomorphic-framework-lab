export default {
  init: {
    open: false
  },
  open: $ => $.setState(() => ({ open: true })),
  close: $ => $.setState(() => ({ open: false })),
  submit: $ => $.setState(() => ({ open: false }))
    .dispatch(payload => ({ type: 'pages.step2.addMember', payload }))
}