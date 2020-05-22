import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    claimRewardPoints,
    getGift,
    getBrand,
    stopPoll
} from '../../actions/dashboardActions';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { CircularProgress, Button } from '@material-ui/core';

class ClaimPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            claim: 0
        };
    }

    componentDidMount(){
        const {
            getGift,
            getBrand,
            match
        } = this.props;
        getBrand(match.params.id);
        getGift(match.params.id);
    }

    componentWillUnmount(){
        const {
            stopPoll
        } = this.props;
        stopPoll();
    }

    renderBrand = () => {
        const {selectedBrand} = this.props;
        return (
            <>
                <div
                    style={{
                        marginTop: 100,
                        marginRight: 10,
                        display: 'block'
                    }}>
                    <Typography component='h1' variant='h5'>
                        {selectedBrand.name}
                    </Typography>
                </div>

            </>
        )
    }

    handleChange = (event) => {
        event.persist();
        this.setState({
            claim: event.target.value
        });
    }

    renderGift = (gift) => {
        const {
            claim
        } = this.state;
        const {
            claimRewardPoints
        } = this.props;
        const error = (claim > gift.gifted_lp || claim === 0 || claim <= 0);
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h3>Available Points</h3>
                    <h5 style={{ textAlign: 'center'}}>{gift.gifted_lp}</h5>
                </div>
                <div>
                    <h3>Claim</h3>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='claim'
                      label='Claim Points'
                      id='max_lp'
                      type='number'
                      onChange={this.handleChange}
                      value={claim || ''}
                      error={error}
                      helperText={error && 'No points to claim or gifted points '}
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      disabled={error}
                      onClick={() => {
                          claimRewardPoints({
                            brand_id: gift.brand_id,
                            claim_lp: claim
                          })
                      }}
                    >
                        Claim
                    </Button>
                </div>
                <div>
                    <h3>Claimed Points</h3>
                    <h5 style={{ textAlign: 'center'}}>{gift.claimed_lp}</h5>
                </div>
            </div>
        )
    }

    render(){
        const { gift } = this.props;
        return (
            <Container maxWidth='lg'>
                {this.renderBrand()}
                {
                    gift &&
                    gift.user_id
                    ?
                    <>
                     {this.renderGift(gift)}
                    </>
                    : 'No Gift available'
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.AuthStore, ...state.DashboardStore });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      getGift,
      claimRewardPoints,
      getBrand,
      stopPoll
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClaimPage);
