import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { css, jsx } from '@emotion/core';

const useStyles = makeStyles({
    media: { height: 140, width:'100%' },
    cardAction: {
        display: 'block',
        textAlign: 'initial',
        width: '100%'
    },
    selectedCard: {
        maxWidth: 300,
        border: '1px solid green'
    },
    card: {
        maxWidth: 300
    }
});

export default function BrandProfileCard({id, name, max_lp, avatar, setSelectedId, selected, href, setSelectedBrand}) {
    const classes = useStyles();
    return (
        <Card className={selected? classes.selectedCard: classes.card}>
            <ButtonBase
                className={classes.cardAction}
                onClick={event => {
                    !href && setSelectedId(id);
                 }}
                >
                <CardActionArea>
                    <CardMedia
                        className={classes.media}>

                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {name}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'>
                            {max_lp}{' lp'}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </ButtonBase>
            <CardActions>
            <Button
                href={href && '/user/brand/' + id}
                size='small'
                color='primary'
                onClick={event => {
                    href && setSelectedBrand();
                }}
                >
                {href? 'Claim Rewards': 'Follow'}
            </Button>
            </CardActions>
        </Card>
    );
}
