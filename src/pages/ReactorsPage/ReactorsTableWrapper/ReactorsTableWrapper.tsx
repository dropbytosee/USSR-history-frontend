import {useReactors} from "../../../hooks/reactors/useReactors";
import {useQuery} from "react-query";
import ReactorsTable from "./ReactorsTable/ReactorsTable";
import "./ReactorsTableWrapper.sass"

const ReactorsTableWrapper = () => {

    const {searchReactors} = useReactors()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["reactors"],
        () => searchReactors(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="reactors-wrapper">
            <ReactorsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default ReactorsTableWrapper