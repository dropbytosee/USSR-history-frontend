import "./ReactorCard.sass"
import {Reactor} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const ReactorCard = ({ reactor, isMock }: {reactor:Reactor, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/reactors/${reactor.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {reactor.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/reactors/${reactor.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ReactorCard;