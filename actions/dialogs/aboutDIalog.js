export default {
  init: {
    open: false
  },
  open: $ => $.setState(() => ({ open: true })),
  close: $ => $.setState(() => ({ open: false }))
}