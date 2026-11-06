const express = require("express");
const router = express.Router();

const MenuItems = require("./../models/MenuItems");
router.use(express.json());
// CREATE - Add a new menu item
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItems(data);

        const response = await newMenu.save();

        console.log("data saved");
        res.status(201).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});


// READ - Fetch all menu items
router.get("/", async (req, res) => {
    try {
        const data = await MenuItems.find();

        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});


// READ - Fetch menu items according to taste
router.get("/:TasteType", async (req, res) => {
    try {
        const TasteType = req.params.TasteType;

        if (["sweet", "spicey", "sour"].includes(TasteType)) {
            const response = await MenuItems.find({ taste: TasteType });

            console.log("response fetched");
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: "invalid taste" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});


// UPDATE - Update a menu item using ID
router.put("/:id", async (req, res) => {
    try {
        const itemId = req.params.id;
        const updateItemData = req.body;

        const response = await MenuItems.findByIdAndUpdate(
            itemId,
            updateItemData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({ error: "Item not found" });
        }

        console.log("data updated");
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});


// DELETE - Delete a menu item using ID
router.delete("/:id", async (req, res) => {
    try {
        const itemId = req.params.id;

        const response = await MenuItems.findByIdAndDelete(itemId);

        if (!response) {
            return res.status(404).json({ error: "Item not found" });
        }

        console.log("data deleted");
        res.status(200).json({ message: "Menu item deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});


// Export router
module.exports = router;