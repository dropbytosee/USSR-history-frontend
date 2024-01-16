import StationsTable from "./StationsTable/StationsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const StationsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/reactors")
        }
    }, [])

    return (
        <div>
            <StationsTable />
        </div>
    )
}

export default StationsPage;

