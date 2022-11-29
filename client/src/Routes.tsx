import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/new">
        <NewContact />
      </Route>
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
