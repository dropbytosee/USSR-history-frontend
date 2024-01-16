import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ReactorsList from "./Components/ReactorsList/ReactorsList";
import ReactorPage from "./Components/ReactorPage/ReactorPage";
import {Reactor} from "./Types";

function App() {

    const [selectedReactor, setSelectedReactor] = useState<Reactor | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/ussr">

                        <Breadcrumbs selectedReactor={selectedReactor} setSelectedReactor={setSelectedReactor}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/reactors" replace />} />

                            <Route path="/reactors" element={<ReactorsList />} />

                            <Route path="/reactors/:id" element={<ReactorPage selectedReactor={selectedReactor} setSelectedReactor={setSelectedReactor} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
