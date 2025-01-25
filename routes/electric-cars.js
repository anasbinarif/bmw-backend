const express = require("express");
const {getCarsWithFilters, deleteCarById} = require("../service/carService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, q, ...filters } = req.query;

        const data = await getCarsWithFilters({
            page,
            limit,
            searchQuery: q,
            filters
        });

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteCarById(id);
        if (result) {
            res.status(200).json({ message: "Car deleted successfully" });
        } else {
            res.status(404).json({ error: "Car not found" });
        }
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ error: "Failed to delete car" });
    }
});

module.exports = router;
