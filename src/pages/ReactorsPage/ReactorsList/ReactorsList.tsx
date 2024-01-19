import "./ReactorsList.sass"
import ReactorCard from "../../../components/ReactorCard/ReactorCard";
import {useReactors} from "../../../hooks/reactors/useReactors";
import {useQuery} from "react-query";
import ReactorsFilters from "../ReactorsFilters/ReactorsFilters";

const ReactorsList = () => {

    const {searchReactors} = useReactors()

    const { isLoading, data, refetch } = useQuery(
        ["reactors"],
        () => searchReactors(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(reactor  => (
        <ReactorCard reactor={reactor} key={reactor.id} refetch={refetch}/>
    ))

    return (
        <div className="reactors-list-wrapper">

            <ReactorsFilters refetch={refetch}/>

            <div className="reactors-list">
                { cards }
            </div>

        </div>
    )
}

export default ReactorsList;