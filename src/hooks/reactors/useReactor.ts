import {useDispatch, useSelector} from 'react-redux';
import {
	updateReactor
} from "../../store/reactors/reactorSlice";
import {api} from "../../utils/api";

export function useReactor() {
	const reactor = useSelector(state => state.reactor.reactor);

	const dispatch = useDispatch()

	const setReactor = (value) => {
		dispatch(updateReactor(value))
	}

	const fetchReactor = async (id) => {

		const {data} = await api.get(`reactors/${id}`);

		setReactor(data)

	};

	return {
		reactor,
		setReactor,
		fetchReactor
	};
}