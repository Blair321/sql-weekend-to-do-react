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
  return (
    <div>
      <h1>TO DO APP</h1>
      <p> {JSON.stringify(todosList)}</p>
    </div>
  );

}

export default App
