import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    body_html: {
      type: String,
      required: [true, "Product description is required"],
    },
    vendor: {
      type: String,
      required: [true, "Vendor is required"],
      trim: true,
    },
    product_type: {
      type: String,
      required: [true, "Product type is required"],
      trim: true,
    },
    size: {
      type: String,
      required: [true, "Size is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    published_at: {
      type: Date,
      required: [true, "Published date is required"],
      default: Date.now,
    },
    tags: {
      type: [String],
      validate: [tagsArrayLimit, "{PATH} exceeds the limit of 10"],
    },
    status: {
      type: String,
      required: [true, "Product status is required"],
      enum: {
        values: ["active", "inactive", "archived"],
        message: "{VALUE} is not supported",
      },
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Variant",
      },
    ],
    images: [
      {
        src: { type: String, required: [true, "Image source is required"] },
        width: { type: Number },
        height: { type: Number },
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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
ProductSchema.pre(/^find/, function (next) {
  this.populate("variants").populate({
    path: "reviews",
    populate: {
      path: "user",
      select: "username firstname lastname email profile_image",
    },
  });
  next();
});

// Static method to search products by title, body_html, or tags
ProductSchema.statics.findBySearchCriteria = function ({
  title,
  body_html,
  tags,
}) {
  const query = {};
  if (title) query.title = new RegExp(title, "i");
  if (body_html) query.body_html = new RegExp(body_html, "i");
  if (tags) query.tags = { $in: tags };

  return this.find(query).populate("variants reviews");
};

// Static method to create a new product
ProductSchema.statics.createProduct = function (productData) {
  return this.create(productData);
};

// Static method to update a product
ProductSchema.statics.updateProduct = function (productId, updateData) {
  return this.findByIdAndUpdate(productId, updateData, { new: true });
};

// Static method to delete a product
ProductSchema.statics.deleteProduct = function (productId) {
  return this.findByIdAndDelete(productId);
};

// Static method to update product status
ProductSchema.statics.updateProductStatus = function (productId, status) {
  return this.findByIdAndUpdate(productId, { status }, { new: true });
};

//Static method to get product by Id
ProductSchema.statics.getProductById = function (productId) {
  return this.findById(productId)
};

const Product = mongoose.model("Product", ProductSchema);
export default Product;
