// controllers/productController.js
const productModel = require('../models/productModel');
const { paginate } = require('../utils/pagination');
const { sortProducts } = require('../utils/sorting');
const { COMPANIES, CATEGORIES } = require('../config');

exports.getTopProducts = async (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top = 10, page = 1, sort_by, order = 'asc', minPrice = 0, maxPrice = Infinity } = req.query;
    const accessToken = req.headers.authorization.split(' ')[1]; // Extract access token from Authorization header

    if (!COMPANIES.includes(companyname) || !CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid company name or category name' });
    }

    if (top > 10) {
        return res.status(400).json({ error: 'Page size cannot exceed 10' });
    }

    try {
        const products = await productModel.fetchProductsByCategory(companyname, categoryname, accessToken);
        const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        const sortedProducts = sortProducts(filteredProducts, sort_by, order);
        const paginatedProducts = paginate(sortedProducts, page, top);

        res.json(paginatedProducts);
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
