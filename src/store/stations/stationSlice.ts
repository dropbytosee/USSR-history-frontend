import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	station: undefined,
	name: "",
	location: ""
};

const stationSlice = createSlice({
	name: 'station',
	initialState: initialState,
	reducers: {
		updateStation(state, action) {
			state.station = action.payload
		},
		updateName(state, action){
			state.name = action.payload
		},
		updateLocation(state, action){
			state.location = action.payload
		}
	}
})

export const {updateStation, updateName, updateLocation} = stationSlice.actions;

export default stationSlice.reducer;