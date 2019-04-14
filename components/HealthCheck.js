import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const data = {
  "HasPower":  [true, "On", "Off"],
  "Brewing": [
      false,
      "Yes",
      "No"
  ],
  "HasGrind": [
      true,
      "Detected",
      "No"
  ],
  "HasFilter": [
      false,
      "Yes",
      "No"
  ],
  "HasHeat": [
      true,
      "Yes",
      "No"
  ],
  "HasWater": [
      false,
      "Yes",
      "No"
  ],
  "Errors": [
       [ 0, "OK" ]
  ]
}

export default HealthCheck = ({ props }) => {
  const { HasPower, Brewing, HasGrind, HasFilter, HasHeat, HasWater } = data;
  const { beginService } = props;
  return (
    <View style={styles.container}>
        <Image style={styles.coffeemaker} source={require('../assets/coffee-maker.png')} />
        <View style={styles.readout}>
          <Text style={styles.readoutTitle}>BrewMaster CM1031</Text>
          <Text style={styles.readoutInfo}>Power Status: {HasPower[0] ? HasPower[1] : HasPower[2]}</Text>
          <Text style={styles.readoutInfo}>Brewing: {Brewing[0] ? Brewing[1] : Brewing[2]}</Text>
          <Text style={styles.readoutInfo}>Grind: {HasGrind[0] ? HasGrind[1] : HasGrind[2]}</Text>
          <Text style={styles.readoutInfo}>Filter: {HasFilter[0] ? HasFilter[1] : HasFilter[2]}</Text>
          <Text style={styles.readoutInfo}>Heat: {HasHeat[0] ? HasHeat[1] : HasHeat[2]}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={beginService}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 187,
    bottom: 0,
    left: 0,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  coffeemaker: {
    flex: 1,
  },
  readout: {
    flex: 1,
    backgroundColor: '#2F2F2F',
    alignItems: 'flex-start',
  },
  readoutTitle: {
    color: '#00A8E0',
    fontSize: 16,
  },
  readoutInfo: {
    color: 'white',
    fontSize: 14
  },
  button: {
    width: 67,
    height: 26,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Medium',
  }
});