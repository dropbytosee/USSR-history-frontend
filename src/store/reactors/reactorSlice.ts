import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	reactor: undefined,
};

const reactorSlice = createSlice({
	name: 'reactor',
	initialState: initialState,
	reducers: {
		updateReactor(state, action) {
			state.reactor = action.payload
		}
	}
})

export const {
	updateReactor
} = reactorSlice.actions;

export default reactorSlice.reducer;