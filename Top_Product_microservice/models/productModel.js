// models/productModel.js
const apiService = require('../services/apiService');

exports.fetchProductsByCategory = async (companyname, categoryname, accessToken) => {

    return await apiService.fetchProductsByCategory(companyname, categoryname, accessToken);
};

exports.fetchProductById = async (companyname, categoryname, productid, accessToken) => {
    return await apiService.fetchProductById(companyname, categoryname, productid, accessToken);
};
