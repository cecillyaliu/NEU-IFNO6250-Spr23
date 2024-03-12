import './App.css';
import TodoItem from './TodoItem';
import Test from './Test';
import someImage from './images/meet-cats.gif';
import MovieSequels from './MovieSequels';
import Meow from './Meow';
import {useState} from 'react';
import Switch from './Switch';
import TodoList from './TodoList';


import Content from './Content';
import Login from './Login';

function App() {


  // const [name, setName] = useState('');

  // const [inProgress, setInProgress] = useState('');
  // const [saved, setSaved] = useState('');

  // const [isOn, setIsOn] = useState(false);

  // const [todos, setTodos] = useState([
  //   'Pounce',
  //   'Chase Laser Pointer',
  //   'Nap',
  // ]);
  // const [newTodo, setNewTodo] = useState('');

  // const [student, setStudent] = useState({
  //   name: 'Jat', grade:'87'
  // });
  // const [grade, setGrade] = useState(student.grade);




  // let content;
  // if (isLoggedIn) {
  //   content = (
  //     <div>
  //       Hello {username}
  //       <button onClick={ () => setIsLoggedIn(false)}>
  //         Logout
  //       </button> 
  //     </div>
  //   );
  // } else {
  //   content = (
  //     <form>
  //       <label>
  //         <span>Username:</span>
  //         <input 
  //           value={username}
  //           onInput={(e) => setUsername(e.target.value)}
  //         />
  //       </label>
  //       <button type="button" onClick={() => setIsLoggedIn(true)}>
  //         Login
  //       </button>
  //     </form>
  //   );

  // };


  // const content = (
  //   <div>
  //     Hello {username}
  //     <button onClick={ () => setIsLoggedIn(false)}>
  //       Logout
  //     </button> 
  //   </div>
  // );
  // const login = (
  //   <form>
  //     <label>
  //       <span>Username:</span>
  //       <input 
  //         value={username}
  //         onInput={(e) => setUsername(e.target.value)}
  //       />
  //     </label>
  //     <button type="button" onClick={() => setIsLoggedIn(true)}>
  //       Login
  //     </button>
  //   </form>
  // );

  // login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const onLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  }

  const onLogout = () => setIsLoggedIn(false);
  
  return (
    <div className="App">
      { isLoggedIn 
      ? <Content
        username={username}
        onLogout={onLogout}
      />
      : <Login
        onLogin={onLogin}
      />
      }

      {/* {content} */}
      
      {/* { isLoggedIn 
        ? content
        : login
      } */}

      {/* <div>Name: {student.name}, Grade: {student.grade}</div>
      Grade:
      <input  
        value={grade}
        onInput={ (e) => setGrade(e.target.value)}
      />
      <button
        onClick={() => setStudent({...student, grade})}
      >
        Save new grade
      </button> */}

      {/* <TodoList list={todos}/>
      <input 
        value={newTodo}
        onInput={ (e) => setNewTodo(e.target.value)}
      />
      <button
        onClick={ () => setTodos([...todos, newTodo])}
      >
        Save
      </button> */}


      {/* <p>Last Name seen was {name}</p>
      <label>
        <span>Name: </span>
        <input 
          value={name}
          onInput={ (e) => setName(e.target.value)}
          />
      </label> */}
      
      {/* <p>Name in progress is {inProgress}</p>
      <p>Last Saved name was {saved}</p>
      <label>
        <span>Name: </span>
        <input 
          value={inProgress}
          onInput={ (e) => setInProgress(e.target.value)}
        />
        <button
          type="button"
          onClick={ () => setSaved(inProgress)}
          >Save
          </button>
      </label> */}

      {/* <Switch isFlipped={isOn}/>
      <button onClick={() => setIsOn(!isOn)}>Flip</button> */}

      {/* <ul>
        <li>Jim</li>
        <li>Jean</li>
        <li>Ma</li>
      </ul>
      <input/>
      <Test/>
      <TodoItem task="Pounce" done={true}/>
      <img src={someImage} alt="meeting cats" width={200}/>
      <MovieSequels count={3}/>
      <Meow/>
      <Test onClick={ () => console.log('ow')}/> */}
    </div>
  );
}

export default App;
