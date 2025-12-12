import { Schema, model, InferSchemaType } from "mongoose"

interface Ingredient {
  name: string
  amount: number
  unit: string
}

export interface IMenuItem extends Document {
  name: string
  description?: string
  price: number
  category?: string
  imageUrl?: string
  isAvailable: boolean
  tags?: string[]
  ingredients?: Ingredient[]
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
        name: { type: String, trim: true },
        amount: { type: Number, required: true },
        unit: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
)

export type MenuItem = InferSchemaType<typeof menuItemSchema>

const MenuItemModel = model<MenuItem>("MenuItem", menuItemSchema)

export default MenuItemModel
