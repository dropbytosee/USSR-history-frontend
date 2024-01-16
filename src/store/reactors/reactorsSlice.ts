import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	reactors: [],
	query: ""
};

const reactorsSlice = createSlice({
	name: 'reactors',
	initialState: initialState,
	reducers: {
		updateReactors(state, action) {
			state.reactors = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateReactors,
	updateQuery
} = reactorsSlice.actions;

export default reactorsSlice.reducer;