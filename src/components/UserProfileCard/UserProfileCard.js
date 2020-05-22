import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function UserProfileCard(props) {
  const classes = useStyles();
  const [gift, setGift] = useState('');
  const {user, max_lp, brand_id, giftUsers} = props;

  const handleChange = (event) => {
      setGift(event.target.value);
  }

  const error = (gift <= 0 || gift > max_lp);

  const handleGift = () => {
      const payload = {
          brand_id: brand_id,
          gifts: [{
              lp: gift,
              user_id: user.id
          }]
      };
      giftUsers(payload);
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="user" className={classes.avatar}>
            {user.firstname[0] + user.lastname[0]}
          </Avatar>
        }
        title={user.firstname + ' ' + user.lastname}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
          <TextField
            variant='outlined'
            required
            fullWidth
            name='claim'
            label='Gift'
            id={'gift' + user.id}
            type='number'
            onChange={handleChange}
            value={gift || ''}
            error={error}
            helperText={error && 'Enter valid value'}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={error}
            onClick={handleGift}
          >
              Gift
          </Button>
      </CardActions>
    </Card>
  );
}
