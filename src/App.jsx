import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { Helmet } from "react-helmet";
import './App.css';
import ico from "./images/miniLogo.ico";
import StartPage from "./components/HomePage/HomePage";
import TitleList from "./components/TitleList/TitleList";
import TakeRandomAnime from "./components/TakeRandomAnime/TakeRandomAnime";
import DesignV2 from "./components/TitleInfoDesigns/v2/DesignV2";
// import Cursor from "./components/Cursor/Cursor";
import Favorites from "./components/Favorites/Favorites";
import Account from "./components/Account/Account";
import Support from "./components/Support/Support";
import AnimeSchedule from "./components/Schedule/AnimeSchedule/AnimeSchedule";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
    // const [modalActive, setModalActive] = useState(false);
    // const [modalText, setModalText] = useState();

    return (
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Router>
            <Helmet>
                <title>anime</title>
                <link rel="icon" href={ico} sizes="16x16" />
            </Helmet>
            {/*<Cursor />*/}

            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/anime/list" element={<TitleList />} />
                <Route path="/anime/:code" element={<DesignV2 />} />
                <Route path="/anime/random" element={<TakeRandomAnime />} />
                <Route path="/anime/favorites" element={<Favorites />} />
                <Route path="/anime/schedule" element={<AnimeSchedule />} />
                <Route path="/account" element={<Account />} />
                <Route path="/support" element={<Support />} />
            </Routes>

            {/*<Modal active={modalActive} setActive={setModalActive}>*/}
            {/*    {modalText}*/}
            {/*</Modal>*/}
        </Router>
        </SkeletonTheme>
    );
}

export default App;
