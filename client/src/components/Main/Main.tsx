import React from "react";
import FixedMenu from "../Menu/FixedMenu";
import { Container } from "semantic-ui-react";

export interface MainProps {
  children: React.ReactNode;
}
const Main: React.FC<MainProps> = (props) => {
  const { children } = props;
  return (
    <>
      <FixedMenu />
      <Container className="main-container">{children}</Container>
    </>
  );
};

export default Main;
