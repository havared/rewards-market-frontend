import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UserNavbar, BrandProfileCard } from '../../components';
import {
    fetchAllBrands,
    fetchFollowingBrands,
    followBrands
} from '../../actions/dashboardActions';
import {
  Switch,
  Route
} from 'react-router-dom';
import FollowingBrands from './FollowingBrands';
import ClaimPage from './ClaimPage';

class UserDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIds: []
        };
    }

    componentDidMount(){
        const {
            fetchAllBrands
        } = this.props;
        fetchAllBrands();
    }

    setSelectedId = (id) => {
        let {selectedIds} = this.state;
        const index = selectedIds.indexOf(id);
        if(index > -1){
            selectedIds = [...selectedIds.slice(0, index), ...selectedIds.slice(index + 1)]
        }else{
            selectedIds.push(id);
        }
        this.setState({
            selectedIds
        });
    }

    followBrands = () => {
        const {selectedIds} = this.state;
        const { followBrands} = this.props;
        if(selectedIds.length > 0){
            followBrands({brands: selectedIds});
        }
    }

    renderDashboard = () => {
        const {
            allBrands
        } = this.props;
        const {selectedIds} = this.state;
        return (
            <>
                <div
                    style={{
                        marginTop: 100,
                        marginRight: 10,
                        display: 'block'
                    }}>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                        style={{float: 'left', marginTop: 10, marginTop: 20 }}
                        >
                        {
                            selectedIds.length > 0
                            ? selectedIds.length + ' selected'
                            :'Click on brands to follow them'
                        }
                    </Typography>
                    <Button
                        variant='contained' color='primary'
                        disabled={selectedIds.length === 0}
                        style={{float: 'right', marginBottom: 20}}
                        onClick={this.followBrands}
                        >
                        Follow
                    </Button>
                </div>
                <Grid
                    container
                    >
                    {allBrands.map( brand =>
                        <Grid
                            key={brand.id}
                            item
                            xs={12} sm={4} md={3} lg={3} xl={3}
                            spacing={3}
                            >
                            <BrandProfileCard
                                key={brand.id}
                                id={brand.id}
                                name={brand.name}
                                max_lp={brand.max_lp}
                                setSelectedId={this.setSelectedId}
                                selected={(selectedIds.indexOf(brand.id) > -1)}
                                />
                        </Grid>
                    )}
                </Grid>
            </>
        )
    }

    render(){
        return (
            <Container maxWidth="lg">
                <UserNavbar/>
                <Switch>
                  <Route exact path={['/user/dashboard']}>
                      {this.renderDashboard()}
                  </Route>
                  <Route exact path='/user/following'>
                      <FollowingBrands/>
                  </Route>
                  <Route exact path='/user/brand/:id' render={({ match }) => {
                        return <ClaimPage
                                  {...this.props}
                                  match={match}
                                  />;
                              }}
                      />
                </Switch>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.AuthStore, ...state.DashboardStore });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      fetchAllBrands,
      fetchFollowingBrands,
      followBrands
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
