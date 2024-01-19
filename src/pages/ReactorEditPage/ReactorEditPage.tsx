import "./ReactorEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useReactor} from "../../hooks/reactors/useReactor";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const ReactorEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        reactor,
        fetchReactor,
        setName,
        setCoolant,
        setFuel,
        setThermalPower,
        setElectricalPower,
        setImage
    } = useReactor()

    useEffect(() => {
        id && fetchReactor(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveReactor = async() => {
        let form_data = new FormData()

        form_data.append('name', reactor.name)
        form_data.append('coolant', reactor.coolant)
        form_data.append('fuel', reactor.fuel)
        form_data.append('thermal_power', reactor.thermal_power)
        form_data.append('electrical_power', reactor.electrical_power)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`reactors/${reactor.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/reactors/")
        }
    }

    const deleteReactor = async () => {

        const response = await api.delete(`reactors/${reactor.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/reactors/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (reactor == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={reactor.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={reactor.name} setValue={setName} />

                    <CustomInput placeholder="Теплоноситель" value={reactor.coolant} setValue={setCoolant} />

                    <CustomInput placeholder="Топливо" value={reactor.fuel} setValue={setFuel} />

                    <CustomInput placeholder="Тепловая мощность" value={reactor.thermal_power} setValue={setThermalPower} />

                    <CustomInput placeholder="Электрическая мощность" value={reactor.electrical_power} setValue={setElectricalPower} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveReactor}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteReactor}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ReactorEditPage