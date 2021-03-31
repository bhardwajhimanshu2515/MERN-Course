import "./styles.css";
import Header from "../src/shared/header";
import Home from "../src/components/home";
import About from "../src/components/about";
import Contact from "../src/components/contact";

import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
