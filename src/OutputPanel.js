import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import { ListItemIcon, IconButton } from '@material-ui/core';
import ColourTable from './ColourTable';
import ScrollArea from 'react-scrollbar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: props => props.show ? 'flex' : 'none',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    sectionHeader: {
        minHeight: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1em',
        fontWeight: '600',
    },
    sectionDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginLeft: '15px',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    table: {
        overflow: 'auto',
    },
    footer: {
        minHeight: '59px',
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
    },
}));

function createThumbnail(showImage, src) {
    const imgPlaceholder = (<ListItemIcon><WallpaperIcon fontSize="large" /></ListItemIcon>);

    return showImage ? (<img src={src} alt="" style={{ maxHeight: "80px", maxWidth: "80px" }} />) : imgPlaceholder;
}

function OutputPanel(props) {
    const { window } = props;
    const classes = useStyles(props);

    const sourceSrc = props.sourceCanvasRef.current ? props.sourceCanvasRef.current.toDataURL() : '';
    const outputSrc = props.outputCanvasRef.current ? props.outputCanvasRef.current.toDataURL() : '';

    const srcThumbnail = createThumbnail(sourceSrc !== '', sourceSrc);
    const outputThumbnail = createThumbnail(props.imageProcessed, outputSrc);

    const panel = (
        <div className={classes.root}>
            <div className={classes.sectionHeader} >Output</div>
            <Divider />
            <List>
                <ListItem button key='image' selected={!props.showCanvas} onClick={() => props.handleCanvasToggle()}>
                    {srcThumbnail}
                    <div className={classes.sectionDetails}>
                        <div>
                            Source Image
                        </div>
                        <div >
                            w: {props.sourceImage.naturalWidth} px
                        </div>
                        <div>
                            h: {props.sourceImage.naturalHeight} px
                        </div>
                    </div>
                </ListItem>
                <ListItem button key='dot-canvas' selected={props.showCanvas} onClick={() => props.handleCanvasToggle()}>
                    {outputThumbnail}
                    <div className={classes.sectionDetails}>
                        <div>
                            Dot canvas
                        </div>
                        <div >
                            w: {props.outputCanvasDetails.dotsWidth}  dots
                        </div>
                        <div>
                            h: {props.outputCanvasDetails.dotsHeight} dots
                        </div>
                        <div>
                            total: {props.outputCanvasDetails.dotsWidth * props.outputCanvasDetails.dotsHeight}
                        </div>
                    </div>
                </ListItem>
            </List>
            <Divider />
            <div className={classes.sectionHeader} >Colours</div>
            <Divider />

            <ScrollArea
                speed={0.8}
                horizontal={false}
            >
                <ColourTable rows={props.outputCanvasDetails.coloursUsed}></ColourTable>
            </ScrollArea>

            <div className={classes.footer}>
                <IconButton onClick={props.handleDrawerToggle}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="persistent"
                        anchor="right"
                        open={false}
                        onClose={props.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {panel}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="persistent"
                        anchor="right"
                        open={props.show}
                    >
                        {panel}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default OutputPanel;
