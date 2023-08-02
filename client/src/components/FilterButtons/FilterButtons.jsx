import { getAllGames, getGamesFromApiOrDb, getGamesOrderAlphabetic, getGamesOrderRating, getGenresFiltered } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import { NavLink} from 'react-router-dom';
import style from './FilterButtons.module.css';

const FilterButtons = () => {

    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres);

    // action para filtrar por generos
    const filterByGenre = (event) => {
        dispatch(getGenresFiltered(event.target.value))
    };

    // action para ordenar por rating
    const gameOrderRating = (event) => {
        dispatch(getGamesOrderRating(event.target.value))
    };

    // action para ordenar alfabeticamente
    const gamesOrderAlphabetic = (event) => {
        dispatch(getGamesOrderAlphabetic(event.target.value))
    };

    // functiones de api o db
    const filterByOrigin = (event) => {
        dispatch(getGamesFromApiOrDb(event.target.value))
    };

    const onClick = () => {
        dispatch(getAllGames())
    };

    return (
        <div>
            <div className={style.container}><SearchBar /></div>
            <div className={style.container2}>
                <div>
                    <select className={style.selects} onChange={filterByGenre}>
                        <option select disabled selected={true}>Filter By Genres</option>
                        {
                            genres.map(genre => {
                                return <option key={genre} value={genre}>{genre}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <select className={style.selects} onChange={filterByOrigin}>
                        <option select disabled selected={true}>Filter By Origin</option>
                        <option value="ALL">All games</option>
                        <option value="API">From API</option>
                        <option value="DB">Created by user</option>
                    </select>
                </div>
                <div>
                    <select className={style.selects} onChange={gameOrderRating}>
                        <option select disabled selected={true}>Order By Rating</option>
                        <option value="Ascendente">Ascendant</option>
                        <option value="Descendente">Descendant</option>
                    </select>
                </div>
                <div>
                    <select className={style.selects} onChange={gamesOrderAlphabetic}>
                        <option select disabled selected={true}>Order By Name</option>
                        <option value="Ascendente">Ascendant</option>
                        <option value="Descendente">Descendant</option>
                    </select>
                </div>
                <div>
                <button onClick={() => window.location.reload()} className={style.button}>Reset</button>
                </div>
            </div>

                

        </div>
    )
}

export default FilterButtons;