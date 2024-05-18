import mongoose from "mongoose";
const { Schema } = mongoose;
const InventoryItemSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product reference is required"],
  },
  variant_id: {
    type: Schema.Types.ObjectId,
    ref: "Variant",
    required: [true, "Variant reference is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity of inventory is required"],
    min: [0, "Inventory quantity cannot be negative"],
    default: 0,
  },
});
const InventorySchema = new Schema(
  {
    products: [InventoryItemSchema],
    name: {
      type: String,
      required: [true, "Inventory name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Inventory location is required"],
      trim: true,
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

// Pre hook for populating product and variant details
InventorySchema.pre("find", function (next) {
  this.populate("products.product_id", "title vendor").populate(
    "products.variant_id",
    "name price"
  );
  next();
});

// Static methods
InventorySchema.statics.addOrUpdateItem = async function (location, item) {
  const inventory = await this.findOne({ location });
  if (!inventory) {
    return await this.create({
      location,
      products: [item],
    });
  }

  const productIndex = inventory.products.findIndex(
    (p) =>
      p.product_id.equals(item.product_id) &&
      p.variant_id.equals(item.variant_id)
  );

  if (productIndex > -1) {
    inventory.products[productIndex].quantity += item.quantity;
  } else {
    inventory.products.push(item);
  }

  return inventory.save();
};

InventorySchema.statics.removeItem = async function (
  location,
  productId,
  variantId
) {
  const inventory = await this.findOne({ location });
  if (!inventory) return null;

  inventory.products = inventory.products.filter(
    (p) => !p.product_id.equals(productId) || !p.variant_id.equals(variantId)
  );
  return inventory.save();
};

InventorySchema.statics.getInventoryByLocation = function (location) {
  return this.findOne({ location });
};

InventorySchema.statics.adjustInventoryQuantity = async function (
  location,
  productId,
  variantId,
  quantity
) {
  const inventory = await this.findOne({ location });
  if (!inventory) return null;

  const product = inventory.products.find(
    (p) => p.product_id.equals(productId) && p.variant_id.equals(variantId)
  );

  if (product) {
    product.quantity = quantity;
    await inventory.save();
  }

  return product;
};

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;
