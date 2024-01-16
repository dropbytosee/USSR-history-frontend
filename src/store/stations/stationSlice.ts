import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	station: undefined
};

const stationSlice = createSlice({
	name: 'station',
	initialState: initialState,
	reducers: {
		updateStation(state, action) {
			state.station = action.payload
		},
		updateName(state, action) {
			state.station.name = action.payload
		},
		updateLocation(state, action) {
			state.station.location = action.payload
		}
	}
})

export const {
	updateStation,
	updateName,
	updateLocation
} = stationSlice.actions;

export default stationSlice.reducer;