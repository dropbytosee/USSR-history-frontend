import {useDispatch, useSelector} from 'react-redux';
import {
	updateLocation,
	updateStation,
	updateName
} from "../../store/stations/stationSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useStation() {

	const {access_token} = useToken()

	const station = useSelector(state => state.station.station)

	const name = useSelector(state => state.station.name)
	const location = useSelector(state => state.station.location)

	const is_draft = station?.status == 1

	const dispatch = useDispatch()

	const setStation = (value) => {
		dispatch(updateStation(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setLocation = (value) => {
		dispatch(updateLocation(value))
	}

	const sendStation = async () => {

		const response = await api.put(`stations/${station.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setStation(undefined)
			setName("")
			setLocation("")
		}
	}

	const deleteStation = async () => {

		const response = await api.delete(`stations/${station.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setStation(undefined)
			setName("")
			setLocation("")
		}

	}

	const saveStation = async () => {

		const form_data = new FormData()

		form_data.append('name', name)
		form_data.append('location', location)

		await api.put(`stations/${station.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchStation = async (station_id) => {

		const {data} = await api.get(`stations/${station_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setStation(data)
		setName(data["name"])
		setLocation(data["location"])
	}

	const addReactorToStation = async (reactor) => {

		const response = await api.post(`reactors/${reactor.id}/add_to_station/`, {}, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setStation(response.data)
		}
	}

	const deleteReactorFromStation = async (reactor) => {
		const response = await api.delete(`stations/${station.id}/delete_reactor/${reactor.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setStation(response.data)
		}
	}

	return {
		station,
		name,
		location,
		is_draft,
		setStation,
		setName,
		setLocation,
		saveStation,
		sendStation,
		deleteStation,
		fetchStation,
		addReactorToStation,
		deleteReactorFromStation
	};
}