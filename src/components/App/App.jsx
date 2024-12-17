import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
function App () {
  //anything I have in a use state goes at the top 
const [todosList, setTodosList] = useState([])
const [newTask, setNewTask] = useState('')
//anything that is a useEffect 
useEffect(()=>{
  fetchTodosList()
}, [])

function addNewtask() {
  const objectToSend = {
   name : newTask
   }
  console.log('send:', objectToSend);
  axios.post('/api/todos', objectToSend).then (function(repsonse)
  {console.log('back to post:',repsonse.data);
    fetchTodosList();
  }).catch(function(err)
   {console.log(err);
   alert('error to add task');

   })

  }


function deleteTask(id) {
  console.log('in delete Task:', id);
  axios.delete(`/api/todos?id=${id}`).then (function(response)
  {console.log('back into delete;', response.data)
    fetchTodosList();
  }).catch (function(err){console.log(err);
    alert('error in deleting task')

  })
}
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
      <h1>Blair's To DO APP </h1>
      <h2>Add New task:</h2>
      <input type="text" placeholder='New Task' onChange= {(e)=>{setNewTask(e.target.value)}}/>
      <button onClick={addNewtask} >Add Task</button>
      {
      todosList.map((item)=>(

        <p key={item.id}>{item.name}
        <button onClick={()=>{toggleComplete(item.id)}}>Is Complete?</button>
        <button onClick={()=>{deleteTask(item.id)}}>Delete?</button>
        </p>
      ))}
    </div>
  );

}

export default App
