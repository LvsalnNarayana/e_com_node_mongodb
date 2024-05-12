import e from "express";
import mongoose from "mongoose";
import { isEmail } from "validator";

const { Schema } = mongoose;

const EmailAddressSchema = new Schema(
  {
    email_address: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      index: true,
      lowercase: true,
      validate: [isEmail, "Please fill a valid email address"],
    },
    verification: {
      status: {
        type: String,
        default: "UNVERIFIED",
        enum: ["VERIFIED", "UNVERIFIED"],
      },
      attempts: { type: Number, default: 0 },
    },
    linked_to: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret?._id?.toString();
        delete ret?._id;
        delete ret?.__v;
        return ret;
      },
      virtuals: true,
      getters: true,
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret?._id?.toString();
        delete ret?._id;
        delete ret?.__v;
        return ret;
      },
      virtuals: true,
      getters: true,
    },
    timestamps: true,
  }
);
EmailAddressSchema.statics.findByEmail = async function (email) {
  try {
    return this.findOne({ email_address: email });
  } catch (error) {}
};

EmailAddressSchema.statics.findAllEmailByUserId = async function (userId) {
  try {
    return this.find({ linked_to: userId });
  } catch (error) {}
};

EmailAddressSchema.statics.updateEmail = async function (emailId, data) {
  try {
    return this.findOneAndUpdate({ _id: emailId }, data, { new: true });
  } catch (error) {}
};

EmailAddressSchema.statics.deleteEmail = async function (emailId) {
  try {
    return this.findOneAndDelete({ _id: emailId });
  } catch (error) {}
};

EmailAddressSchema.statics.updateVerificationStatus = async function (
  emailId,
  status
) {
  try {
    return await this.findOneAndUpdate(
      { _id: emailId },
      { $set: { "verification.status": status } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

EmailAddressSchema.statics.increaseVerificationAttempt = async function (
  emailId
) {
  try {
    return await this.findOneAndUpdate(
      { _id: emailId },
      { $inc: { "verification.attempt": 1 } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

EmailAddressSchema.statics.resetVerificationAttempt = async function (emailId) {
  try {
    return await this.findOneAndUpdate(
      { _id: emailId },
      { $set: { "verification.attempt": 0 } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const Email = mongoose.model("Email", EmailAddressSchema);

export default Email;
