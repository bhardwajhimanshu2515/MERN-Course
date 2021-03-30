import logo from './logo.svg';
import './App.css';
import Header from "./shared/header";
import Quotes from "./components/quotes";
function App() {
  return (
    <div className="App">
      <Header />
      <Quotes />
    </div>
  );
}

export default App;
