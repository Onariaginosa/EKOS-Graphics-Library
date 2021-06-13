/**
 * This React app serves as a very thin “wrapper” around what is otherwise pure WebGL code.
 * With the exception of a couple of reusable modules, the BareBonesWebGL and LessBareBonesWebGL
 * components are devoid of design---they are meant to introduce you to WebGL but are not meant
 * to be models to emulate. In other words, focus on the functionality and not the form. Once you
 * feel you’ve gotten into a groove with WebGL yourself, feel free to delete these components and
 * underlying modules so you can go with your own approach for a high-level 3D graphics library.
 */
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom"
import "./App.css"
import FrozenScapes from "./FrozenScapes/FrozenScapes"
import SnowBox from "./SnowBox"

const Greeting = () => (
  <article>
    <h1>
      Welcome to FrozenScapes.
    </h1>
    <p>
      Be sure to visit our <a href="https://krezaey.github.io/ahtohallan">sister site</a>!
    </p>
    <p>
      Both are inspired by the FCU (Frozen Cinematic Universe)!
    </p>
    <p>
      Be sure to watch all of the movies (and deleted content) to understand the lore!
    </p>
  </article>
)

const App = () => {
  return (
    <article className="App">
      <Router>
        <nav>
          <NavLink activeClassName="current" to="/snow-box">
            Snow Box
          </NavLink>
          <NavLink activeClassName="current" to="/frozen-scapes">
            Frozen Scapes
          </NavLink>
        </nav>
        <main>
          <Switch>
            <Route path="/frozen-scapes" component={ FrozenScapes } />
            <Route path="/snow-box" component={ SnowBox } />
            <Route component={ Greeting } />
          </Switch>
        </main>
      </Router>
    </article>
  )
}

export default App
