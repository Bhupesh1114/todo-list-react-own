import React, { useEffect, useState } from "react";
import './App.css';
import List from "./components/List";

function App() {

  const getLocalStorage = () => {
    let list = localStorage.getItem("listItem");
    if (list) {
      return JSON.parse(localStorage.getItem("listItem"));
    } else {
      return [];
    }
  }

  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addItems = () => {
    setList(oldItems => {
      return [...oldItems, inputValue];
    });
    setInputValue("");
    setEditing(false);
    setIsAdded(true);
  }
  
  const deleteItems = (id) => {
    setList(oldItems => {
      return oldItems.filter((ele, index) => {
        return index !== id;
      })
    });
    setIsDeleted(true);
    
  }

  const editItems = (value,id) => {
    setInputValue(value);
    setList(oldItems => {
      return oldItems.filter((ele, index) => {
          return index !== id;
        })
    })
    setEditing(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const onChange = (event) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
let timeout = setTimeout(() => {
  setIsDeleted(false);
  setIsAdded(false);
  return () => clearTimeout(timeout);
}, 4000);

    localStorage.setItem("listItem", JSON.stringify(list));
  },[list])


  return (
    <div className="App">
      {isDeleted && <h2 className="delete">Item Deleted!!</h2>}
      {/* {isAdded && <h2 className="added">Item Added!!</h2>} */}
      <h1>Todo List</h1>
      <div className="App-inner">
      <form onSubmit={handleSubmit}>
        <input className="input" type="text"placeholder="" value={inputValue} onChange={onChange}/>
        <button onClick={addItems} className="button">Add</button>
        </form>
       
      </div>
      {list.map((item,index) => {
        return <List value={item} key={index} id={index} deleteItems={deleteItems} editItems={editItems} editing={editing}/>
        })}
    </div>
  );
}

export default App;
