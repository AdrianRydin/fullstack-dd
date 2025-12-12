import { Schema, model, InferSchemaType } from "mongoose"

export interface IInventoryItem extends Document {
  name: string
  quantity: number
  unit: string
}

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

export type InventoryItem = InferSchemaType<typeof inventorySchema>

const InventoryModel = model<InventoryItem>("Inventory", inventorySchema)

export default InventoryModel
