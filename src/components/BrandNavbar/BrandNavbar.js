import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    }
}));
export default function UserNavbar() {
    const classes = useStyles();
    return (
          <React.Fragment>
              <AppBar>
                  <Toolbar>
                    <Typography
                        variant='h6'
                        color='inherit'
                        noWrap
                        className={classes.title}>
                        Rewards Market
                    </Typography>
                    <Button color='inherit'>Logout</Button>
                  </Toolbar>
              </AppBar>
          </React.Fragment>
      )
}
