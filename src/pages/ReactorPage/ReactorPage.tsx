import "./ReactorPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useReactor} from "../../hooks/reactors/useReactor";

const ReactorPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {reactor, fetchReactor, setReactor} = useReactor()
    
    useEffect(() => {
        id && fetchReactor(id)
        return () => {
            setReactor(undefined)
        }
    }, [])

    if (reactor == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/reactors/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{reactor?.name}</h2>

                    <br />

                    <span>Теплоноситель: { reactor?.coolant }</span>

                    <br />

                    <span>Топливо: { reactor?.fuel }</span>

                    <br />

                    <span>Тепловая мощност: { reactor?.thermal_power } МВт</span>

                    <br />

                    <span>Электрическая мощность: { reactor?.electrical_power } МВт</span>

                </div>
                
            </div>

        </div>
    )
}

export default ReactorPage;