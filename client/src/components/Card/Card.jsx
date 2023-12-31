import style from './Card.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'


const Card = ({ id, name, image, genres, rating }) => {

    return (
        <div key={id} className={style.containerCard}>
            <NavLink to={`/detail/${id}`}>
                <h2 className={style.name}>{name}</h2>
                <img className={style.image} src={image} alt={name} />
                <div className={style.genresContainer}>
                    {
                        genres?.map((genre, index) => {
                            return <h4 key={index} className={style.genres}>{genre}</h4>
                        })
                    }
                </div>
            </NavLink>
        </div>
    )
}

export default Card