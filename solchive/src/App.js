import './App.css';
import { Route } from 'react-router-dom'
import Header from './components/Sections/Header';
import Footer from './components/Sections/Footer';
import Project from './components/Projects/Project';
import CreateProject from './components/Projects/CreateProject/CreateProject';
import UpdateProject from './components/Projects/UpdateProject/UpdateProject';
import Login from './components/Auth/Login';
import Main from './components/Main/Main';
import "./fonts/fonts.css";

function App() {
  return (
    <div>
        <Header/>
        <Route exact path="/" component={Main}/>
        <Route path="/projects/:id" component={Project}/>
        <Route path="/create" component={CreateProject}/>
        <Route path="/update/:id" component={UpdateProject}/>
        <Route path="/login" component={Login}/>
        <Footer/>
    </div>
  );
}

export default App;
