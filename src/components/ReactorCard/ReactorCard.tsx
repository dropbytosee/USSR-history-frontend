import "./ReactorCard.sass"
import {Reactor} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useStation} from "../../hooks/stations/useStation";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const ReactorCard = ({ reactor }: {reactor:Reactor}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {station, is_draft, addReactorToStation, deleteReactorFromStation} = useStation()

    const handleAddReactor = (e) => {
        e.preventDefault()
        addReactorToStation(reactor)
    }

    const handleDeleteReactor = (e) => {
        deleteReactorFromStation(reactor)
    }

    const is_chosen = station?.reactors.find(g => g.id == reactor.id)

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={reactor.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {reactor.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/reactors/${reactor.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("reactors") &&
                        <CustomButton onClick={handleAddReactor} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("reactors") &&
                        <CustomButton onClick={handleDeleteReactor} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("stations") &&
                        <CustomButton onClick={handleDeleteReactor} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default ReactorCard;