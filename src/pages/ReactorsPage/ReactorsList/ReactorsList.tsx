import "./ReactorsList.sass"
import {useEffect} from "react";
import ReactorCard from "../../../components/ReactorCard/ReactorCard";
import {useReactors} from "../../../hooks/reactors/useReactors";

const ReactorsList = () => {

    const {reactors, fetchReactors} = useReactors()

    useEffect(() => {
        fetchReactors()
    }, [])

    const cards = reactors.map(reactor  => (
        <ReactorCard reactor={reactor} key={reactor.id}/>
    ))

    return (
        <div className="reactors-list">

            { cards }

        </div>
    )
}

export default ReactorsList;