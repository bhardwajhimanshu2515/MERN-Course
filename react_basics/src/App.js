import logo from './logo.svg';
import './App.css';
import Home from "./components/home";
import Header from "./shared/header";
function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
