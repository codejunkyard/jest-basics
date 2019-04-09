import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";

export default class TabComponent extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired,
    title: (props, propName, componentName) => {
      console.log(props);

      props &&
        props.children &&
        props.children.forEach(child => {
          if (!child.props.title) {
            throw new Error(
              `The prop \`${propName}\` is marked as required in \`${componentName}.children()\`, but its value is \`${
                child.props.title
              }\`.`
            );
          }
        });
    }
  };

  state = {
    activeTab: 0
  };

  selectTab = tabId => {
    this.setState({ activeTab: tabId });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;

    return (
      <Tabs activeKey={activeTab} onSelect={this.selectTab}>
        {children.map((child, index) => (
          <Tab key={index} eventKey={index} title={child.props.title}>
            {child}
          </Tab>
        ))}
      </Tabs>
    );
  }
}
