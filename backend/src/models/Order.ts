import { Schema, model, Document, Model, Types } from "mongoose";

export interface IOrderItem {
  menuItemId: Types.ObjectId;
  name: string;
  price: number;
  qty: number;
}

export type OrderStatus = "PENDING" | "LOCKED" | "READY" | "CANCELLED";
export type PaymentStatus ="PAID" | "REFUNDED" ;

export interface IOrder extends Document {
  items: IOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  customerName?: string;
  customerPhone?: string;
  customerId?: Types.ObjectId;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  menuItemId: {
    type: Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  name: String,
  price: Number,
  qty: Number,
});

const orderSchema = new Schema<IOrder>(
  {
    items: [orderItemSchema],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["PENDING", "LOCKED", "READY", "CANCELLED"],
      default: "PENDING",
    },
    customerName: String,
    customerPhone: String,
    customerId: { type: Schema.Types.ObjectId, ref: "User" },
    paymentStatus: {
      type: String,
      enum: ["PAID" , "REFUNDED"],
      default: "PAID",
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = model<IOrder>("Order", orderSchema);

export default Order;
