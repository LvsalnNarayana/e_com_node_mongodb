import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    variant: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: [true, "Variant reference is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating can be at most 5"],
      validate: {
        validator: Number.isInteger,
        message: "Rating must be an integer",
      },
    },
    review_text: {
      type: String,
      required: [true, "Review text is required"],
      maxlength: [5000, "Review text cannot be more than 5000 characters"],
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

// Pre hook for populating user and product details
reviewSchema.pre(/^find/, function (next) {
  this.populate("user", "name email")
    .populate("product", "title description")
    .populate("variant", "name");
  next();
});

// Static methods
reviewSchema.statics.createReview = async function ({
  user,
  product,
  variant,
  rating,
  review_text,
}) {
  const review = await this.create({
    user,
    product,
    variant,
    rating,
    review_text,
  });
  return review;
};

reviewSchema.statics.updateReview = async function (reviewId, updateData) {
  const review = await this.findByIdAndUpdate(reviewId, updateData, {
    new: true,
  });
  return review;
};

reviewSchema.statics.getReviews = async function (productId) {
  return await this.find({ product: productId });
};

reviewSchema.statics.getReview = async function (reviewId) {
  return await this.findById(reviewId);
};

reviewSchema.statics.deleteReview = async function (reviewId) {
  return await this.findByIdAndDelete(reviewId);
};
const Review = mongoose.model("Review", reviewSchema);
export default Review;
