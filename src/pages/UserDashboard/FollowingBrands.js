import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrandProfileCard } from '../../components';
import {
    fetchFollowingBrands,
    setSelectedBrand
} from '../../actions/dashboardActions';

class FollowingBrands extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIds: []
        };
    }

    componentDidMount(){
        const {
            fetchFollowingBrands,
            setSelectedBrand
        } = this.props;
        fetchFollowingBrands();
    }

    renderFollowingBrands = () => {
        const {
            followingBrands,
            setSelectedBrand
        } = this.props;
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
                    spacing={4}
                    >
                    {followingBrands.map( brand =>
                        <Grid
                            key={brand.id}
                            item
                            xs={12} sm={4} md={3} lg={3} xl={3}
                            >
                            <BrandProfileCard
                                key={brand.id}
                                id={brand.id}
                                name={brand.name}
                                max_lp={brand.max_lp}
                                href={true}
                                />
                        </Grid>
                    )}
                </Grid>
            </>
        )
    }

    render(){
        return (
            <Container maxWidth='lg'>
                {this.renderFollowingBrands()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.AuthStore, ...state.DashboardStore });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      fetchFollowingBrands,
      setSelectedBrand
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FollowingBrands);
