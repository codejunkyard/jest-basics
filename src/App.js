import React from "react";
import { Container } from "react-bootstrap";
import TabComponent from "./components/TabComponent";
import StopWatch from "./components/StopWatch";

export default class App extends React.PureComponent {
  render() {
    return (
      <Container style={{ marginTop: "75px" }}>
        <TabComponent>
          <StopWatch title="Stop Watch" />
          <p title="Test">Panel content - Test</p>
        </TabComponent>
      </Container>
    );
  }
}
