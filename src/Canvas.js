import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    workspace: {
        width: '100%',
        height: '100%',
        display: props => props.show ? 'flex' : 'none',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: '59px',
        paddingLeft: props => props.showActionPanel ? '290px' : '50px',
    },
}));

export default function Canvas(props) {
    const classes = useStyles(props);

    return (
        <div className={classes.workspace}>
            <canvas onWheel={(event) => props.zoom(event)} ref={props.canvasRef} ></canvas>
        </div>
    );
}