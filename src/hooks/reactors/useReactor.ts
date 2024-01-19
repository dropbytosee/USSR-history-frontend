import {useDispatch, useSelector} from 'react-redux';
import {
	updateReactor,
	updateName,
	updateCoolant,
	updateFuel,
	updateThermalPower,
	updateElectricalPower,
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

	const setCoolant = (value) => {
		dispatch(updateCoolant(value))
	}

	const setFuel = (value) => {
		dispatch(updateFuel(value))
	}

	const setThermalPower = (value) => {
		dispatch(updateThermalPower(value))
	}

	const setElectricalPower = (value) => {
		dispatch(updateElectricalPower(value))
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
		setCoolant,
		setFuel,
		setThermalPower,
		setElectricalPower,
		setImage
	};
}