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
		},
		updateName(state, action) {
			state.reactor.name = action.payload
		},
		updateDescription(state, action) {
			state.reactor.description = action.payload
		},
		updateHeatOutput(state, action) {
			state.reactor.heat_output = action.payload
		},
		updateImage(state, action) {
			state.reactor.image = action.payload
		}
	}
})

export const {
	updateReactor,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} = reactorSlice.actions;

export default reactorSlice.reducer;