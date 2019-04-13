import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeTile from '../components/HomeTile';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  headerTextWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#b6b7ba',
    height: 117,
  },
  headerText: {
    fontSize: 21,
    fontFamily: 'HelveticaNeue-Medium',
    marginBottom: 10
  },
  subheaderText: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Light',
    textAlign: 'center'
  },
  searchBar: {
    height: 43,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  searchBarText: {
    color: '#707070',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    marginLeft: 15
  },
  icon: {
    fontSize: 25,
    color: '#707070'
  }
});

export default class Home extends Component {
  state = {

  };

  static navigationOptions = () => {
    return {
     title: 'Home',
     headerStyle: {
       backgroundColor: '#E50075',
     },
     headerTitleStyle: {
      color: 'white',
      fontSize: 21,
      fontFamily: 'HelveticaNeue-Bold'
     }     
    }
  }

  render() {
    const { navigation: { navigate }} = this.props;

    return (
      <View>
        <View style={styles.searchBar}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="ios-search" style={styles.icon} />
            <Text style={styles.searchBarText}>How can we help you today?</Text>
          </View>
          <Icon name="ios-mic"  style={styles.icon}/>
        </View>
        <View style={styles.headerTextWrapper}> 
          <Text style={styles.headerText}>Support</Text>
          <Text style={styles.subheaderText}>Have a problem? Help us identify what's wrong so we can connect you with your own personalized agent.</Text>
        </View>
        <HomeTile 
          icon={require('../assets/question.png')}
          headerText="I Need Help"
          subheaderText="Troubleshooting? Something went wrong?"
          onPressTile={() => null}
        />
        <HomeTile 
          icon={require('../assets/user-with-headset.png')}
          headerText="Speak to an Agent"
          subheaderText="Can't fix your problem? Connect to an agent to help you out."
          onPressTile={() => null}
        />
        <HomeTile 
          icon={require('../assets/photo-camera.png')}
          headerText="AR Assistant"
          subheaderText="Use your camera to help diagnose your issue and solve it."
          onPressTile={() => navigate('ARAssistant')}
        />
      </View>
    );
  }
}