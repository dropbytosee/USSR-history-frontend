import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {useReactor} from "../../hooks/reactors/useReactor";
import {useStation} from "../../hooks/stations/useStation";

const Breadcrumbs = () => {

    const location = useLocation()

    const {reactor, setReactor} = useReactor()

    const { station, is_draft } = useStation()

    let currentLink = ''

    const resetSelectedReactor = () => setReactor(undefined)

    const topics = {
        "reactors": "Реакторы",
        "reactors-table": "Таблица реакторов",
        "stations": "АЭС",
        "home": "Главная",
        "login": "Вход",
        "register": "Регистрация",
        "profile": "Личный кабинет"
    }

    const exclude_topics = ["edit"]

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (exclude_topics.find(x => x == crumb)) {
            return
        }

        if (Object.keys(topics).find(x => x == crumb)) {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedReactor}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('add')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Новый реактор
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }


        if (currentLink.match(new RegExp('stations/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {is_draft ? "Новая АЭС" : "АЭС №" + station?.id}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('reactors/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {reactor?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/reactors"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;