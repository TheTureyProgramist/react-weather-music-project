import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id: number;
  text: string;
}

const initialState: Item[] = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Дія збереження (додавання)
    addItem: (state, action: PayloadAction<Item>) => {
      state.push(action.payload);
    },
    // Дія видалення
    removeItem: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    },
    // Дія оновлення
    updateItem: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = itemsSlice.actions;
export const selectItems = (state: { items: Item[] }) => state.items;
export default itemsSlice.reducer;
