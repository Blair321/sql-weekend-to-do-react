import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
function App () {
  //anything I have in a use state goes at the top 
const [todosList, setTodosList] = useState([])
//anything that is a useEffect 
useEffect(()=>{
  fetchTodosList()
}, [])

function fetchTodosList() {
  console.log('in FetchTodosList');
  axios.get('/api/todos').then(function(response)
  {setTodosList(response.data);
  }).catch(function(err){
    console.log(err);
    alert('error in getting todos list')
  })
  
}
function toggleComplete(id) {
  console.log('in toggle Complete', id);
  const objectToSend = {
    id:id}
  axios.put('/api/todos', objectToSend).then(function(response)
  {console.log('back from Put:', response.data);
    fetchTodosList();
  }).catch(function(err){
    console.log(err);
    alert('error in updating')
   
  })
}
  return (
    <div>
      <h1>TO DO APP</h1>
      {
      todosList.map((item)=>(

        <p key={item.id}>{item.text}<button onClick={()=>{toggleComplete(item.id)}}>Is Complete?</button></p>
      ))}
    </div>
  );

}

export default App
