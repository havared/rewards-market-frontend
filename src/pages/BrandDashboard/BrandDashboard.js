import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrandNavbar, UserProfileCard } from '../../components';
import {
    fetchBrandFollowingUsers,
    giftUsers
} from '../../actions/dashboardActions';
import {
  Switch,
  Route
} from 'react-router-dom';

class BrandDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIds: []
        };
    }

    componentDidMount(){
        const {
            fetchBrandFollowingUsers
        } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        fetchBrandFollowingUsers(user.brand.id);
    }

    followBrands = () => {
        const {selectedIds} = this.state;
        const { followBrands} = this.props;
        if(selectedIds.length > 0){
            followBrands({brands: selectedIds});
        }
    }

    renderUsers = () => {
        const {
            allUsers
        } = this.props;
        const brandOwner = JSON.parse(localStorage.getItem('user'));
        return (
            <>
                <div
                    style={{
                        marginTop: 100,
                        marginRight: 10,
                        display: 'block'
                    }}>
                </div>
                <Grid
                    container
                    >
                    {allUsers.map( user =>
                        <Grid
                            key={user.id}
                            item
                            xs={12} sm={4} md={3} lg={3} xl={3}
                            spacing={3}
                            >
                            <UserProfileCard
                                key={user.id}
                                user={user}
                                max_lp={
                                    brandOwner.brand && brandOwner.brand.max_lp
                                    ? brandOwner.brand.max_lp
                                    : 0
                                }
                                brand_id={brandOwner.brand.id}
                                giftUsers={this.props.giftUsers}
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
                <BrandNavbar/>
                {this.renderUsers()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.AuthStore, ...state.DashboardStore });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      fetchBrandFollowingUsers,
      giftUsers
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BrandDashboard);
