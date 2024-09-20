import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('todo/fetchData', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

const tableSlice = createSlice({
  name: 'tableData',
  initialState: {
    data: [],
    loading: false,
    error: null,
    filteredData: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectData = (state) => state.tableData.data;
export const selectLoading = (state) => state.tableData.loading;
export const selectError = (state) => state.tableData.error;

export default tableSlice.reducer;
