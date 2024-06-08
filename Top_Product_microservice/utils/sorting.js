
exports.sortProducts = (products, sortBy, order) => {
    if (!sortBy) return products;

    const sortedProducts = [...products].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    return sortedProducts;
};
