import {useState, useEffect} from 'react';
import axios from 'axios';

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
  console.log('in toggle Comlete', id);
  
}
  return (
    <div>
      <h1>TO DO APP</h1>
      <p> {JSON.stringify(todosList)}</p>
      {
      todosList.map((item)=>(

        <p key={item.id}>{item.text}<button onClick={()=>{toggleComplete(item.id)}}>Is Complete?</button></p>
      ))}
    </div>
  );

}

export default App
