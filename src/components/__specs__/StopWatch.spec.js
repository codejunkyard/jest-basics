import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from "enzyme";

import StopWatch from "../StopWatch";

describe("StopWatch", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<StopWatch />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should shallow correctly", () => {
    expect(shallow(<StopWatch />)).toMatchSnapshot();
  });

  it("should mount correctly", () => {
    expect(mount(<StopWatch />)).toMatchSnapshot();
  });

  it("should render correctly", () => {
    expect(render(<StopWatch />)).toMatchSnapshot();
  });

  it("assdf", () => {
    const stopWatch = mount(<StopWatch />);

    expect(stopWatch.state().milliseconds).toEqual(0);
    stopWatch.find("Button.startstop").simulate("click");

    setTimeout(() => {
      expect(stopWatch.state().milliseconds).not.toEqual(0);
    }, 1000);

    stopWatch.unmount();
  });

  describe("start/stop button", () => {
    it("should start the clock when clicked if clock is not running", () => {
      const stopWatch = mount(<StopWatch />);

      expect(stopWatch.state().running).toBe(false);
      stopWatch.find("Button.startstop").simulate("click");
      expect(stopWatch.state().running).toBe(true);

      stopWatch.unmount();
    });

    it("should stop the clock when clicked if clock is running", () => {
      const stopWatch = mount(<StopWatch />);

      expect(stopWatch.state().running).toBe(false);
      stopWatch.find("Button.startstop").simulate("click");
      expect(stopWatch.state().running).toBe(true);
      stopWatch.find("Button.startstop").simulate("click");
      expect(stopWatch.state().running).toBe(false);

      stopWatch.unmount();
    });

    it("should show 'Start' when clock is not running", () => {
      const stopWatch = mount(<StopWatch />);
      expect(stopWatch.find("Button.startstop").text()).toBe("Start");

      stopWatch.unmount();
    });

    it("should show 'Stop' when clock is running", () => {
      const stopWatch = mount(<StopWatch />);
      stopWatch.find("Button.startstop").simulate("click");
      expect(stopWatch.find("Button.startstop").text()).toBe("Stop");

      stopWatch.unmount();
    });
  });

  describe("reset button", () => {
    it("should be disabled if clock is running", () => {
      const stopWatch = mount(<StopWatch />);

      stopWatch.find("Button.startstop").simulate("click");
      // clock should be running
      expect(stopWatch.state().running).toBe(true);
      // reset button should be disabled
      expect(stopWatch.find("Button.reset").prop("disabled")).toEqual(true);

      stopWatch.unmount();
    });

    it("should reset the clock when clicked", () => {
      const stopWatch = mount(<StopWatch />);

      stopWatch.find("Button.startstop").simulate("click");
      stopWatch.find("Button.startstop").simulate("click");
      expect(stopWatch.state().running).toBe(false);

      stopWatch.find("Button.reset").simulate("click");
      expect(stopWatch.state().milliseconds).toBe(0);
      expect(stopWatch.state().accumulator).toBe(0);
      expect(stopWatch.state().timestamp).toBe(null);

      stopWatch.unmount();
    });
  });
});
