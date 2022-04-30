import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType } from 'utils/types';

import { IDLE, SUCCESS } from './constants';

export type CategoryState = {
	category: CategoryType | undefined;
	status: string;
};

const initialState: CategoryState = { category: undefined, status: IDLE };

const changeCategorySlice = createSlice({
	name: 'changeCategory',
	initialState,
	reducers: {
		changeCategory: (state: CategoryState, action: PayloadAction<CategoryType | undefined>): CategoryState => ({
			category: state.category === action.payload ? undefined : action.payload,
			status: SUCCESS,
		}),
	},
});

export const { changeCategory } = changeCategorySlice.actions;
export default changeCategorySlice;
