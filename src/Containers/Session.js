import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreakContainer = styled.div`
  display: flex;
`;

export const Session = (props) => {
  return (
    <Div>
      <p id="session-label">Session Length</p>
      <BreakContainer>{props.children}</BreakContainer>
    </Div>
  );
};
