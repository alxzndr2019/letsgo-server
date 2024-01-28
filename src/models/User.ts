import mongoose, { Schema, model, connect, Types } from "mongoose";
import { CartItem } from "../lib/types";

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  passwordHash: string;
  events: Types.ObjectId;
  cart: CartItem[];
  isInfluencer: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  cart: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
  passwordHash: { type: String, required: true, minlength: 5 },
  isInfluencer: { type: Boolean, default: false },
});

export const User = mongoose.model<IUser>("User", userSchema);
