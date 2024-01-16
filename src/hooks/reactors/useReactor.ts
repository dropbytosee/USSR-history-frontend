import {useDispatch, useSelector} from 'react-redux';
import {
	updateReactor,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} from "../../store/reactors/reactorSlice";
import {api} from "../../utils/api";

export function useReactor() {
	const reactor = useSelector(state => state.reactor.reactor);

	const dispatch = useDispatch()

	const setReactor = (value) => {
		dispatch(updateReactor(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setHeatOutput = (value) => {
		dispatch(updateHeatOutput(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchReactor = async (id) => {

		const {data} = await api.get(`reactors/${id}`);

		setReactor(data)

	};

	return {
		reactor,
		setReactor,
		fetchReactor,
		setName,
		setDescription,
		setHeatOutput,
		setImage
	};
}