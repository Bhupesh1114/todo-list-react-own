import React from 'react';
import { FaEdit,FaTrash } from "react-icons/fa";
import "./List.css";

function List(props) {
    return (
        <div>{props.value.trim().length === 0 ? null : <div className='list'>
            <h2>{props.id +1}. {props.value}</h2>
        <button disabled={props.editing} onClick={() => props.editItems(props.value,props.id)} ><FaEdit className='icon'/></button>
        <button disabled={props.editing} onClick={() => props.deleteItems(props.id)} ><FaTrash className='icon'/></button>
    </div>}</div>
        
    )
}

export default List
