import Cards from "../../components/Cards/Cards"
import FilterButtons from "../../components/FilterButtons/FilterButtons"
import style from './Home.module.css'

const Home = (props) => {

    return (
        <div className={style.container}>
            <h1 className={style.title}>VIDEOGAMES</h1>
            <div className={style.descrip}>

            </div>
            <FilterButtons/>
            <Cards/>
        </div>
    )
}

export default Home