// services/apiService.js
const axios = require('axios');
const { BASE_API_URL } = require('../config');

const fetchProductsByCategory = async (companyname, categoryname, top = 10, minPrice = 0, maxPrice = Infinity, accessToken) => {
    try {
        const url = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
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
                'Authorization': `Bearer ${accessToken}`
            }
        });
      
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching product ${productid} for ${companyname} in category ${categoryname}: ${error.response.data.error}`);
    }
};

module.exports = {
    fetchProductsByCategory,
    fetchProductById
};
