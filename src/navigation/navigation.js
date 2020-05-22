import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';
import {
     HomePage,
     UserDashboard,
     BrandDashboard
} from '../pages';


function PrivateRoute({ children, ...rest }) {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user && user.accessToken? (
                    children
                ) : (
                  <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: location }
                    }}
                  />
                )
            }
        />
    );
}

export default function Navigation() {
  return (
    <Router>
        <Switch>
            <Route path='/user'>
                <UserDashboard />
            </Route>
            <Route path='/brand'>
                <BrandDashboard />
            </Route>
            <Route path='/'>
                <HomePage />
            </Route>

        </Switch>
    </Router>
  );
}
