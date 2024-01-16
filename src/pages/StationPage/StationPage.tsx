import {useEffect} from "react";
import {useStation} from "../../hooks/stations/useStation";
import {useNavigate, useParams} from "react-router-dom"
import ReactorCard from "../../components/ReactorCard/ReactorCard";
import "./StationPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import {pluralDeliveryDate} from "../../utils/plural";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

const StationPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {station, setName, setLocation, fetchStation, saveStation, sendStation, deleteStation, setStation} = useStation()

    useEffect(() => {
        id && fetchStation(id)
        
        return () => {
            setStation(undefined)
        };
    }, [])

    if (id == undefined || station == undefined)
    {
        return (
            <div className="station-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendStation = async() => {
        await saveStation()
        await sendStation()
        navigate("/stations")
    }

    const onDeleteStation = async () => {
        await deleteStation()
        navigate("/reactors")
    }

    const cards = station.reactors.map(reactor  => (
        <ReactorCard reactor={reactor} key={reactor.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveStation} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendStation} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteStation} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = station.status == 1

    const completed = [3, 4].includes(station.status)

    return (
        <div className="station-page-wrapper">

            <div className="station-reactors-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая АЭС" : station.name}</h3>
                </div>

                <div className="station-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == station.status).name}</span>
                    <span>Дата создания: {moment(station.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(station.status) && <span>Дата формирования: {moment(station.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(station.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Пользователь: {station.owner.name}</span> }
                    {[2, 3, 4].includes(station.status) && <span>Результат проверки в архиве: {station.verify ? "Одобрено" : "Отклонено"}</span>}
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Название АЭС" value={station.name} setValue={setName} disabled={!is_draft}  />
                    <CustomTextarea placeholder="Место расположения" value={station.location} setValue={setLocation} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Реакторы</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default StationPage