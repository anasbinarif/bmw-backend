const express = require("express");
const XLSX = require("xlsx");
const upload = require("../middleware/upload");
const ElectricCar = require("../models/ElectricCar");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Preprocess the data
        sheetData = sheetData.map((row) => ({
            ...row,
            FastCharge_KmH: row.FastCharge_KmH === "-" ? null : Number(row.FastCharge_KmH),
        }));

        // Insert Data into MongoDB
        await ElectricCar.insertMany(sheetData);

        res.status(200).json({ message: "Data uploaded successfully!" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload data" });
    }
});


module.exports = router;
