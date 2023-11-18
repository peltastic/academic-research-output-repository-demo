import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  email: string;
  password: string;
  roles: string[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6 },
  roles: [{ type: String, enum: ["USER", "ADMIN"] }],
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 14);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
