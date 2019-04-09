import React from "react";
import Button from "./Button";

const style = {
  container: {
    textAlign: "center"
  },
  clock: {
    padding: "20px",
    fontSize: "30px",
    fontFamily: "monospace"
  },
  button: {
    border: "solid 1px",
    borderRadius: "4px",
    margin: "5px",
    padding: "10px",
    outline: "none"
  }
};

export default class StopWatch extends React.PureComponent {
  state = {
    running: false,
    timestamp: null,
    milliseconds: 0,
    accumulator: 0
  };

  incrementer = null;

  toggleClock = () => {
    if (!this.state.running) {
      this.setState({
        timestamp: Date.now()
      });

      this.incrementer = setInterval(
        () =>
          this.setState({
            milliseconds:
              Date.now() - this.state.timestamp + this.state.accumulator
          }),
        10
      );
    } else {
      clearInterval(this.incrementer);
      this.setState({
        timestamp: null,
        accumulator: this.state.milliseconds
      });
    }

    this.setState(state => ({ running: !state.running }));
  };

  reset = () => {
    this.setState({ milliseconds: 0, timestamp: null, accumulator: 0 });
  };

  format = () => {
    const zeroPad = (number, targetLength = 2) =>
      number.toString().padStart(targetLength, "0");

    let { milliseconds } = this.state;
    let remaining = milliseconds / 1000;
    remaining %= 3600;

    let clock = [
      zeroPad(parseInt(remaining / 60, 10)),
      zeroPad(parseInt(remaining % 60, 10)),
      zeroPad(parseInt(milliseconds % 1000, 10), 3)
    ];

    return clock.join(":");
  };

  render() {
    let { time, running } = this.state;

    return (
      <div style={style.container}>
        <p style={style.clock}>{this.format(time)}</p>
        <Button
          onClick={this.toggleClock}
          style={{
            ...style.button,
            width: "100px",
            backgroundColor: running ? "#0f0" : "#f00"
          }}
          className="startstop"
        >
          {running ? "Stop" : "Start"}
        </Button>
        <Button
          disabled={running}
          onClick={this.reset}
          style={{
            ...style.button,
            borderColor: running ? "#CCC" : "#333"
          }}
          className="reset"
        >
          Reset
        </Button>
      </div>
    );
  }
}
