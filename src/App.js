import './App.css';
import React, {useState} from 'react';
import Alert from './Components/Alert';
import List from './Components/List';

function App() {

  const [name , setName] = useState("")
  const [alert, setAlert] = useState({show: false, msg:"", type:""})
  const [list , setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [isID, setIsId] = useState(null)


  //submit handle function 
  const submitHandle = (e) => {
    e.preventDefault();
    if(!name) {
      //Show alert
      showAlert(true, "Please add an Item", "danger")
      
    }

    else if (name && isEditing) {
      // when i click on the button
    }

    else {
      // Add a new Item 
      showAlert(true, "Item has been added", "success")
      const newItem = {id : new Date().getTime().toString(), title : name}
      console.log(newItem)
      setList([...list, newItem]);
      setName("");
    }
  }

  //Show Alert function 
    const showAlert = (show = false , msg = "", type = "") => {
        setAlert({show : show, msg: msg, type: type})
    }

  // Delete Item 
  const deleteItem = (id) => {
      showAlert(true, "Item has been deleted", "danger")
      const itemRemoved = list.filter((item)=> item.id !== id)
      setList(itemRemoved);
  } 


  return (
    <section className="section-center">
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <form className='grocery-form' onSubmit={submitHandle} list={list}>

      <h3>Marketing Agency Data</h3>
      <div className="form-control">
        <input type="text"
               className="grocery"
               placeholder="Agency name..."
               value={name}
               onChange={(e)=> setName(e.target.value)}
         />

         <button type="submit" className='submit-btn'> 
          {isEditing ? "Edit" : "Submit"}
         </button>

      </div>
      {list.length > 0 && 
      <div className="grocery-container">
        <List items={list} deleteItem={deleteItem} />
        <button className="clear-btn" onClick={()=> setList([])}> Clear all</button>
      </div>}
      </form>

    </section>
  );
}

export default App;
