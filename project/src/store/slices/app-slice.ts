import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SortItem } from '../../types/sort';
import {NameSpace} from '../../const';

type SortSliceState = {
  sort: SortItem;
}

const initialState: SortSliceState = {
  sort: {
    name: 'Popular',
    sortProperty: 'default'
  }
};

export const appSlice = createSlice({
  name: NameSpace.Sorting,
  initialState,
  reducers: {
    changeSortType(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
  },
});

export const { changeSortType } = appSlice.actions;
export const selectSort = (state:RootState) => state[NameSpace.Sorting];
export default appSlice.reducer;

