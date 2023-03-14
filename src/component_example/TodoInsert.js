import React, { useEffect, useState } from "react";
import {TiTrash, TiPencil} from "react-icons/ti";
import { MdAddCircle } from "react-icons/md";
import './TodoInsert.css';

const TodoInsert = ({onInsertToggle , onInsertTodo, selectedTodo, onRemove, onUpdate}) =>{
    const [value , setValue] = useState("");
    
    const onChange = (e) =>{
        setValue(e.target.value);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        onInsertTodo(value);
        setValue("");
        onInsertToggle();
    }

    useEffect(()=>{
        if(selectedTodo){
            setValue(selectedTodo.text);
        }
    }, [selectedTodo]);
    return(
        <div>
            <div className="background" onClick={onInsertToggle}></div>
                <form onSubmit={selectedTodo ? ()=> {onUpdate(selectedTodo.id,value)} : onSubmit} >
                    <input 
                    placeholder="please type" value={value} onChange={onChange}></input>
                    {selectedTodo ? ( <div className="rewrite">
                        <TiPencil onClick={()=> {onUpdate(selectedTodo.id,value)}}/>
                        <TiTrash onClick={() => {onRemove(selectedTodo.id)}}/>
                    </div>) : 
                    (<button type="submit"><MdAddCircle/></button>)}
                </form>
        </div>
    );
}


export default TodoInsert;