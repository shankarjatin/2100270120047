// services/apiService.js
const axios = require('axios');
const { BASE_API_URL } = require('../config');

const fetchProductsByCategory = async (companyname, categoryname, accessToken) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/companies/${companyname}/categories/${categoryname}/products`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`  // Use the provided access token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching products for ${companyname} in category ${categoryname}: ${error.message}`);
    }
};

const fetchProductById = async (companyname, categoryname, productid, accessToken) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/companies/${companyname}/categories/${categoryname}/products/${productid}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`  // Use the provided access token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching product ${productid} for ${companyname} in category ${categoryname}: ${error.message}`);
    }
};

module.exports = {
    fetchProductsByCategory,
    fetchProductById
};
