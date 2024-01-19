import {useDispatch, useSelector} from 'react-redux';
import {
	updateReactors,
	updateQuery
} from "../../store/reactors/reactorsSlice";
import {api} from "../../utils/api";
import {useStation} from "../stations/useStation";
import {useToken} from "../users/useToken";

export function useReactors() {
	const reactors = useSelector(state => state.reactors.reactors);
	const query = useSelector(state => state.reactors.query);

	const {access_token} = useToken()

	const {fetchStation} = useStation()

	const dispatch = useDispatch()

	const setReactors = (value) => {
		dispatch(updateReactors(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchReactors = async () => {

		const {data} = await api.get(`reactors/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_station_id = data["draft_station_id"]
		draft_station_id && fetchStation(draft_station_id)

		return data["reactors"]
	}

	const deleteReactor = async (reactor) => {
		await api.delete(`reactors/${reactor.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		reactors,
		setReactors,
		query,
		setQuery,
		searchReactors,
		deleteReactor
	};
}