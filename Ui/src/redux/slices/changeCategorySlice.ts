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
		changeCategory: (state: CategoryStateI, action: PayloadAction<Category | undefined>): CategoryStateI => ({
			category: action.payload,
			status: SUCCESS,
		}),
	},
});
const { changeCategory } = changeCategorySlice.actions;

export { changeCategory };
export default changeCategorySlice.reducer;
