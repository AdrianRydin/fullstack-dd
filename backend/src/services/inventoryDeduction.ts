// src/services/inventoryDeduction.ts
import Inventory from "../models/Inventory"
import MenuItem from "../models/MenuItem"
import { IOrder } from "../models/Order"

export async function deductInventory(order: IOrder) {
  for (const orderItem of order.items) {
    const menuItem = await MenuItem.findById(orderItem.menuItemId)

    if (!menuItem || !menuItem.ingredients) {
      continue
    }

    const qty = orderItem.qty

    for (const ing of menuItem.ingredients) {
      const totalAmount = ing.amount * qty

      //Inventory är inte case sensitive
      const invItem = await Inventory.findOne({
        name: new RegExp(`^${ing.name}$`, "i"),
      })

      if (!invItem) {
        throw new Error(`Ingredient missing: ${ing.name}`)
      }

      if (invItem.quantity < totalAmount) {
        throw new Error(
          `Insufficient stock for ${ing.name}. Needed: ${totalAmount}, Available: ${invItem.quantity}`
        )
      }

      invItem.quantity -= totalAmount
      await invItem.save()
    }
  }
}
