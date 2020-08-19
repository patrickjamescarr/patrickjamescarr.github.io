import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './MenuDrawer.js';
import MenuDrawer from './MenuDrawer.js';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import BottomAppBar from './BottomBar';
import ActionPanel from './ActionsPanel';
import DotifyControls from './DotifyControls';
import { CssBaseline } from '@material-ui/core';
import Canvas from './Canvas';
import ImageProcessor from './ImageProcessor';
import OutputPanel from './OutputPanel';
import ScrollArea from 'react-scrollbar';


const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'consolas',
    ].join(','),
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);

    this.imageProcessor = new ImageProcessor();

    this.state = {
      image: new Image(),
      canvasRef: React.createRef(),
      outputCanvasRef: React.createRef(),
      showActionPanel: false,
      showOutputPanel: false,
      showCanvas: false,
      imageProcessed: false,
      actionPanelContent: () => { return (null) },
      actionPanelSettings: {
        dotify: {
          dotDiameter: 8,
          palette: null,
        },
      },
      outputCanvasDetails: {
        coloursUsed: [],
        dotsWidth: 0,
        dotsHeight: 0,
      },
      outputSettings: null,
      outputScale: 1,
    }
  }

  loadImage = (event) => {
    if (event.path && event.path[0]) {
      const image = event.path[0];
      const ctx = this.state.canvasRef.current.getContext('2d');
      ctx.canvas.width = image.naturalWidth;
      ctx.canvas.height = image.naturalHeight;
      ctx.drawImage(event.path[0], 0, 0);

      // clear the output canvas
      const outputCtx = this.state.outputCanvasRef.current.getContext('2d');
      outputCtx.clearRect(0, 0, outputCtx.canvas.width, outputCtx.canvas.height);

      this.setState({
        image: event.path[0],
        showActionPanel: false,
        showCanvas: false,
        imageProcessed: false,
        outputCanvasDetails: {
          coloursUsed: [],
          dotsWidth: 0,
          dotsHeight: 0,
        }
      });
    }
  }

  handleToggleActionsPanel = (event) => {
    let actionPanelContent = null;

    switch (event) {
      case "Dotify":
        actionPanelContent = DotifyControls;
        break;
      default:
        break;
    }
    this.setState({
      showActionPanel: !this.state.showActionPanel,
      actionPanelContent: actionPanelContent,
    });
  }

  handleActionPanelApply = (settings) => {
    const details = this.imageProcessor.processImage(
      this.state.canvasRef.current.getContext('2d'),
      this.state.outputCanvasRef.current.getContext('2d'),
      settings.dotDiameter, settings.palette,
      this.state.outputScale
    );
    this.setState({
      showCanvas: true,
      outputCanvasDetails: details,
      imageProcessed: true,
      showOutputPanel: true,
      outputSettings: settings,
    });
  }

  handCloseActionPanel = () => {
    this.setState({
      showActionPanel: !this.state.showActionPanel,
    });
  }

  handleCanvasToggle = () => {
    this.setState({
      showCanvas: !this.state.showCanvas,
    });
  }

  handleOutputPanelToggle = () => {
    this.setState({
      showOutputPanel: !this.state.showOutputPanel,
    });
  }

  handleOutputCanvasZoom = (event) => {
    console.log('zoom event');
    console.log(event);

    let scale = this.state.outputScale;

    scale += event.deltaY * -0.0025;

    // Restrict scale
    scale = Math.min(Math.max(.125, scale), 4);

    this.imageProcessor.redrawImage(
      this.state.canvasRef.current.getContext('2d'),
      this.state.outputCanvasRef.current.getContext('2d'),
      this.state.outputSettings.dotDiameter,
      scale,
      this.state.outputCanvasDetails.outputArray,
    );

    this.setState({
      outputScale: scale,
    });
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          <MenuDrawer
            onImageLoad={this.loadImage}
            menuItemClick={this.handleToggleActionsPanel}
          ></MenuDrawer>
          <ActionPanel
            show={this.state.showActionPanel}
            children={this.state.actionPanelContent}
            settings={this.state.actionPanelSettings}
            applyClick={this.handleActionPanelApply}
            closeClick={this.handCloseActionPanel}
          ></ActionPanel>
          <ScrollArea
            speed={0.8}
            horizontal={true}
            style={{width:'100%', height:'100%'}}
          >
            <Canvas
              canvasRef={this.state.canvasRef}
              showingActionPanel={this.state.showActionPanel}
              show={!this.state.showCanvas}
            ></Canvas>
            <Canvas
              canvasRef={this.state.outputCanvasRef}
              showingActionPanel={this.state.showActionPanel}
              show={this.state.showCanvas}
              zoom={this.handleOutputCanvasZoom}
            ></Canvas>
          </ScrollArea>
          <OutputPanel
            show={this.state.showOutputPanel}
            handleDrawerToggle={this.handleOutputPanelToggle}
            handleCanvasToggle={this.handleCanvasToggle}
            showCanvas={this.state.showCanvas}
            sourceCanvasRef={this.state.canvasRef}
            outputCanvasRef={this.state.outputCanvasRef}
            sourceImage={this.state.image}
            outputCanvasDetails={this.state.outputCanvasDetails}
            imageProcessed={this.state.imageProcessed}
          ></OutputPanel>
          <BottomAppBar
            image={this.state.image}
            showingActionPanel={this.state.showActionPanel}
            showOutputPanel={this.handleOutputPanelToggle}
          ></BottomAppBar>
        </div>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
