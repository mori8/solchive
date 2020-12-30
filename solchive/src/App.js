import logo from './logo.svg';
import './App.css';
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
