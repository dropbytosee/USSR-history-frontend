import "./ReactorsList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import ReactorCard from "./ReactorCard/ReactorCard";
import {iReactorsMock, requestTime} from "../../Consts";
import {Reactor} from "../../Types";

const ReactorsList = () => {

    const [reactors, setReactors] = useState<Reactor[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchReactors = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/reactors/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const reactors = raw["reactors"]

            setReactors(reactors)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true)
        setReactors(iReactorsMock.filter(reactor => reactor.name.toLowerCase().includes(query.toLowerCase())))

    }

    useEffect(() => {
        searchReactors()
    }, [])

    const cards = reactors.map(reactor  => (
        <ReactorCard reactor={reactor} key={reactor.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchReactors()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск реакторов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default ReactorsList;