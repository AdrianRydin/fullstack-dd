import { Router, Request, Response } from "express";
import MenuItemModel, { MenuItem } from "../models/MenuItem";

const router = Router();

// GET menu items

router.get("/", async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;

    const filter: Record<string, unknown> = {};
    if (!category) {
      filter.category = category;
    }

    const items: MenuItem[] = await MenuItemModel.find(filter).sort({
      createdAt: -1,
    });

    return res.json(items);
  } catch (err) {
    console.error("Error fetching menu items", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await MenuItemModel.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Menu item not found" });
    return res.json(item);
  } catch (err) {
    console.error("Error fetching menu item", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST menu item

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, imageUrl, isAvaliable, tags } =
      req.body as {
        name: string;
        description: string;
        price: number;
        category: string;
        imageUrl?: string;
        isAvaliable: boolean;
        tags?: string[];
      };

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ error: "name, price and category are required" });
    }

    const item = await MenuItemModel.create({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvaliable,
      tags,
    });
    return res.status(201).json(item);
  } catch (err) {
    console.error("Error creating menu item", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// PUT menu item by id

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updateData = req.body as Partial<MenuItem>;

    const item = await MenuItemModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    return res.json(item);
  } catch (err) {
    console.error("Error updating menu item:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/menu-items/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const item = await MenuItemModel.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("Error deleting menu item:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
