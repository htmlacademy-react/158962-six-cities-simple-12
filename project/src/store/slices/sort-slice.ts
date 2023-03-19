import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortItems = {
  name: string;
  sortProperty: 'rating' | 'price' | '-price' | 'top';
}

type SortSliceState = {
  sort: SortItems;
}

const initialState: SortSliceState = {
  sort: {
    name: 'Popular',
    sortProperty: 'rating'
  }
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<SortItems>) {
      state.sort = action.payload;
    },
  },
});

export const { setSortType } = sortSlice.actions;
export const selectSort = (state:RootState) => state.sort;
export default sortSlice.reducer;

