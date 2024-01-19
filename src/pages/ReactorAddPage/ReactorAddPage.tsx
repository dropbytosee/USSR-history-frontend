import "./ReactorAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import mock from "/src/assets/default.jpg"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const ReactorAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [coolant, setCoolant] = useState("")
    const [fuel, setFuel] = useState("")
    const [thermal_power, setThermalPower] = useState("")
    const [electrical_power, setElectricalPower] = useState("")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addReactor = async () => {

        const response = await api.post(`reactors/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const reactor_id = response.data["id"]
            await updateReactor(reactor_id)
        }

    }

    const updateReactor = async (reactor_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('coolant', coolant)
        form_data.append('fuel', fuel)
        form_data.append('thermal_power', thermal_power)
        form_data.append('electrical_power', electrical_power)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        const response = await api.put(`reactors/${reactor_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate("/reactors/")
        }
    }


    return (
        <div className="add-page-wrapper">
            <div className="left">

                <img src={imgURL} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={coolant} setValue={setCoolant} />

                    <CustomInput placeholder="Топливо" value={fuel} setValue={setFuel} />

                    <CustomInput placeholder="Тепловая мощность" value={thermal_power} setValue={setThermalPower} />

                    <CustomInput placeholder="Электрическая мощность" value={electrical_power} setValue={setElectricalPower} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addReactor}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ReactorAddPage