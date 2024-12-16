import {axiosInstance} from "../api/axiosConfig";

const handleAxiosError = (error) => {
  if (error.response) {
    return `Request failed with status ${error.response.status}: ${error.response.data}`;
  } else if (error.request) {
    return 'No response received from server';
  } else {
    return `Error setting up request: ${error.message}`;
  }
};

export async function fetchProducts() {
    try {
      console.log('Fetching products...');
      const response = await axiosInstance.get('/user/products');
      console.log('Full API Response:', response);
      
      // Assuming the products are in response.data.products
      const products = response.data.products || response.data;
      
      console.log('Extracted Products:', products);
      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(handleAxiosError(error));
    }
}
export async function fetchCategories() {
  try {
    const { data } = await axiosInstance.get('/user/categories');
    return data;
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
}

export async function fetchBrands() {
  try {
    const { data } = await axiosInstance.get('/brands');
    return data;
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
}

export { handleAxiosError };