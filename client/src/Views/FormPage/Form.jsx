import FormCreate from "../../components/FormCreate/FormCreate"
import style from './Form.module.css'

const Form = () => {
    return (
        <div className={style.container}>
            <h2 className={style.title}>CREATE A VIDEOGAME</h2>
            <FormCreate />
        </div>
    )
}

export default Form