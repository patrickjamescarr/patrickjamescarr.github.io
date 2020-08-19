import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import ImageLoader from './ImageLoader';

const drawerWidth = 50;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: 'hidden',
  },
  listItem: {
    paddingLeft: '13px',
    paddingRight: '13px',
  },
}));

export default function MenuDrawer(props) {
  const classes = useStyles();
  const imageLoader = new ImageLoader();
  const image = imageLoader.getImage();

  image.onload = props.onImageLoad;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Divider />
        <List>
          <ListItem className={classes.listItem} button key={"Add Image"} onClick={() => imageLoader.select()}>
            <ListItemIcon><AddPhotoAlternateIcon /></ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <ListItem className={classes.listItem} button key={"Dotify"} onClick={() => props.menuItemClick("Dotify")}>
          <ListItemIcon><BlurOnIcon /></ListItemIcon>
        </ListItem>
      </Drawer>
    </div>
  );
}
