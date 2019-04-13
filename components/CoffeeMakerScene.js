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
  ViroARTrackingTargets
} from 'react-viro';

export default class CoffeeMakerScene extends Component {

  state = {
    isTracking: false,
    initialized: false,
    text: 'Initializing tracking...'
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARObjectMarker target={"coffeemaker"} onAnchorFound={() => {
          this.setState({
            text: "Coffee Maker"
          })
        }}>
          <ViroFlexView
            style={styles.hud} 
            width={0.1} 
            height={0.05} 
            materials="hud_text_bg" 
            position={[0, 0.15, -0.01 ]}
            transformBehaviors={["billboardZ", "billboardY"]}
            opacity={1}
            // onClick
          >
            <ViroText 
              textClipMode="None"
              scale={[0.05, 0.05, 0.05]}
              text={this.state.text}
              style={styles.textStyle}
            />
            <ViroImage
              height={1}
              width={1}
              // placeholderSource={require("")}
              source={{uri: ""}} //should be an arrow, FlexView position will need to be dynamic
            />
          </ViroFlexView>
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

export { 
  CoffeeMakerScene
}