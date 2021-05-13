import React, { useState , useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');  
  const [email, setMail] = useState('');
  const [country, setCountry] = useState('');
  const [newName, setNewName] = useState('');
  const [newMail, setNewMail] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [contactList, setContactList] = useState([]);
  

  useEffect(() => {
    Axios.get('https://mern-crud-zuri.herokuapp.com/read').then((response) => {
      setContactList(response.data);
    })
  }, [])

  const addToList = () => {
    alert('Contact Details Submitted');
    Axios.post('https://mern-crud-zuri.herokuapp.com/insert' , {
      Name: name,
      Email: email,
      Country: country
    });
    
    window.location.reload();
  };

   const updateName = (id) => {
     Axios.put('https://mern-crud-zuri.herokuapp.com/updateName', {
       id: id,
       newName: newName
     })
     window.location.reload();
   }

  const updateMail = (id) => {
    Axios.put('https://mern-crud-zuri.herokuapp.com/updateMail', {
       id: id,
       newMail: newMail
     })
     window.location.reload(); 
  }

  const updateCountry = (id) => {
    Axios.put('https://mern-crud-zuri.herokuapp.com/updateCountry', {
       id: id,
       newCountry: newCountry
     })
     window.location.reload(); 
  }

  const deleteContact = (id) => {
    Axios.delete(`https://mern-crud-zuri.herokuapp.com/delete/${id}`)
    window.location.reload();
  }
 

  return (
    <div className="App">
      <h1>Data Collection</h1>
      <h2>Enter your details below</h2>

      <label> Name: </label>
      <input type='text' onChange ={(event) =>
         {setName(event.target.value)}
          } /> 


      <label> E-mail: </label>
      <input type='text' onChange ={(event) =>
         {setMail(event.target.value)}
          }/>

      <label> Country: </label>
      <input type='text' onChange ={(event) =>
         {setCountry(event.target.value)}
          }/>

      <br/>
      <button onClick = {addToList} >Submit</button>
      
      <h1>Details submitted</h1>

         {contactList.map((val , key) =>{
        return(
          <div key = {key}>
            <label>Name:</label>
            <h3> {val.Name} </h3>
                        
            <label>Country:</label>
            <h3> {val.Country} </h3>
            
            <label>E-mail:</label> 
            <h3>{val.Email}</h3>
            
            <input 
            type='text' 
            placeholder='Name'
            onChange = {(event) =>
            {setNewName(event.target.value)}
             }/>

            <button onClick={() => updateName(val._id)}> Update </button> 
            <input 
            type='text' 
            placeholder='E-mail'
            onChange = {(event) =>
            {setNewMail(event.target.value)}
             }/> 

            <button onClick={() => updateMail(val._id)}> Update </button>
            <input 
            type='text' 
            placeholder='Country'
            onChange = {(event) =>
            {setNewCountry(event.target.value)}
             }/>

            <button onClick={() => updateCountry(val._id)}> Update </button>
            <br/>

            <button onClick ={() => deleteContact(val._id)}> Delete </button>
            
          </div>  

        )
      })}
    </div>
  );
}
    

          
     

export default App;
