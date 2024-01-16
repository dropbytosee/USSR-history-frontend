import {useDispatch, useSelector} from 'react-redux';
import {
	updateLocation, updateName,
	updateStation
} from "../../store/stations/stationSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useStation() {

	const {access_token} = useToken()

	const station = useSelector(state => state.station.station)

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
		}

	}

	const saveStation = async () => {

		const form_data = new FormData()

		form_data.append('name', station.name)
		form_data.append('location', station.location)

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