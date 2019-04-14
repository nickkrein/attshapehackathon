import React, { Component } from 'react';
import CameraOverlay from './CameraOverlay';

const steps = [
  "Lift open Coffee Maker lid. Fill carafe with cold tap water and pour water into water reservoir at back of unit.",
  "Place empty carafe on the warming plate.",
  "Place permanent filter in removable filter holder. Measure 1 scoop of regular grind coffee for each desired cup.",
  "Lower the filter holder down into the housing. Close the lid.",
  "Plug the power cord and Press the BREW NOW/AUTO OFF button once; the light around BREW NOW/AUTO OFF button will be white to signal that appliance is working.",
  "When the brew cycle is complete, 3 audible beeps will be heard and TIME SINCE BREW icon will show on LCD display."
]

export default class CameraOverlayWrapper extends Component {
  state = {
    detectionHeader: "Focus your camera at an object.",
    displayCheckMark: false,
    //IMPORTANT***** currentAndNextStep should be initialized to null
    //the below array set to currentAndNextStep should be set once the object is detected
    currentAndNextStep: [ {number: 1 , text: steps[0] }, {number: 2, text: steps[1]} ]
  }
  static navigationOptions = () => {
    return {
      header: null
    }
  };

  onPressBack = ([ currentStep ]) => {
    if (currentStep.number > 1) {
      const oldCurrentStep = currentStep;
      const newCurrentStepNumber = oldCurrentStep.number - 1;
      const newCurrentStep = {number: newCurrentStepNumber, text: steps[newCurrentStepNumber - 1] };
      this.setState({
        currentAndNextStep: [ newCurrentStep, oldCurrentStep ]
      })
    } else {
      //Go back to Home
      const { navigation } = this.props;
      navigation.goBack(null);
    }
  }

  onPressNext = () => {
    const { currentAndNextStep: [ , nextStep]} = this.state;
    const oldNextStep = nextStep;
    const newNextStepNumber = oldNextStep.number + 1;
    let newNextStep;
    if (newNextStepNumber > steps.length) {
      newNextStep = { number: null, text: null};
    } else {
      newNextStep = { number: newNextStepNumber, text: steps[newNextStepNumber - 1] };
    }
    this.setState({
      currentAndNextStep: [ oldNextStep, newNextStep ]
    })
  }

  render() {
    const { detectionHeader, displayCheckMark, currentAndNextStep } = this.state;
    const { navigation } = this.props;

    return (
        <CameraOverlay 
          detectionHeader={detectionHeader}
          displayCheckMark={displayCheckMark}
          onPressBack={() => currentAndNextStep ? this.onPressBack(currentAndNextStep) : navigation.goBack(null)}
          currentAndNextStep={currentAndNextStep}
          onPressNext={this.onPressNext}
        />
    );
  }
}