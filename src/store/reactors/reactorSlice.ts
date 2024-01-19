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
		updateCoolant(state, action) {
			state.reactor.coolant = action.payload
		},
		updateFuel(state, action) {
			state.reactor.fuel = action.payload
		},
		updateThermalPower(state, action) {
			state.reactor.thermal_power = action.payload
		},
		updateElectricalPower(state, action) {
			state.reactor.electrical_power = action.payload
		},
		updateImage(state, action) {
			state.reactor.image = action.payload
		}
	}
})

export const {
	updateReactor,
	updateName,
	updateCoolant,
	updateFuel,
	updateThermalPower,
	updateElectricalPower,
	updateImage
} = reactorSlice.actions;

export default reactorSlice.reducer;