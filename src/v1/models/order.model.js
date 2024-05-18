import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: {
    type: Schema.Types.ObjectId,
    ref: "Variant",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [OrderProductSchema],
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "dispatched", "delivered", "cancelled"],
      default: "pending",
    },
    payment_method: {
      type: String,
      enum: ["cod", "credit_card", "paypal", "stripe"],
      default: "cod",
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    shipping_address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    billing_address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    actual_delivery_date: Date,
    estimated_delivery_time: Date,
    delivery_charge: {
      type: Number,
      default: 0,
    },
    coupon_id: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
    discount_amount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    grand_total: {
      type: Number,
      required: true,
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

// Create Order from Cart
OrderSchema.statics.createOrderFromCart = async function (cartId, userId) {
  const Cart = mongoose.model("Cart");
  const cart = await Cart.findById(cartId).populate(
    "items.product items.variant"
  );
  if (!cart) throw new Error("Cart not found");

  const products = cart.items.map((item) => ({
    product: item.product._id,
    variant: item.variant._id,
    quantity: item.quantity,
    price: item.variant.price,
  }));

  const order = new this({
    user: userId,
    products: products,
    total_price: cart.total_price,
    shipping_address: cart.shipping_address,
    billing_address: cart.billing_address,
    grand_total:
      cart.total_price -
      (cart.discount_amount || 0) +
      (cart.tax || 0) +
      (cart.delivery_charge || 0),
  });

  await order.save();
  return order;
};

// Update Order Status
OrderSchema.methods.updateOrderStatus = function (newStatus) {
  if (!["dispatched", "delivered", "cancelled"].includes(newStatus)) {
    throw new Error("Invalid status update");
  }
  this.status = newStatus;
  return this.save();
};

// Update Payment Status
OrderSchema.methods.updatePaymentStatus = function (newPaymentStatus) {
  if (!["completed", "failed", "refunded"].includes(newPaymentStatus)) {
    throw new Error("Invalid payment status update");
  }
  this.payment_status = newPaymentStatus;
  return this.save();
};

// Static method to fetch orders by user
OrderSchema.statics.findOrdersByUser = function (userId) {
  return this.find({ user: userId })
    .populate("user", "username email")
    .populate("products.product")
    .populate("products.variant");
};

OrderSchema.pre(/^find/, function (next) {
  // This will automatically populate the 'user', 'products.product', 'products.variant',
  // 'shipping_address', and 'billing_address' whenever a find operation is initiated
  this.populate({
    path: "user",
    select: "username email -_id",
  })
    .populate({
      path: "products.product",
      select: "title vendor product_type status -_id",
    })
    .populate({
      path: "products.variant",
      select: "size model price -_id",
    })
    .populate({
      path: "shipping_address",
      select: "street city state postalCode country -_id",
    })
    .populate({
      path: "billing_address",
      select: "street city state postalCode country -_id",
    });

  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
