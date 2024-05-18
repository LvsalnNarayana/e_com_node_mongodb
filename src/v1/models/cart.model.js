import mongoose from "mongoose";
const { Schema } = mongoose;

const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required for cart items"],
    },
    variant: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: [true, "Variant reference is required for cart items"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    price: {
      type: Number,
      required: [true, "Price per item is required"],
    },
  },
  {
    _id: false,
  }
);

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    items: [CartItemSchema],
    total_items: {
      type: Number,
      default: 0,
    },
    total_price: {
      type: Number,
      default: 0,
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

CartSchema.pre("save", function (next) {
  this.total_items = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.total_price = this.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  this.modifiedAt = new Date();
  next();
});

CartSchema.statics.findCartByUserId = function (userId) {
  return this.findOne({ user: userId })
    .populate("items.product", "title description price")
    .populate("items.variant", "name price attributes");
};

CartSchema.statics.addToCart = async function (userId, productDetails) {
  const cart =
    (await this.findOne({ user: userId })) || new this({ user: userId });

  const { product, variant, quantity, price } = productDetails;
  let itemIndex = cart.items.findIndex(
    (item) =>
      item.product._id.toString() === product &&
      item.variant._id.toString() === variant
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product, variant, quantity, price });
  }

  return cart.save();
};

CartSchema.statics.updateItemQuantity = async function (
  userId,
  product,
  variant,
  quantity
) {
  const cart = await this.findOne({ user: userId });
  if (!cart) return;

  let itemIndex = cart.items.findIndex(
    (item) =>
      item.product._id.toString() === product &&
      item.variant._id.toString() === variant
  );

  if (itemIndex > -1 && quantity > 0) {
    cart.items[itemIndex].quantity = quantity;
  } else if (itemIndex > -1 && quantity === 0) {
    cart.items.splice(itemIndex, 1);
  }

  return cart.save();
};

CartSchema.statics.removeItem = async function (userId, product, variant) {
  const cart = await this.findOne({ user: userId })
    .populate("items.product", "title description price")
    .populate("items.variant", "name price attributes");

  if (!cart) return;

  cart.items = cart.items.filter(
    (item) =>
      item.product._id.toString() !== product ||
      item.variant._id.toString() !== variant
  );

  return cart.save();
};

CartSchema.statics.clearCart = function (userId) {
  return this.findOneAndUpdate(
    { user: userId },
    { items: [], totalItems: 0, totalPrice: 0 },
    { new: true }
  );
};

CartSchema.pre(/^find/, function (next) {
  this.populate("items.product", "title price images").populate(
    "items.variant",
    "name price attributes"
  );
  next();
});
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
