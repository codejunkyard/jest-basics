import React from "react";
import PropTypes from "prop-types";

export default class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  };

  onClick = event => {
    event.preventDefault();

    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    let { children, style = {}, disabled = false } = this.props;

    return (
      <button disabled={disabled} style={style} onClick={this.onClick}>
        {children}
      </button>
    );
  }
}
