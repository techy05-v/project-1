import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from "../../api/axiosConfig";

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axiosInstance.get('/admin/categories');
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/getallproducts');
      console.log('API Response:', response.data);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await axiosInstance.post('/admin/createproduct', product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product) => {
    const response = await axiosInstance.put(`/admin/updateproduct/${product.id}`, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axiosInstance.delete(`/admin/deleteproduct/${id}`);
    return id;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id, { rejectWithValue }) => {
    try {
      // Add validation to ensure id is not undefined
      if (!id) {
        console.error('No product ID provided');
        return rejectWithValue('No product ID provided');
      }

      console.log('Fetching single product with ID:', id)
      const response = await axiosInstance.get(`/admin/getproductbyid/${id}`);
      if(!response.data || !response.data.product){
        console.error('No product found with the given ID')
      }
      console.log('Single Product Response:', response.data)
      return response.data.product; // Note: changed from response.data to response.data.product
    } catch (error) {
      console.error('Error fetching single product:', error)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)
export const uploadImage = createAsyncThunk(
  'product/uploadImage',
  async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dnxvyozo1/image/upload",
      formData
    );
    return response.data.secure_url;
  }
);
export const softDeleteProduct = createAsyncThunk(
  'products/softDeleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      console.log('Attempting to soft delete product:', productId);
      const response = await axiosInstance.patch(`/admin/products/${productId}/toggle-status`);
      console.log('Soft delete response:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Soft delete error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        return rejectWithValue(error.response.data || error.message); 
      } else if (error.request) {
        console.error('Network error:', error.request);
        return rejectWithValue('Network error, please try again later.');
      } else {
        console.error('Unexpected error:', error.message);
        return rejectWithValue('An unexpected error occurred.');
      }
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    status: 'idle',
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if(!action.payload ){
          console.error("no product payload received")
        }
        const existingIndex = state.items.findIndex(p => p._id === action.payload._id);
        if (existingIndex === -1) {
          state.items.push(action.payload);
        } else {
          state.items[existingIndex] = action.payload;
        }
        state.currentProduct = action.payload;
      })
      // soft delete
      .addCase(softDeleteProduct.pending, (state, action) => {
        console.log('Soft delete pending:', action);
        state.status = 'loading';
      })
      .addCase(softDeleteProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.product;
        
        // Find the index of the product that was just updated
        const index = state.items.findIndex(product => product._id === updatedProduct._id);
        
        if (index !== -1) {
          // Replace the entire product object with the updated one
          state.items[index] = updatedProduct;
        }
        
        state.status = 'succeeded';
      })
      .addCase(softDeleteProduct.rejected, (state, action) => {
        console.error('Soft delete rejected:', action.error);
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;