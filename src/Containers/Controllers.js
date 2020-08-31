import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 5px;
  display: flex;
`;

export const Controllers = (props) => {
  return <Container>{props.children}</Container>;
};
