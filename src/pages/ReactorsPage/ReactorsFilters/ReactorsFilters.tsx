import "./ReactorsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useReactors} from "../../../hooks/reactors/useReactors";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const ReactorsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useReactors()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="reactors-filters">

            <h2>Поиск реакторов</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/reactors/add" bg={variables.primary}>
                        Добавить реактор
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default ReactorsFilters