const {getCars, deleteCar} = require("../repository/carRepository");
const getCarsWithFilters = async (filters) => {
    return await getCars(filters);
};

const deleteCarById = async (id) => {
    return await deleteCar(id);
};

module.exports = { getCarsWithFilters, deleteCarById };
