import "./ReactorPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useReactor} from "../../hooks/reactors/useReactor";

const ReactorPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {reactor, fetchReactor} = useReactor()
    
    useEffect(() => {
        id && fetchReactor(id)
    }, [])

    if (reactor == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={reactor.image}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{reactor.name}</h2>

                    <br />

                    <span className="description">{reactor.description}</span>

                    <br />

                    <span className="foundation_date">Год основания: {reactor.foundation_date}г</span>

                    <br />

                    <span className="grp">Население: {reactor.grp} млн</span>

                    <br />

                    <span className="square">Площадь: {reactor.square} км^2</span>

                    <br />

                    <span className="climate">Климат: {reactor.climate}</span>

                </div>

            </div>

        </div>
    )
}

export default ReactorPage;