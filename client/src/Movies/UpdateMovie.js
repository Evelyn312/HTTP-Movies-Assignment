import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = (props) => {
    const initialMovie = {
        title: '',
        director: '',
        metascore: '',
        stars: []

    }
    const [update, setUpdate] = useState(initialMovie)
    const { id } = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log("test res", res)
            setUpdate(res.data);
        })
        .catch(err => console.log(err));
    }, [id])

    const handleChanges = e => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Test updatedmovie", update)
        axios
        .put("http://localhost:5000/api/movies/:id", update)
        .then(res => {
            setUpdate(initialMovie)
            props.history.push("/movies")
        } )
        .catch(err => console.log(err))
    }

    return(
        <div>
           <form onSubmit={handleSubmit}>
               <label htmlFor="title">
                   <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder= "Title"
                    value={update.title}
                    onChange={handleChanges}
                    />
               </label>
               <label htmlFor="director">
                   <input
                    type="text"
                    name="director"
                    id="director"
                    placeholder="director"
                    value={update.director}
                    onChange={handleChanges}
                    />
               </label>
               <label>
                   <input
                    type="number"
                    name="metascore"
                    id="metascore"
                    placeholder="metascore"
                    value={update.metascore}
                    onChange={handleChanges}
                    />
               </label>
               <label>
                   <input
                    type="text"
                    name="stars"
                    id="stars"
                    placeholder="Stars"
                    value={update.stars}
                    onChange={handleChanges}
                    />
               </label>
               <button>Submit</button>

           </form>
        </div>
    )

}

export default UpdateMovie;