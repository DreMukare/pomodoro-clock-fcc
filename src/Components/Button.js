import React from "react";
import styled from "styled-components";

const Clickable = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  margin: 5px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = (props) => {
  return (
    <Clickable id={props.id} onClick={props.onClick}>
      {props.children}
    </Clickable>
  );
};
