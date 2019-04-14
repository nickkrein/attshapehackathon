'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroCamera,
  ViroNode,
  ViroFlexView,
  ViroARObjectMarker,
  ViroMaterials,
  ViroDirectionalLight,
  ViroText,
  ViroImage,
  ViroButton,
  ViroConstants,
  ViroARTrackingTargets,
  ViroAnimations
} from 'react-viro';
import { arrowFunctionExpression } from '@babel/types';

import CameraOverlayWrapper from './CameraOverlayWrapper';

export default class CoffeeMakerScene extends Component {

  state = {
    isTracking: false,
    initialized: false,
    text: 'Initializing tracking...',
    // display: this.props.viroARImageDisplay,
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARObjectMarker target={"coffeemaker"} onAnchorFound={() => {
          this.props.anchorDetected();
        }}>
          <ViroImage
            style={{display: 'none', flex: 1}}
            position={[0, 0.15, -0.01 ]}
            height={.07}
            width={.05}
            // placeholderSource={require("")}
            source={require("../assets/ar-camera/up_arrow.png")}
          />
        </ViroARObjectMarker>
      </ViroNode>
    )
  }

  getNoTrackingUI(){
    <ViroCamera active={this.state.isTracking}>
      <ViroFlexView
        width={1} 
        height={0.1} 
        materials="hud_text_bg" 
        position={[0, 0, -1]}
        transformBehaviors={["billboardX", 'billboardZ']}
      >
        <ViroText 
          text="Cannot find target"
          style={styles.textStyle}
        />
      </ViroFlexView>
    </ViroCamera>
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        { !this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() } 
      </ViroARScene>
    );
  }


  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true,
        initialized: true,
        text: ''
      })
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        isTracking: false,
        text: this.state.initialized ? 'Tracking lost' : 'Initializing...'
      })
    }
  }
}

// _onButtonTap() {
//   this.setState({
//       buttonStateTag: "onTap"
//   });
// }

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageStyle: {
    flex: 1,
  },
  hud: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
});

ViroARTrackingTargets.createTargets({
  "coffeemaker": {
    source: require('../assets/Coffee_Maker.arobject'),
    type : 'Object'
  }
});

ViroMaterials.createMaterials({
  hud_text_bg: {
    lightingModel: "Constant",
    diffuseColor: "rgba(0,0,0,.5)"
  }
});

ViroAnimations.registerAnimations({
  stepOne:{
    properties:{ 
      positionY: 0.2, 
    },
    easing: "EaseOut",
    duration: 3000,
  }
  //add other step animations here
});

export { 
  CoffeeMakerScene
}