import { useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  width: 60%;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  padding: 16px;
  max-width: 600px;
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 36px;
  }
`;

const ObservationsPage = () => {
  return (
  <Container>
    <TimelineContainer>

    </TimelineContainer>

  </Container>
  )
}

export default ObservationsPage;