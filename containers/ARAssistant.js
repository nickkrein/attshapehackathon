import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';

import CoffeeMakerScene from '../components/CoffeeMakerScene';

export default class ARAssistant extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <ViroARSceneNavigator style={{flex:1}}
          apiKey="24FFE0AB-3751-4FCA-B0EA-7033260927EC"
          numberOfTrackedImages={2}
          initialScene={{scene: CoffeeMakerScene}}
        />
      </View>
    )
  }
}
