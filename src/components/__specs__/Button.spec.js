import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";

import Button from "../Button";

describe("Buttton", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Button onClick={null}>My button</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render children", () => {
    const wrapper = shallow(<Button>Hello World!</Button>);

    expect(wrapper.text()).toBe("Hello World!");
  });

  it("should render nested children", () => {
    const wrapper = shallow(
      <Button>
        <a href="#">Hello World!</a>
      </Button>
    );

    expect(wrapper.html()).toEqual(
      '<button><a href="#">Hello World!</a></button>'
    );
  });

  describe("onClick", () => {
    const event = { preventDefault: () => {} };

    it("calls props.onClick if it exists", () => {
      const onClick = jest.fn();
      const wrapper = mount(<Button onClick={onClick}>Testing Click</Button>);

      wrapper
        .find("button")
        .hostNodes()
        .simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("calls props.onClick if disabled is false", () => {
      const onClick = jest.fn();
      const wrapper = mount(
        <Button disabled={false} onClick={onClick}>
          Testing Click
        </Button>
      );

      wrapper
        .find("button")
        .hostNodes()
        .simulate("click");
      expect(onClick).toHaveBeenCalled();
    });

    it("should call event.preventDefault if disabled is true", () => {
      const wrapper = shallow(<Button disabled onClick={() => {}} />);
      wrapper.find("button").simulate("click", { preventDefault() {} });
    });

    it("does not call props.onClick if disabled is true", () => {
      const onClick = jest.fn();
      const wrapper = mount(
        <Button disabled onClick={onClick}>
          Testing Click
        </Button>
      );

      wrapper
        .find("button")
        .hostNodes()
        .simulate("click");
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
