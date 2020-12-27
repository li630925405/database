
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Register from "./register";
import Login from "./login";


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomepageLayout}/>
      <Route exact path='/register' component={Register}/>
      <Route path='/login' component={Login}/>

      {/* <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/> */}
    </Switch>
  </main>
)

export default Main