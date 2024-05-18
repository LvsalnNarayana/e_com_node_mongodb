import mongoose from "mongoose";
const { Schema } = mongoose;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Coupon description is required"],
    },
    discount_type: {
      type: String,
      required: [true, "Discount type is required"],
      enum: ["percentage", "fixed"],
    },
    discount_amount: {
      type: Number,
      required: [true, "Discount amount is required"],
      min: [0, "Discount amount cannot be negative"],
      validate: {
        validator: function (value) {
          if (this.discount_type === "percentage") {
            return value >= 0 && value <= 100;
          }
          return value >= 0;
        },
        message: (props) =>
          `${props.value} is not a valid discount amount for ${props.path}`,
      },
    },
    min_purchase_amount: {
      type: Number,
      default: 0,
    },
    max_discount_amount: {
      type: Number,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    start_date: {
      type: Date,
      required: [true, "Start date is required"],
    },
    expiration_date: {
      type: Date,
      required: [true, "Expiration date is required"],
    },
    usage_limit: {
      type: Number,
      default: 1,
    },
    usage_count: {
      type: Number,
      default: 0,
    },
    applicable_to: {
      products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
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
CouponSchema.pre("save", function (next) {
  this.active =
    new Date() >= this.start_date && new Date() <= this.expiration_date;
  next();
});

CouponSchema.statics.createCoupon = function (couponData) {
  const coupon = new this(couponData);
  return coupon.save();
};
CouponSchema.statics.updateCoupon = function (couponId, couponData) {
  return this.findByIdAndUpdate(couponId, couponData, { new: true });
};
CouponSchema.statics.deleteCoupon = function (couponId) {
  return this.findByIdAndDelete(couponId);
};
CouponSchema.statics.getCouponById = function (couponId) {
  return this.findById(couponId);
};
CouponSchema.statics.getCoupons = function () {
  return this.find();
};
CouponSchema.statics.getCouponByCode = function (couponCode) {
  return this.findOne({ code: couponCode });
};
CouponSchema.statics.getCouponsByCodes = function (couponCodes) {
  return this.find({ code: { $in: couponCodes } });
};
CouponSchema.statics.checkIfValid = function (productIds) {
  return this.find({
    active: true,
    expiration_date: { $gte: new Date() },
    usage_count: { $lt: this.usage_limit },
    applicable_to: {
      products: { $in: productIds },
    },
  });
};
CouponSchema.statics.incrementUsageCount = function (couponId) {
  return this.findByIdAndUpdate(
    couponId,
    { $inc: { usage_count: 1 } },
    { new: true }
  );
};
CouponSchema.statics.decrementUsageCount = function (couponId) {
  return this.findByIdAndUpdate(
    couponId,
    { $inc: { usage_count: -1 } },
    { new: true }
  );
};
CouponSchema.statics.resetUsageCount = function (couponId) {
  return this.findByIdAndUpdate(couponId, { usage_count: 0 }, { new: true });
};
CouponSchema.statics.resetUsageLimit = function (couponId, usageLimit) {
  return this.findByIdAndUpdate(
    couponId,
    { usage_limit: usageLimit },
    { new: true }
  );
};

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
