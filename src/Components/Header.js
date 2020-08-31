import React from "react";
import styled from "styled-components";

const Head = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-size: 3em;
  position: absolute;
  width: 90%;
  top: 20px;
  left: 5%;
`;

export const Header = (props) => {
  return <Head>{props.children}</Head>;
};
