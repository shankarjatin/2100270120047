
exports.paginate = (items, page, pageSize) => {
    const offset = (page - 1) * pageSize;
    const paginatedItems = items.slice(offset, offset + pageSize);
    return {
        page,
        pageSize,
        total: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        data: paginatedItems
    };
};
