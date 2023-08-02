import axios from 'axios'
import style from './FormCreate.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllGames, getPlatforms } from '../../redux/actions'
import validation from './validation'

const FormCreate = () => {
    const dispatch = useDispatch()
    // estado para controlar cada cambio de los inputs del formulario
    const [form, setForm] = useState({
        name: '',
        description: '',
        platform: [],
        background_image: '',
        released: '',
        rating: '',
        genre: []
    })
    // estado para controlar los errores
    const [errors, setErrors] = useState({})
    // cuando se levante el componente se cargan todas las plataformas
    useEffect(() => {
        dispatch(getPlatforms())
    }, [])


    const onChangeHandler = (event) => {
        //cambia el valor del estado form dependiendo del input que se seleccione
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        // valida que no haya errores en cada cambio del input
        setErrors({
            ...errors,          // ====> AAA
            [event.target.name]: validation({ [event.target.name]: event.target.value })
        })
    }

    const genresAndPlatformsHandler = (event) => {
        // controlo que la plataforma seleccionada no este en el form
        if (!form[event.target.name].includes(event.target.value)) {
            // si no esta le sumo la nueva plataforma al array de plataformas
            setForm({
                ...form,
                [event.target.name]: [...form[event.target.name], event.target.value]
            })
            // valido los posibles errores de plataformas y generos (que no esten vacios)
            setErrors({
                ...errors,
                [event.target.name]: validation({ [event.target.name]: [...form[event.target.name], event.target.value] })
            })
        }
    }

    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)

    // creo un estado para controlar los errores que llegan del backend
    const [errorsBack, setErrorsBack] = useState(null)

    const submitHandler = (event) => {
        event.preventDefault()
        let err = []
        //valido que no haya ningun error antes de submitear
        Object.values(errors).map((elemento) => {
            if (elemento !== '') {
                err.push(elemento)
            }

        })
        // si es = 0 es porque no hay ningun error
        if (err.length === 0) {
            axios.post('http://localhost:3001/videogames', form)
                .then(res => {
                    alert('Juego creado con exito :D')
                    setForm({
                        name: '',
                        description: '',
                        platform: [],
                        background_image: '',
                        released: '',
                        rating: '',
                        genre: []
                    })
                    dispatch(getAllGames())
                    setErrorsBack(null) // limpio el estado de errores del back
                }
                )
                .catch(err => {
                    setErrorsBack(err.response.data.error) //seteo el estado de errores del back con el error que llego
                }
                )
        }
        else {
            setErrorsBack('Todos los campos son obligatorios!')
        }

    }

    // borrar las plataformas seleccionadas
    const deleteHandler = (event) => {
        // busco el indice de donde esta la plataforma/genero seleccionada
        let index = form[event.target.name].indexOf(event.target.value)
        // la elimino del estado form
        form[event.target.name].splice(index, 1)
        setForm({
            ...form,
            [event.target.name]: form[event.target.name] // seteo el estado con el array con la plataforma/genero ya eliminado
        })
        setErrors({
            ...errors,
            [event.target.name]: validation({ [event.target.name]: form[event.target.name] })
            // valido que haya por lo menos una plataforma/genero
        })
    }


    return (
        <div >
            <div >
                <form onSubmit={submitHandler}>
                    <div>
                        {errorsBack && <div> {errorsBack} </div>}
                    </div>
                    <div >
                        <label>Name:</label>
                        <div>
                            <input autoComplete="off" type="text" name='name' onChange={onChangeHandler} value={form.name} />
                            <p>{errors.name}</p>
                        </div>
                    </div>

                    <div>
                        <label>Image:</label>
                        <div>
                            <input placeholder='URL' type='url' name='background_image' onChange={onChangeHandler} value={form.background_image} />
                            <p >{errors.background_image}</p>
                        </div>
                    </div>

                    <div >
                        <label>Description:</label>
                        <div>
                            <textarea name="description" onChange={onChangeHandler} value={form.description}></textarea>
                            <p >{errors.description}</p>
                        </div>
                    </div>

                    <div >
                        <label>Platforms:</label>
                        <div>
                            <select  name='platform' onChange={genresAndPlatformsHandler}>
                                <option select disabled selected>Platforms</option>
                                {
                                    platforms.map(platform => {
                                        return <option key={platform} name={platform} value={platform} >{platform}</option>
                                    })
                                }
                            </select>
                            <div >
                                {
                                    form.platform.map(plat => {
                                        return <button key={plat}  type='button' name='platform' value={plat} onClick={deleteHandler}>{plat}</button>
                                    })
                                }
                            </div>
                            <p >{errors.platform}</p>
                        </div>
                    </div>

                    <div>
                        <label>Released:</label>
                        <div>
                            <input  type='date' name='released' onChange={onChangeHandler} value={form.released} />
                            <p >{errors.released}</p>
                        </div>
                    </div>

                    <div>
                        <label>Rating:</label>
                        <div>
                            <input defaultValue='0' step='0.1' type="number" min='0' max='5' name='rating' onChange={onChangeHandler} value={form.rating} />
                            <p >{errors.rating}</p>
                        </div>
                    </div>

                    <div >
                        <label>Genres: </label>
                        <div>
                            <select  name='genre' onChange={genresAndPlatformsHandler}>
                            <option select disabled selected>Genres</option>
                                {
                                    genres.map(genre => {
                                        return <option key={genre} name={genre} value={genre} >{genre}</option> 
                                    })
                                }
                            </select>
                            <div >
                                {
                                    form.genre.map(gen => {
                                        return <button key={gen} name='genre' value={gen} type='button'  onClick={deleteHandler}>{gen}</button>
                                    })
                                }
                            </div>
                            <p >{errors.genre}</p>
                        </div>
                    </div>

                    <div >
                        <button type='submit' name='submit'>CREATE</button>
                        {errorsBack !== null && <div >↑</div>}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FormCreate