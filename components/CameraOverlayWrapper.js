import React, { Component } from 'react';
import CameraOverlay from './CameraOverlay';

const steps = [
  "Open the lid by pressing the top tab toward the back of the coffee maker and lifting.",
  "Remove filter if one is in the basket.",
  "Lift the handle located near the front face of the coffee maker to allow removal of the basket.",
  "Check the bottom of the basket for blockage around the coil."
]

export default class CameraOverlayWrapper extends Component {
  state = {
    detectionHeader: "Focus your camera on the device you are troubleshooting.",
    displayCheckMark: false,
    //IMPORTANT***** currentAndNextStep should be initialized to null
    //the below array set to currentAndNextStep should be set once the object is detected
    currentAndNextStep: null,
    detected: this.props.detected,
    isLoading: false,
    showHealthCheck: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.detected !== this.props.detected) {
      this.setState({
        displayCheckMark: true,
        detectionHeader: 'Success! Performing health check...',
        isLoading: true,
      })
      //simulated fetch
      if(this.state.currentAndNextStep === null) {
        setTimeout(() => {
          this.setState({
            isLoading: false,
            displayCheckMark: false,
            currentAndNextStep: [ {number: 1 , text: steps[0] }, {number: 2, text: steps[1]} ]
          })
        }, 2000)
      }
    }
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

  // MOVE ON FROM HEALTH CHECK
  // beginService = () => {
  //   this.setState({
  //     currentAndNextStep: [ {number: 1 , text: steps[0] }, {number: 2, text: steps[1]} ]
  //   }) 
  // }

  render() {
    const { detectionHeader, displayCheckMark, currentAndNextStep, isLoading, showHealthCheck } = this.state;
    const { navigation } = this.props;

    return (
        <CameraOverlay 
          detectionHeader={detectionHeader}
          displayCheckMark={displayCheckMark}
          onPressBack={() => currentAndNextStep ? this.onPressBack(currentAndNextStep) : navigation.goBack(null)}
          currentAndNextStep={currentAndNextStep}
          onPressNext={this.onPressNext}
          isLoading={isLoading}
          showHealthCheck={showHealthCheck}
        />
    );
  }
}