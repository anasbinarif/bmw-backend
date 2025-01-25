const ElectricCar = require("../models/ElectricCar");

const columnTypes = {
    Brand: "string",
    Model: "string",
    AccelSec: "number",
    TopSpeed_KmH: "number",
    Range_Km: "number",
    Efficiency_WhKm: "number",
    FastCharge_KmH: "number",
    RapidCharge: "string",
    PowerTrain: "string",
    PlugType: "string",
    BodyStyle: "string",
    Segment: "string",
    Seats: "number",
    PriceEuro: "number",
    Date: "date",
};

const getCars = async ({
    page,
    limit,
    searchQuery,
    filters
}) => {
    const skip = (page - 1) * limit;

    const query = {};

    if (searchQuery) {
        query.$or = [
            { Brand: { $regex: searchQuery, $options: "i" } },
            { Model: { $regex: searchQuery, $options: "i" } },
        ];
    }

    Object.entries(filters).forEach(([key, value]) => {
        const lastUnderscoreIndex = key.lastIndexOf("_");
        const column = key.substring(0, lastUnderscoreIndex);
        const operation = key.substring(lastUnderscoreIndex + 1);
        const columnType = columnTypes[column];

        if (column && operation) {
            switch (operation) {
                case "equals":
                    if (columnType === "number") {
                        query[column] = Number(value);
                    } else if (columnType === "date") {
                        query[column] = new Date(value);
                    } else {
                        query[column] = value;
                    }
                    break;

                case "contains":
                    if (columnType === "string") {
                        query[column] = { $regex: value, $options: "i" };
                    }
                    break;

                case "startsWith":
                    if (columnType === "string") {
                        query[column] = { $regex: `^${value}`, $options: "i" };
                    }
                    break;

                case "endsWith":
                    if (columnType === "string") {
                        query[column] = { $regex: `${value}$`, $options: "i" };
                    }
                    break;

                case "isEmpty":
                    query[column] = { $in: [null, ""] };
                    break;

                default:
                    break;
            }
        }
    });


    const cars = await ElectricCar.find(query).skip(skip).limit(Number(limit));
    const total = await ElectricCar.countDocuments(query);

    return {
        data: cars,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
    };
};

const deleteCar = async (id) => {
    const result = await ElectricCar.deleteOne({ _id: id });
    return result.deletedCount > 0;
};

module.exports = { getCars, deleteCar };
