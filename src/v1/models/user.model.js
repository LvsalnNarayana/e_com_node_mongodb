import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const UserSchema = new Schema({
  primary_email_address_id: {
    type: Schema.Types.ObjectId,
    ref: "EmailAddress",
  },
  primary_phone_number_id: { type: Schema.Types.ObjectId, ref: "PhoneNumber" },
  username: {
    type: String,
    unique: true,
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  profile_image_url: String,
  image_url: String,
  password: String,
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  has_image: { type: Boolean, default: false },
  email_addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Email",
    },
  ],
  phone_numbers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Phone",
    },
  ],
  password_enabled: { type: Boolean, default: false },
  two_factor_enabled: { type: Boolean, default: false },
  last_sign_in_at: Number,
  banned: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  verification_attempts_remaining: { type: Number, default: 3 },
  delete_self_enabled: { type: Boolean, default: false },
  last_active_at: Number,
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  }
  next();
});
const User = mongoose.model("User", UserSchema);

UserSchema.statics = {
  createUser: async function (userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {}
  },

  getUserById: async function (userId) {
    try {
      return await User.findById(userId);
    } catch (error) {}
  },

  getAllUsers: async function () {
    try {
      return await User.find();
    } catch (error) {}
  },

  updateUserById: async function (userId, updatedData) {
    try {
      return await User.findByIdAndUpdate(userId, updatedData, { new: true });
    } catch (error) {}
  },

  deleteUserById: async function (userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {}
  },

  updateProfilePicture: async function (userId, imageUrl) {
    try {
      return await User.findByIdAndUpdate(userId, {
        profile_image_url: imageUrl,
        has_image: true,
      });
    } catch (error) {}
  },

  togglePasswordEnabled: async function (userId) {
    const user = await this.findById(userId);
    if (!user) throw new Error("User not found");
    user.password_enabled = !user.password_enabled;
    await user.save();
    return user;
  },

  updatePassword: async function (userId, password) {
    try {
      return await User.findByIdAndUpdate(userId, {
        password,
      });
    } catch (error) {}
  },

  toggleTwoFactor: async function (userId) {
    const user = await this.findById(userId);
    if (!user) throw new Error("User not found");
    user.two_factor_enabled = !user.two_factor_enabled;
    await user.save();
    return user;
  },

  toggleDeleteSelf: async function (userId) {
    try {
      return await User.findByIdAndUpdate(userId, {
        delete_self_enabled: !User.delete_self_enabled,
      });
    } catch (error) {}
  },

  toggleBan: async function (userId) {
    const user = await this.findById(userId);
    if (!user) throw new Error("User not found");
    user.banned = !user.banned;
    await user.save();
    return user;
  },

  toggleLock: async function (userId) {
    const user = await this.findById(userId);
    if (!user) throw new Error("User not found");
    user.locked = !user.locked;
    await user.save();
    return user;
  },

  updateLastActiveAt: async function (userId) {
    try {
      return await User.findByIdAndUpdate(userId, {
        last_active_at: Date.now(),
      });
    } catch (error) {}
  },

  updateLastSignInAt: async function (userId) {
    try {
      return await User.findByIdAndUpdate(userId, {
        last_sign_in_at: Date.now(),
      });
    } catch (error) {}
  },

  updateVerificationAttemptsRemaining: async function (userId) {
    try {
      return await User.findByIdAndUpdate(userId, {
        verification_attempts_remaining:
          User.verification_attempts_remaining - 1,
      });
    } catch (error) {}
  },
};

export default User;
