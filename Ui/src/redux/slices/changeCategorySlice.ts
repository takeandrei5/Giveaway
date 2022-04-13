import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../utils/types';
import { IDLE, SUCCESS } from './constants';

interface CategoryStateI {
	category: Category | undefined;
	status: string;
}

const initialState: CategoryStateI = { category: undefined, status: IDLE };

const changeCategorySlice = createSlice({
	name: 'changeCategory',
	initialState,
	reducers: {
		changeCategory: (
			state: CategoryStateI,
			action: PayloadAction<Category | undefined>
		): CategoryStateI => ({
			category: state.category === action.payload ? undefined : action.payload,
			status: SUCCESS,
		}),
	},
});

export const { changeCategory } = changeCategorySlice.actions;
export default changeCategorySlice;
