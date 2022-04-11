import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories } from '../../utils/types';
import { IDLE, SUCCESS } from './constants';

interface CategoryStateI {
	category: Categories | undefined;
	status: string;
}

const initialState: CategoryStateI = { category: undefined, status: IDLE };

const setCategoryReducer = (state: CategoryStateI, action: PayloadAction<Categories | undefined>): CategoryStateI => {
	return { category: action.payload, status: SUCCESS };
};

const changeCategorySlice = createSlice({
	name: 'changeCategory',
	initialState,
	reducers: {
		setCategoryReducer,
	},
});

export { changeCategorySlice };
export default changeCategorySlice.reducer;
