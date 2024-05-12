import mongoose from "mongoose";
import { isMobilePhone } from "validator";

const { Schema } = mongoose;

const PhoneNumberSchema = new Schema(
  {
    phone_number: {
      type: String,
      validate: {
        validator: function (v) {
          return isMobilePhone(v, "any", { strictMode: false });
        },
        message: props`${props.value} is not a valid phone number!`,
      },
    },
    country_code: {
      type: String,
      required: [true, "Country code is required"],
      match: [/^\+[1-9]{1}[0-9]{1,3}$/, "Please fill a valid country code"],
    },
    default_second_factor: { type: Boolean, default: false },
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

const Phone = mongoose.model("Phone", PhoneNumberSchema);

PhoneNumberSchema.statics.createPhoneNumber = async function (data) {
  try {
    const phone = await Phone.create(data);
    return phone;
  } catch (error) {}
};

PhoneNumberSchema.statics.getPhoneNumberById = async function (phoneNumberId) {
  try {
    const phone = await Phone.findById(phoneNumberId);
    return phone;
  } catch (error) {}
};

PhoneNumberSchema.statics.getPhoneNumberByNumber = async function (
  phoneNumber
) {
  try {
    const phone = await Phone.findOne({ phone_number: phoneNumber });
    return phone;
  } catch (error) {}
};

PhoneNumberSchema.statics.getAllPhoneNumberByUser = async function (userId) {
  try {
    const phone = await Phone.find({ linked_to: userId });
    return phone;
  } catch (error) {}
};

PhoneNumberSchema.statics.updatePhoneNumber = async function (
  phoneNumberId,
  data
) {
  try {
    const phone = await Phone.findByIdAndUpdate(phoneNumberId, data, {
      new: true,
    });
    return phone;
  } catch (error) {}
};

PhoneNumberSchema.statics.deletePhoneNumber = async function (phoneNumberId) {
  try {
    const phone = await Phone.findByIdAndDelete(phoneNumberId);
    return phone;
  } catch (error) {}
};

PhoneNumberSchema.statics.updateVerificationStatus = async function (
  phoneNumberId,
  status
) {
  try {
    return await this.findOneAndUpdate(
      { _id: phoneNumberId },
      { $set: { "verification.status": status } },
      { new: true }
    );
  } catch (error) {}
};

PhoneNumberSchema.statics.increaseVerificationAttempt = async function (
  phoneNumberId
) {
  try {
    return await this.findOneAndUpdate(
      { _id: phoneNumberId },
      { $inc: { "verification.attempts": 1 } },
      { new: true }
    );
  } catch (error) {}
};

PhoneNumberSchema.statics.resetVerificationAttempt = async function (
  phoneNumberId
) {
  try {
    return await this.findOneAndUpdate(
      { _id: phoneNumberId },
      { $set: { "verification.attempts": 0 } },
      { new: true }
    );
  } catch (error) {}
};

PhoneNumberSchema.statics.setDefaultTwoFactor = async function (
  phoneNumberId,
  status
) {
  try {
    await this.findOneAndUpdate(
      { _id: phoneNumberId },
      { $set: { default_second_factor: status } },
      { new: true }
    );

    await this.updateMany(
      { linked_to: userId, _id: { $ne: phoneNumberId } },
      { $set: { default_second_factor: false } }
    );

    return await this.findById(phoneNumberId);
  } catch (error) {}
};

export default Phone;
