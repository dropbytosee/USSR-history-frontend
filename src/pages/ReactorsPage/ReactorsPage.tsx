import "./ReactorsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import ReactorsList from "./ReactorsList/ReactorsList";
import ReactorsFilters from "./ReactorsFilters/ReactorsFilters";

const ReactorsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="reactors-wrapper">

            <ReactorsFilters />

            {!is_moderator && <ReactorsList />}

        </div>
    )
}

export default ReactorsPage;