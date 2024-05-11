import mongoose, {Schema,Document, Mongoose} from 'mongoose'

export interface Message extends Document{
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})


export interface User extends Document{
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptMessage: boolean;
  messages: Message[]

}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/.*?@?[^@]*\.+.*/, "please provide valid email"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  verifyCode: {
    type: String,
    required: [true, "verifycode is required"]
  },
  verifyCodeExpiry: {
    type: Date,
    required: true
  },
  isVerified: {
    type:Boolean,
    default: false
  },
  isAcceptMessage: {
    type: Boolean,
    default: true
  },
  messages: [MessageSchema]
})

  const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema)

  export default UserModel
