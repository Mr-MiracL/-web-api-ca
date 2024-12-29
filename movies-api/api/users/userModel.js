import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;
const passwordValidator = function(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]).{8,}$/;
    return regex.test(password); 
  };
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: { 
    type: String, 
    required: true, 
    validate: {
      validator: passwordValidator, 
      message: 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.'
    }
  }
});
UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};
UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});

export default mongoose.model('User', UserSchema);
