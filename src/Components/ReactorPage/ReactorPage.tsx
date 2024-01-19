import "./ReactorPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iReactorsMock, requestTime} from "../../Consts";
import {Reactor} from "../../Types";
import mockImage from "/src/assets/mock.png"

const ReactorPage = ({ selectedReactor, setSelectedReactor }: { selectedReactor:Reactor | undefined, setSelectedReactor: Dispatch<Reactor | undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/reactors/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const reactor: Reactor = await response.json()

            setSelectedReactor(reactor)
            setIsMock(false)

        } catch {
            CreateMock()
        }

    };

    const CreateMock = () => {
        id && setSelectedReactor(iReactorsMock.find((reactor:Reactor) => reactor?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()

        return () => {
            setSelectedReactor(undefined)
        }
    }, [])

    const img = `http://127.0.0.1:8000/api/reactors/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedReactor?.name}</h2>

                    <br />

                    <span>Теплоноситель: { selectedReactor?.coolant }</span>

                    <br />

                    <span>Топливо: { selectedReactor?.fuel }</span>

                    <br />

                    <span>Тепловая мощност: { selectedReactor?.thermal_power } МВт</span>

                    <br />

                    <span>Электрическая мощность: { selectedReactor?.electrical_power } МВт</span>

                </div>

            </div>

        </div>
    )
}

export default ReactorPage;