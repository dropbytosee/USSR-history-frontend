import {configureStore} from "@reduxjs/toolkit";

import reactorReducer from "./reactors/reactorSlice"
import draftStationReducer from "./stations/stationSlice"
import authReducer from "./users/authSlice"
import stationsReducer from "./stations/stationsSlice"
import reactorsReducer  from "./reactors/reactorsSlice"

export default configureStore({
	reducer: {
		reactor: reactorReducer,
		reactors: reactorsReducer,
		station: draftStationReducer,
		stations: stationsReducer,
		user: authReducer
	}
});