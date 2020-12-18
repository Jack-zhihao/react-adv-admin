import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {defaultRouter} from './router'
import './assets/scss/common.scss'
import './assets/scss/reset.scss'
import {getCookie} from './utils/cookie'
function App() {
  console.log(getCookie('info'))
  return (
    <div className="App">
      <Switch>
        {defaultRouter.map(r => <Route key={r.key} path={r.path} component={r.component} />)}
        <Redirect from="/" to="/login"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
