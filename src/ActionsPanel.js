import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: props => props.show ? 'flex' : 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        overflow: 'hidden',
        marginLeft: '50px',
    },
    header: {
        height: '56px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.4em',
        fontWeight: '600',
    },
}));

export default function ActionPanel(props) {
    const classes = useStyles(props);
    const Controls = props.children;

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
                <div className={classes.header}>Dotify</div>
                <Divider />
                <Controls settings={props.settings} applyClick={props.applyClick} closeClick={props.closeClick}></Controls>
            </Drawer>
        </div>
    );
}
