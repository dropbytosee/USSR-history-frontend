import "./ReactorsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useReactors} from "../../../hooks/reactors/useReactors";

const ReactorsFilters = () => {

    const {query, setQuery, fetchReactors} = useReactors()

    const handleSubmit = () => fetchReactors()

    return (
        <div className="reactors-filters">

            <h2>Поиск реакторов</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default ReactorsFilters