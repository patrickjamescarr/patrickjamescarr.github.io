import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    marginLeft: props => props.showingActionPanel ? '290px' : '50px',
    maxHeight: '43px',
    minHeight: '43px',
    height: '43px',
  },
  imageDimentions: {
    width: '200px',
    fontSize: '0.7rem',
  },
  scrollbar: {
    marginLeft: props => props.showingActionPanel ? '290px' : '50px',
    height: '16px',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function BottomAppBar(props) {
  const classes = useStyles(props);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <div className={classes.scrollbar}>
        <div className={classes.imageDimentions}>{props.image.naturalWidth} x {props.image.naturalHeight} px @ 100%</div>
        <Divider orientation="vertical" />
      </div>
      <Toolbar className={classes.toolbar}>
        <div className={classes.grow} />
        <IconButton edge="end" color="inherit">
          <MoreIcon onClick={() => props.showOutputPanel()} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
