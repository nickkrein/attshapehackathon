

let statusType = {
  HasPower:         [true, "On", "Off"],
  Brewing:          [false, "Yes", "No"],
  HasGrind:         [true, "Detected", "No"],
  HasFilter:        [false, "Yes", "No"],
  HasHeat:          [true, "Yes", "No"],
  HasWater:         [false, "Yes", "No"],
  Errors:           []
};


let errorType = {
  OK:               [0b00000000, "OK"],
  Unknown:          [0b10000000, "Unknown Problem."],
  BadFilter:        [0b00000001, "Please replace filter."],
  GrindOverflow:    [0b00000010, "Please reduce the amount of coffee grind."],
  PowerSupply:      [0b00000100, "Something is wrong with the power."],
  GoTPlaying:       [0b00001000, "Game of Thrones is on, I'm in do not disturb mode."],
  LidJammed:        [0b00010000, "Check the lid."],
  Heat:             [0b00100000, "Unable to heat."],
  Water:            [0b01000000, "Has water, but clogged or unable to draw from."]
};

const errorCode = 0;
const errorText = 1;

const statusFlag = 0;
const statusTextTrue = 1;
const statusTextFalse = 2;


class StatusManager {
  constructor() {
    this.status = statusType;
    this.error = errorType.OK[errorCode];
  }


  setOK() {
    this.error = errorType.OK[errorCode];
  }

  setErrors(value) {
    this.setOK();

    if (value.BadFilter === true) {
      this.error |= errorType.BadFilter[errorCode];
    }
    else if (value.BadFilter === false) {
      this.error &= ~(errorType.BadFilter[errorCode]);
    }

    if (value.GrindOverflow === true) {
      this.error |= errorType.GrindOverflow[errorCode];
    }
    else if (value.GrindOverflow === false) {
      this.error &= ~(errorType.GrindOverflow[errorCode]);
    }

    if (value.PowerSupply === true) {
      this.error |= errorType.PowerSupply[errorCode];
    }
    else if (value.PowerSupply === false) {
      this.error &= ~(errorType.PowerSupply[errorCode]);
    }

    if (value.GoTPlaying === true) {
      this.error |= errorType.GoTPlaying[errorCode];
    }
    else if (value.GoTPlaying === false) {
      this.error &= ~(errorType.GoTPlaying[errorCode]);
    }

    if (value.LidJammed === true) {
      this.error |= errorType.LidJammed[errorCode];
    }
    else if (value.LidJammed === false) {
      this.error &= ~(errorType.LidJammed[errorCode]);
    }

    if (value.Heat === true) {
      this.error |= errorType.Heat[errorCode];
    }
    else if (value.Heat === false) {
      this.error &= ~(errorType.Heat[errorCode]);
    }

    if (value.Water === true) {
      this.error |= errorType.Water[errorCode];
    }
    else if (value.Water === false) {
      this.error &= ~(errorType.Water[errorCode]);
    }

    if (this.error > (errorType.Unknown[errorCode] - 1)) {
      this.error = errorType.Unknown[errorCode];
    }
  }

  getErrors() {
    let errors = [];
    let result = this.error;

    if (result === 0) {
      errors.push( [errorType.OK[errorCode], errorType.OK[errorText]] );
      return errors;
    }

    if (result & errorType.Unknown[errorCode]) {
      errors.push( [errorType.Unknown[errorCode], errorType.Unknown[errorText]] );
      return errors;
    }

    if (result & errorType.BadFilter[errorCode]) {
      errors.push( [errorType.BadFilter[errorCode], errorType.BadFilter[errorText]] );
    }

    if (result & errorType.GrindOverflow[errorCode]) {
      errors.push( [errorType.GrindOverflow[errorCode], errorType.GrindOverflow[errorText]] );
    }

    if (result & errorType.PowerSupply[errorCode]) {
      errors.push( [errorType.PowerSupply[errorCode], errorType.PowerSupply[errorText]] );
    }

    if (result & errorType.GoTPlaying[errorCode]) {
      errors.push( [errorType.GoTPlaying[errorCode], errorType.GoTPlaying[errorText]] );
    }

    if (result & errorType.LidJammed[errorCode]) {
      errors.push( [errorType.LidJammed[errorCode], errorType.LidJammed[errorText]] );
    }

    if (result & errorType.Heat[errorCode]) {
      errors.push( [errorType.Heat[errorCode], errorType.Heat[errorText]] );
    }

    if (result & errorType.Water[errorCode]) {
      errors.push( [errorType.Water[errorCode], errorType.Water[errorText]] );
    }

    return errors;
  }

  setStatus(value) {
    let result = value || statusType;

    if (value.HasPower !== undefined) {
      let t = statusType.HasPower;
      result.HasPower = [value.HasPower, t[statusTextTrue], t[statusTextFalse]];
    }

    if (value.Brewing !== undefined) {
      let t = statusType.Brewing;
      result.Brewing = [value.Brewing, t[statusTextTrue], t[statusTextFalse]];
    }

    if (value.HasGrind !== undefined) {
      let t = statusType.HasGrind;
      result.HasGrind = [value.HasGrind, t[statusTextTrue], t[statusTextFalse]];
    }

    if (value.HasFilter !== undefined) {
      let t = statusType.HasFilter;
      result.HasFilter= [value.HasFilter, t[statusTextTrue], t[statusTextFalse]];
    }

    if (value.HasHeat !== undefined) {
      let t = statusType.HasHeat;
      result.HasHeat = [value.HasHeat, t[statusTextTrue], t[statusTextFalse]]
    }

    if (value.HasWater !== undefined) {
      let t = statusType.HasWater;
      result.HasWater = [value.HasWater, t[statusTextTrue], t[statusTextFalse]]
    }

    result.Errors = this.error;
    this.status = result;
  }

  getStatus() {
    let result = this.getErrors();
    this.status.Errors = result;

    return this.status;
  }
}



exports.ErrorType = errorType;
exports.StatusType = statusType;
exports.StatusManager = StatusManager;
