import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const displaySteps = (currentAndNextStep) => {
  const [ currentStep, nextStep ] = currentAndNextStep;

  const nextStepText =  () => {
    if (nextStep.text) { 
      const words = nextStep.text.split(" ");
      let returnText = "";
      let charCount = 0;
      words.forEach(word => {
        charCount += word.length + 1; 
        if (charCount < 25) {
          returnText = returnText + word + " ";
        }
      })
      return returnText.slice(0, -1) + "...";
    }
    return null;
  }

  return (
    <View style={{marginTop: 30, marginLeft: 20}}>
      <View style={styles.stepWrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.stepLabel}>{`Step ${currentStep.number}`}</Text>
        </View>
        <Text style={styles.currentStep}>{currentStep.text}</Text>
      </View>
      <View style={styles.stepWrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.stepLabel}>{nextStep.number ? "Next" : "Done!"}</Text>
        </View>
        <Text style={styles.nextStep}>{nextStepText()}</Text>
      </View>
    </View>
  )
}

displayNextOrDoneButton = (currentAndNextStep, onPressNext) => {
  const [ currentStep, nextStep ] = currentAndNextStep;
  let buttonText;
  let onPress; 
  if (currentStep && nextStep.number) {
    buttonText = "Next";
    onPress = onPressNext;
  } else if (currentStep) {
    buttonText = "Done"
    //Will want to set an onPress for Done when it is decided what should happen
    //(and therefore pass in  onPressDone as a param)
  } else {
    return null;
  }
  return (
    <TouchableOpacity style={styles.nextAndDoneButton} onPress={onPress}>
      <Text style={styles.nextAndDoneButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default ({ currentAndNextStep, onPressBack, detectionHeader, displayCheckMark, onPressNext }) => (
  <View style={styles.container}>
    <View style={{width: '100%', backgroundColor: currentAndNextStep ? 'rgba(52, 52, 52, 0.3)' : null}}>
      <View style={styles.topIconsWrapper}>
        <TouchableOpacity onPress={onPressBack}>
          <Image source={require('../assets/ar-camera/left-arrow.png')} />
        </TouchableOpacity>
        <Image source={require('../assets/ar-camera/camera.png')} />
        <Image source={require('../assets/ar-camera/question-white.png')} />
      </View>
      <View>
      {currentAndNextStep ? null : <Text style={styles.detectionHeader}>{detectionHeader}</Text>}
      {currentAndNextStep ? displaySteps(currentAndNextStep) : null}
      </View>
    </View>
    {displayCheckMark ?  <Image style={styles.checkmark} source={require('../assets/ar-camera/check.png')} /> : null }
    {currentAndNextStep ? displayNextOrDoneButton(currentAndNextStep, onPressNext) : null}
  </View>
);
const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topIconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 35,
  },
  captureButton: {
    marginBottom: 30
  },
  detectionHeader: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 21,
    marginTop: 40,
    textAlign: 'center'
  },
  checkmark: {
    marginBottom: 200
  },
  currentStep: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 18,
    color: 'white',
    width: 233
  },
  nextStep: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 18,
    color: '#dbdbdb',
    width: 233,
  },
  stepWrapper: {
    flexDirection: 'row',
    marginBottom: 20
  },
  stepLabel: {
    color: '#b7b7b7',
    fontSize: 16
  },
  labelWrapper: {
    height: 30,
    width: 77,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  nextAndDoneButton: {
    width: 67,
    height: 67,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  nextAndDoneButtonText: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Medium',
  }
});