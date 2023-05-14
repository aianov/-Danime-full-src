import React from "react";
import logo from "../../images/logo.svg";
import animeSupport from "../../images/SupportAnime.png";
import stylesHeader from "../HomePage/HomePage.module.css";
import styles from "./Support.module.css";
import {Link, useNavigate} from "react-router-dom";

function StartPage() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <header className={stylesHeader.header}>
                <div className={stylesHeader.logo}>
                    <img src={logo} onClick={goBack} alt="logo" />
                </div>
                <nav className={stylesHeader.links}>
                    <Link to="/anime/list">Список</Link>
                    <Link to="/schedule">Расписание</Link>
                    <Link to="/anime/random">Случайное</Link>
                </nav>
            </header>
            <div className={styles["support-section"]}>
                <div className={styles["support-text"]}>
                    <div className={styles["support-image"]}>
                        <img src={animeSupport} alt="AnimeSupport" />
                    </div>
                    <div className={styles["support-content"]}>
                        <h2>Поддержать Нас!</h2>
                        <p>Здесь вы можете помочь проекту, пожертвовав немного денег!</p>
                        <p>Чтобы пожертвовать нам копеечку, нажмите "Поддержать" и следуйте инструкциям ниже! Ваши деньги очень помогают нашему проекту. Лучшие хостинги стоят больших денег, как и уникальные домены. Заранее спасибо!</p>
                        <a href="https://www.paypal.com/donate/?hosted_button_id=SE8DUV79HB4YY" target="_blank" title="PayPal" rel="noreferrer">
                            <button>Поддержать авторов сайта</button>
                        </a>
                        <a href="https://www.anilibria.tv/pages/donate.php" target="_blank" title="Anilibria" rel="noreferrer">
                            <button>Поддержать Anilibria</button>
                        </a>
                        <p>Автори сайту не підтримують війну в Україні, а посилання на Anilibria зроблено на знак подяки за безкоштовний API.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StartPage;
