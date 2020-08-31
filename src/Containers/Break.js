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

export const Break = (props) => {
  return (
    <Div>
      <p id="break-label">Break Length</p>
      <BreakContainer>{props.children}</BreakContainer>
    </Div>
  );
};
