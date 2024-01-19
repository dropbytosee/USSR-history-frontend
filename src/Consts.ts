import {Reactor} from "./Types";

export const requestTime = 1000


export const iReactorsMock:Reactor[] = [
	{
		id: 1,
		name: "ЭГП-6",
		status: 1,
		image: "",
		coolant: "вода",
		fuel: "диоксид урана",
		thermal_power: 80,
		electrical_power: 20
	},
	{
		id: 2,
		name: "АМБ-200",
		status: 1,
		image: "",
		coolant: "вода",
		fuel: "двуокись урана",
		thermal_power: 65,
		electrical_power: 12
	},
	{
		id: 3,
		name: "РБМК-1000",
		status: 1,
		image: "",
		coolant: "вода",
		fuel: "диоксид урана",
		thermal_power: 50,
		electrical_power: 11
	},
	{
		id: 4,
		name: "ВВЭР-1000",
		status: 1,
		image: "",
		coolant: "вода",
		fuel: "диоксид урана",
		thermal_power: 30,
		electrical_power: 10
	}
]