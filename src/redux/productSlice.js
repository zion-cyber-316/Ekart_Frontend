
import { createSlice } from "@reduxjs/toolkit";

const emptyCart = {
  items: [],
  totalPrice: 0,
};

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    cart: emptyCart,
    addresses: [],
    selectedAddress: null,
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = (action.payload || []).filter(Boolean);
    },

    setCart: (state, action) => {
      state.cart = action.payload || {
        items: [],
        totalPrice: 0,
      };
    },

    clearCart: (state) => {
      state.cart = {
        items: [],
        totalPrice: 0,
      };
    },

    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (_, index) => index !== action.payload
      );

      if (state.selectedAddress === action.payload) {
        state.selectedAddress = null;
      }
    },
  },
});

export const {
  setProducts,
  setCart,
  clearCart,
  addAddress,
  deleteAddress,
  setSelectedAddress,
} = productSlice.actions;

export default productSlice.reducer;
