import React, { useState } from "react"
import axios from "axios"

export default function TodoItem(props){
    const [ done, setDone ] = useState(props.done)

    const toggleDone = () => {
        // Update db & Update State
        axios   
            .patch(`http://bgb-todo-api.herokuapp.com/todo/${props.id}`, {
                done: !done
            })
            .then(() => setDone(!done))
            .catch(err => console.error("toggleDone error", err))
    }

    return (
        <div className="todo-item">
            <input 
            type="checkbox" 
            onClick={toggleDone} 
            defaultChecked={done}
            />
            <p className={done ? "done" : ""}>{props.title}</p>
            <button onClick={() => props.deleteTodo(props.id)}>X</button>
        </div>
    )
}