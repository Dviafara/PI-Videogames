import { getGameByName } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import style from './SearchBar.module.css'

export default function SearchBar() {

    const [game, setGame] = useState('')

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setGame(value); 
        dispatch(getGameByName(value));       
    }

    // const keyDownHandler = (event) => {
    //     if (event.key === 'Enter') {
    //         dispatch(getGameByName(game));
    //     }
    //   };

    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <input autoComplete='off' className={style.input} onChange={onChangeHandler} type="search" placeholder="Search by name" name="name" value={game} />
            {/* <button className={style.buttons} onClick={() => functions()}>Search</button> */}
        </div>
    )
}