// Category.jsx (Redux Slice)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

// Fetch Categories thunk
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add Category thunk
export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/addcategory', categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleCategoryStatus = createAsyncThunk(
  'category/toggleStatus',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/category/${categoryId}/toggle-status`);
      console.log('responsefrom category toggle staust',response)
      return response.data.category;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryDatas: [],
    loading: false,
    processingIds: [],
    error: null,
    addLoading: false,
    addError: null,
    updateLoading: false,
    updateError: null,
  },
  reducers: {
    clearCategories: (state) => {
      state.categoryDatas = [];
    },
    clearErrors: (state) => {
      state.error = null;
      state.addError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories cases
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDatas = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add category cases (unchanged)
      .addCase(addCategory.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.addLoading = false;
        state.categoryDatas.push(action.payload);
        state.addError = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload;
      })
      // Toggle category status cases
      .addCase(toggleCategoryStatus.pending, (state, action) => {
        state.processingIds.push(action.meta.arg);
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        const index = state.categoryDatas.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.categoryDatas[index] = action.payload;
        }
        state.processingIds = state.processingIds.filter(
          id => id !== action.payload._id
        );
      })
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.processingIds = state.processingIds.filter(
          id => id !== action.meta.arg
        );
        state.error = action.payload;
      })

  },
});

export const { clearCategories, clearErrors } = categorySlice.actions;
export default categorySlice.reducer;