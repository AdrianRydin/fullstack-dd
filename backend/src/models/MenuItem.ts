import { Schema, model, InferSchemaType } from "mongoose";

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    isAvaliable: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export type MenuItem = InferSchemaType<typeof menuItemSchema>;

const MenuItemModel = model<MenuItem>("MenuItem", menuItemSchema);

export default MenuItemModel;
