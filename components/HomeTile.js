import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#b6b7ba',
    height: 117,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 21,
    fontFamily: 'HelveticaNeue-Medium',
    marginBottom: 10
  },
  subheaderText: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Light',
  },
  iconWrapper: {
    marginHorizontal: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPressTile}> 
    <View style={styles.iconWrapper}>
       <Image source={props.icon}/>
    </View>
    <View style={{width: '75%'}}>
      <Text style={styles.headerText}>{props.headerText}</Text>
      <Text style={styles.subheaderText}>{props.subheaderText}</Text>
    </View>
  </TouchableOpacity>
);
