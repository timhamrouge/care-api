import { useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2`
  margin-top: 0;
`;

const LandingPage = () => {
  return (
    <Container>
      <div>
        <Heading>Welcome to the birde care records portal!</Heading>

        <p>Stay connected with your elderly relatives by accessing their care records in one convenient place. Gain insights into their well-being and stay informed about the care they receive.</p>

        <p>To get started, simply select the family member you would like to view the care records for below. We understand the importance of family bonds, and we're here to provide you with a transparent and compassionate way to stay involved in their care journey.</p>
      </div>
    </Container>
  )
}

export default LandingPage;