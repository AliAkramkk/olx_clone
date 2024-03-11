import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import Login from './Pages/Login';
import ViewPost from './Pages/ViewPost'
import Post from './store/PostContext'
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';

function App() {
      const {setUser,user} = useContext(AuthContext)
      const {firebase} = useContext(FirebaseContext)
      useEffect(()=>{
           
          firebase.auth().onAuthStateChanged((user)=>{
    
            setUser(user)
          })
      })
  return (
    <div>
      <Post>

      <Router>
<Route exact path="/">

      <Home />
</Route>
<Route path="/signup">

      <Signup />
</Route>
<Route path="/login">

      < Login/>
</Route>
<Route path="/create">

      < Create/>
</Route>
<Route path="/view">

      < ViewPost/>
</Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
