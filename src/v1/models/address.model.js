import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    linked_to: [{ type: Schema.Types.ObjectId, ref: "User" }],
    street: { type: String, required: [true, "Street address is required"] },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      match: [/^\w{4,10}$/, "Please enter a valid postal code"],
    },
    country: { type: String, required: [true, "Country is required"] },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" },
    },
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
AddressSchema.statics.addNewAddress = async function (addressData) {
  try {
    return await Address.create(addressData);
  } catch (error) {}
};

AddressSchema.statics.getAddressById = async function (addressId) {
  try {
    return await Address.findById(addressId).populate();
  } catch (error) {}
};

AddressSchema.statics.getAllAddressesOfUser = async function (userId) {
  try {
    return await Address.find({ linked_to: userId }).populate();
  } catch (error) {}
};

AddressSchema.statics.deleteAddressById = async function (addressId) {
  try {
    return await Address.findByIdAndDelete(addressId);
  } catch (error) {}
};

AddressSchema.statics.updateAddressById = async function (
  addressId,
  addressData
) {
  try {
    return await Address.findByIdAndUpdate(addressId, addressData, {
      new: true,
    });
  } catch (error) {}
};

const Address = mongoose.model("Address", AddressSchema);

export default Address;
