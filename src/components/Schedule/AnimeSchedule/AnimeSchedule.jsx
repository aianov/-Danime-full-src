import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from './AnimeSchedule.module.css';
import AnimeCard from '../AnimeCard/AnimeCard';
import NewHeader from "../../Headers/NewHeader/NewHeader";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const AnimeSchedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await axios.get('https://api.anilibria.tv/v3.0/title/schedule?filter=code,names,posters.medium,description,genres');
            setSchedule(response.data);
        };

        fetchSchedule();
    }, []);

    const swiperResponsive = {
        0: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        361:{
            slidesPerView: 2,
            spaceBetween: 10,
        },
        588:{
            slidesPerView: 3,
            spaceBetween: 5,
        },
        700:{
            slidesPerView: 4,
            spaceBetween: 5,
        },
        810: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1179:{
            slidesPerView: 5,
            spaceBetween: 10,
        },
        1280: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1920: {
            slidesPerView: 6,
            spaceBetween: 40,
        },
        2500:{
            slidesPerView: 8,
            spaceBetween: 40,
        },
    };

    return (
        <div>
            <NewHeader isTitle={true}/>
            <div className={styles['anime-schedule']}>
                {schedule.map((daySchedule, index) => (
                    <div key={index} className={styles['day-slider']}>
                        <h2>{daysOfWeek[daySchedule.day]}</h2>
                        <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={swiperResponsive}
                        >
                            {daySchedule.list.map(anime => (
                                <SwiperSlide key={anime.code}>
                                    <AnimeCard anime={anime} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimeSchedule;
