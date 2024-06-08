// controllers/productController.js
const productModel = require('../models/productModel');
const { paginate } = require('../utils/pagination');
const { sortProducts } = require('../utils/sorting');
const apiService = require('../services/apiService');
const { COMPANIES, CATEGORIES } = require('../config');

exports.getTopProducts = async (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top = 10, minPrice = 0, maxPrice = Infinity } = req.query;
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!COMPANIES.includes(companyname) || !CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid company name or category name' });
    }

    try {
        // Fetch products from the external test server
        let products = await apiService.fetchProductsByCategory(companyname, categoryname, top, minPrice, maxPrice, accessToken);

        // Filter products based on price range
        products = products.filter(product => product.price >= minPrice && product.price <= maxPrice);

        // Take only the top 'n' products
        products = products.slice(0, top);

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    const { companyname, categoryname, productid } = req.params;
    const accessToken = req.headers.authorization.split(' ')[1]; // Extract access token from Authorization header

    if (!COMPANIES.includes(companyname) || !CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid company name or category name' });
    }

    try {
        const product = await productModel.fetchProductById(companyname, categoryname, productid, accessToken);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
