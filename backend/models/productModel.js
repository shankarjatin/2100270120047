// models/productModel.js
const axios = require('axios');
const { BASE_API_URL } = require('../config');

exports.fetchProductsByCategory = async (companyname, categoryname) => {
    const response = await axios.get(`${BASE_API_URL}/companies/${companyname}/categories/${categoryname}/products`);
    return response.data;
};

exports.fetchProductById = async (companyname, categoryname, productid) => {
    const response = await axios.get(`${BASE_API_URL}/companies/${companyname}/categories/${categoryname}/products/${productid}`);
    return response.data;
};
