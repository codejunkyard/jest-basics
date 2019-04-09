import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from "enzyme";

import TabComponent from "../TabComponent";

describe("TabComponent", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <TabComponent>
          <p title="Test">Test</p>
          <p title="Test">Test</p>
        </TabComponent>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // it("should shallow correctly", () => {
  //   expect(
  //     shallow(
  //       <TabComponent>
  //         <p title="Test">Test</p>
  //       </TabComponent>
  //     )
  //   ).toMatchSnapshot();
  // });

  // it("should mount correctly", () => {
  //   expect(
  //     mount(
  //       <TabComponent>
  //         <p title="Test">Test</p>
  //       </TabComponent>
  //     )
  //   ).toMatchSnapshot();
  // });

  // it("should render correctly", () => {
  //   expect(
  //     render(
  //       <TabComponent>
  //         <p title="Test">Test</p>
  //       </TabComponent>
  //     )
  //   ).toMatchSnapshot();
  // });
});
