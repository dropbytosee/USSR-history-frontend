import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/stations/stationsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useStations() {
	const status = useSelector(state => state.stations.status)
	const date_start = useSelector(state => state.stations.date_start)
	const date_end = useSelector(state => state.stations.date_end)
	const user = useSelector(state => state.stations.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchStations = async () => {

		const {data} = await api.get(`stations/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(station => station.owner.name.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchStations,
		setDateStart,
		setDateEnd,
		setUser
	};
}