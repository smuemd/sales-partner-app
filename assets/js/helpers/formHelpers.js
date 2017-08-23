import powerform from 'powerform'

const UserformValidator = powerform({
  username: function (value) {
    if (!value) {
      return "Username can't be blank"
    }
  },
  password: function (value) {
    // Have to update after getting req from Martin/Stefan
    // if(value.length < 8) {
    //  return "This field must be at least 8 characters long."
    // }
    if (!value) {
      return "Password can't be blank"
    }
  }
})

export { UserformValidator }
