import mongoose from "mongoose";
const { Schema } = mongoose;

const VariantSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: [
      {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
      },
    ],
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    taxable: {
      type: Boolean,
      required: true,
    },
    barcode: {
      type: String,
      required: true,
    },
    grams: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    weight_unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "lb", "oz"],
    },
    inventory: [
      {
        inventory_id: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        location_id: {
          type: Number,
          required: true,
        },
        inventory_item_id: {
          type: Number,
          required: true,
        },
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

// Static methods
VariantSchema.statics.findBySKU = function (sku) {
  return this.findOne({ sku });
};

VariantSchema.statics.listByProduct = function (productId) {
  return this.find({ product: productId }).populate("product");
};

// Instance methods
VariantSchema.methods.updatePrice = function (newPrice) {
  this.price.amount = newPrice;
  return this.save();
};

VariantSchema.methods.adjustInventory = function (inventoryAdjustment) {
  const inventoryIndex = this.inventory.findIndex(
    (inv) => inv.inventory_item_id === inventoryAdjustment.inventory_item_id
  );
  if (inventoryIndex > -1) {
    this.inventory[inventoryIndex].quantity += inventoryAdjustment.quantity;
  } else {
    this.inventory.push(inventoryAdjustment);
  }
  return this.save();
};

// Pre-find middleware to populate references
VariantSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "title description",
  });
  next();
});
// Pre-save hook for creating SKU
VariantSchema.pre("save", async function (next) {
  if (!this.isModified("sku")) {
    this.sku = `${this.model}-${this.size}-${new Date().getTime()}`;
    // Ensure SKU uniqueness
    const exists = await Variant.findOne({ sku: this.sku });
    if (exists) {
      this.sku += `-${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  next();
});

const Variant = mongoose.model("Product", VariantSchema);
export default Variant;
