import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slider, Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    button: {
        textTransform: 'lowercase',
        fontWeight: '700',
        margin: theme.spacing(1),
        width: '91.5px',
    },
    slider: {
        color: theme.palette.action.active,
    },
    sliderTitle: {
        float: 'left',
    },
    controlContainer: {
        padding: '20px',
        paddingBottom: '0',
    },
    paletteButton: {
        width: '66.6px',
    },
    footer: {
        marginTop: 'auto',
        paddingBottom: '12px',
    },
}));

export default function DotifyControls(props) {
    const classes = useStyles(props);

    const [dotDiameter, setDiameter] = React.useState(props.settings.dotify.dotDiameter);
    const [palette, setPalette] = React.useState('source');

    const handleDiameterChange = (event, newValue) => {
        setDiameter(newValue);
    };

    const handlePaletteChange = (event, newPalette) => {
        setPalette(newPalette);
    };

    return (
        <div className={classes.root}>
            <div className={classes.controlContainer}>
                <Typography className={classes.sliderTitle} id="dot-diameter-slider" align='left' gutterBottom>
                    Dot diameter
                </Typography>
                <Typography id="dot-diameter-value" align='right' gutterBottom>
                    {dotDiameter} px
                </Typography>
                <Slider
                    className={classes.slider}
                    value={dotDiameter}
                    aria-labelledby="dot-diameter-slider"
                    step={1}
                    min={1}
                    max={100}
                    valueLabelDisplay="off"
                    onChange={handleDiameterChange}
                />
            </div>
            <div className={classes.controlContainer}>
                <Typography id="colour-palette-label" align='left' gutterBottom>
                    Colour palette
                </Typography>
                <ToggleButtonGroup
                    value={palette}
                    exclusive
                    onChange={handlePaletteChange}
                    aria-label="colour palette"
                    aria-labelledby="colour-palette-label"
                    size="small"
                >
                    <ToggleButton className={classes.paletteButton} value="source" aria-label="centered">
                        source
                    </ToggleButton>
                    <ToggleButton className={classes.paletteButton} value="lego" aria-label="centered">
                        lego
                    </ToggleButton>
                    <ToggleButton className={classes.paletteButton} value="custom" aria-label="centered" disabled>
                        custom
                    </ToggleButton>

                </ToggleButtonGroup>
            </div>
            <div className={classes.footer}>
                <Button id="actions-close-button" className={classes.button} size="small" variant="contained" onClick={() => props.closeClick()}>Close</Button>
                <Button id="actions-apply-button" className={classes.button} size="small" variant="contained" color="primary" onClick={() => props.applyClick({ dotDiameter: dotDiameter, palette: palette })}>
                    Apply
                </Button>
            </div>

        </div>
    );
}
