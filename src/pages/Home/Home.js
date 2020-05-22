import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '@material-ui/core/Container';
import { Login, Signup } from '../../components';
import {
    tryLogin,
    trySignup
} from '../../actions/authActions';
import {
  Switch,
  Route
} from 'react-router-dom';

class Home extends Component{
    render(){
        const {
            isLoading,
            tryLogin,
            trySignup,
            redirectTo
        } = this.props;
        return (
            <Container component='main' maxWidth='xs'>
                <Switch>
                  <Route exact path={['/signin', '/']}>
                      <Login
                          isLoading={isLoading}
                          tryLogin={tryLogin}
                          redirectTo={redirectTo}
                          />
                  </Route>
                  <Route exact path='/signup'>
                      <Signup
                        isLoading={isLoading}
                        trySignup={trySignup}
                        redirectTo={redirectTo}
                        />
                  </Route>
                </Switch>
            </Container>
        )
    }
}

const mapStateToProps = state => ({ ...state.AuthStore });

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        tryLogin,
        trySignup
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
