import style from './NavBar.module.css'
import { NavLink} from 'react-router-dom'


export default function NavBar() {
    return (
        <div className={style.container}>
            <div className={style.logo}>
            <p>PI</p>
            </div>
            <nav className={style.navBar}>
                <ul>
                    <li><NavLink className={style.navlink} to='/home'>HOME</NavLink></li>
                    <li><NavLink className={style.navlink} to='/form'>CREATE</NavLink></li>
                    <li><NavLink className={style.navlink} to='/'>SALIR</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}
