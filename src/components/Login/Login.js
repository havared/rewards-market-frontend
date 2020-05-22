import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CircularProgress, Button } from '@material-ui/core';
import useForm from './useForm';
import validate from './LoginFormRules';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props){
    const classes = useStyles();

    const attemptLogin = () => {
        props.tryLogin({...values})
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(attemptLogin, validate);

    if (props.redirectTo) {
        return <Redirect to={props.redirectTo} />;
    }

    const { isLoading } = props;
    return (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                type='email'
                onChange={handleChange}
                value={values.email || ''}
                error={errors.email}
                helperText={errors.email}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                type='password'
                onChange={handleChange}
                value={values.password || ''}
                error={errors.password}
                helperText={errors.password}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={isLoading}
              >
                {
                    isLoading
                    ? <CircularProgress size={24} />
                    : 'Sign In'
                }
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href='/signup' variant='body2'>
                    {'Dont have an account? Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    )
}
