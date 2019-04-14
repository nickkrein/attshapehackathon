import React, { Component } from 'react';
import { AppRegistry, View, Text, StatusBar, Dimensions } from 'react-native';
import {
  ViroARSceneNavigator,
} from 'react-viro';

import CoffeeMakerScene from '../components/CoffeeMakerScene';
import CameraOverlayWrapper from '../components/CameraOverlayWrapper';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class ARAssistant extends Component {
  state = {
    detected: false,
    viroARImageDisplay: 'none',
  }

  anchorDetected = () => {
    this.setState({
      detected: true,
    })
  }

  showImages = () => {
    this.setState({
      viroARImageDisplay: 'flex',
    })
  } 

  render() {
    return (
      <View style={{flex:1, position: 'relative'}}>
        <ViroARSceneNavigator style={{flex:0, height: screenHeight, width: screenWidth}}
          apiKey="24FFE0AB-3751-4FCA-B0EA-7033260927EC"
          numberOfTrackedImages={2}
          initialScene={{
            scene: CoffeeMakerScene,
            passProps: {
              anchorDetected: this.anchorDetected,
              viroARImageDisplay: this.state.viroARImageDisplay
            }
          }}
        />
        <View style={{position: 'absolute', top:0, right:0, left: 0}}>
          <CameraOverlayWrapper detected={this.state.detected} />
        </View>
      </View>
    )
  }
}
