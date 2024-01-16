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

        if (id != undefined)
        {
            setSelectedReactor(iReactorsMock.find((reactor:Reactor) => reactor?.id == parseInt(id)))
        }

        setIsMock(true)
    }

    useEffect(() => {
        fetchData()
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

                    <h2 className="name">{selectedReactor?.name}</h2>

                    <br />

                    <h3>Физические характеристики</h3>

                    <span>Максимальная тепловая мощность: { selectedReactor?.MaximumHeatOutput } МВт</span>
                    <span>Электрическая мощность: { selectedReactor?.ElectricalPower } МВт</span>

                    <br />

                    <h3>Нейтронные характеристики</h3>
                    <span>Максимальная плотность потока быстрых нейтронов: { selectedReactor?.MaximumNeutronFluxDensity }·10<sup>19</sup>м<sup>-2</sup>с<sup>-1</sup></span>
                    <span>Средняя энергия нейтронов: { selectedReactor?.AverageNeutronEnergy } кэВ</span>

                    <br />

                    <h3>Режим работы реактора</h3>
                    <span>Продолжительность микрокампании: { selectedReactor?.MicrocampaniaDuration } суток</span>
                    <span>Время между микрокомпаниями: { selectedReactor?.TimeBetweenMicroCompanies } суток</span>

                </div>

            </div>

        </div>
    )
}

export default ReactorPage;