import "./ReactorsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import ReactorsList from "./ReactorsList/ReactorsList";
import ReactorsTableWrapper from "./ReactorsTableWrapper/ReactorsTableWrapper";

const ReactorsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="reactors-wrapper">

            {!is_moderator && <ReactorsList />}
            {is_moderator && <ReactorsTableWrapper />}

        </div>
    )
}

export default ReactorsPage;