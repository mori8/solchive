import './App.css';
import { Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Project from './components/Project';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <div>
        <Header/>
        <Route exact path="/projects" component={ProjectList}/>
        <Route path="/project/:id" component={Project}/>
        <Footer/>
    </div>
  );
}

export default App;
