import "./StationConstructor.sass"
import {useStation} from "../../hooks/stations/useStation";
import {Link} from "react-router-dom";

const StationConstructor = () => {

    const {station} = useStation()

    if (station == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая АЭС</span>
            </div>
        )
    }

    return (
        <Link to={`/stations/${station.id}`} className="constructor-container">
            <span className="title">Новая АЭС</span>
            {station.reactors.length > 0 && <span className="badge">{station.reactors.length}</span>}
        </Link>
    )
}

export default StationConstructor