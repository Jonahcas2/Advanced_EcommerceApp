const API_BASE_URL = "https://fakestoreapi.com";

export const fetchAllProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
};

export const fetchProductsByCategory = async (category) => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
        throw new Error('Failed to fetch products by category');
    }
    return response.json();
};

