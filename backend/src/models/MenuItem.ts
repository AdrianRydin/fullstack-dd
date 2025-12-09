import { Schema, model, InferSchemaType } from "mongoose"

export interface IMenuItem extends Document {
  name: string
  description?: string
  price: number
  category?: string
  imageUrl?: string
  isAvailable: boolean
  ingredients: string[]
}

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
    ingredients: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
)

export type MenuItem = InferSchemaType<typeof menuItemSchema>

const MenuItemModel = model<MenuItem>("MenuItem", menuItemSchema)

export default MenuItemModel
