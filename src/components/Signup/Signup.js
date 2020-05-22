import React from 'react';
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
import validate from './SignupFormRules';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const attemptSignup = () => {
      const payload = {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          is_brand: values.is_brand,
          ...(values.is_brand) && { brand:{
              name: values.brand,
              max_lp: values.max_lp
          }}
      };

      props.trySignup(payload)
  };

  const {
      values,
      errors,
      handleChange,
      handleSubmit,
  } = useForm(attemptSignup, validate);

  const { isLoading } = props;

  const {is_brand} = values;

  if (props.redirectTo) {
      return <Redirect to={props.redirectTo} />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstname'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={handleChange}
                value={values.firstname || ''}
                error={errors.firstname}
                helperText={errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastname'
                autoComplete='lname'
                onChange={handleChange}
                value={values.lastname || ''}
                error={errors.lastname}
                helperText={errors.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
                value={values.email || ''}
                error={errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleChange}
                value={values.password || ''}
                error={errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={is_brand} onChange={handleChange} color='primary' name='is_brand'/>}
                label='Register as brand.'
              />
            </Grid>
            {
                is_brand
                &&
                <>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        required
                        fullWidth
                        name='brand'
                        label='Brand'
                        id='brand'
                        onChange={handleChange}
                        value={values.brand || ''}
                        error={errors.brand}
                        helperText={errors.brand}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        required
                        fullWidth
                        name='max_lp'
                        label='Loyal Points'
                        id='max_lp'
                        type='number'
                        onChange={handleChange}
                        value={values.max_lp || ''}
                        error={errors.max_lp}
                        helperText={errors.max_lp}
                      />
                    </Grid>
                </>
            }
          </Grid>
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
                  : 'Sign Up'
              }
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
