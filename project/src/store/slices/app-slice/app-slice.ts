import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { SortItem } from '../../../types/sort';
import {NameSpace, SORT_LIST} from '../../../const';

export type SortSliceState = {
  sort: SortItem;
}

const initialState: SortSliceState = {
  sort: {
    name: SORT_LIST.DEFAULT.name,
    sortProperty: SORT_LIST.DEFAULT.sortProperty
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

