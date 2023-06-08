import { useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  width: 60%;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  padding: 16px;
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 36px;
  }
`;

const Heading = styled.h2`
  margin-top: 0;
`;

const LandingPage = () => {
  return (
    <Container>
      <ContentBox>
        <Heading>Welcome to the birde care observations portal!</Heading>

        <p>Stay connected with your elderly relatives by accessing their care records in one convenient place. Gain insights into their well-being and stay informed about the care they receive by viewing the observations our carers are making in real time.</p>

        <p>To get started, simply select the family member you would like to view the observations for below. We understand the importance of family bonds, and we're here to provide you with a transparent and compassionate way to stay involved in their care journey.</p>
      </ContentBox>
    </Container>
  )
}

export default LandingPage;