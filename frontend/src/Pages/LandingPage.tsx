import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  max-width: 600px;
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 36px;
  }
`;

const Heading = styled.h2`
  margin-top: 0;
`;

const SelectContainer = styled.select`
  border: 4px solid #ADE1EE;
  background-color: #F2E8FA;
`;

export const Option = styled.option`
  font-family: 'Atkinson+Hyperlegible', sans-serif;
`

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [careRecipients, setCareRecipients] = useState<null | {id: string, name: string}[]>(null);

  useEffect(() => {
    const fetchCareRecipients = async () => {
      try {
        console.log(`${process.env.REACT_APP_API_URL}/care-recipients`)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/care-recipients`);
        const json = await response.json();
        setCareRecipients(json.data);
      } catch (error) {
        // would be nice to handle this better
        console.error("Error fetching care recipients:", error);
      }
    };

    setLoading(false);
    fetchCareRecipients();
  }, []);

  const handleChooseCareRecipient = (event :any) => {
    const careRecipient = careRecipients!.find((careRecipient) => { 
      return careRecipient.id === event.target.value;
    });

    navigate(`observations/${careRecipient!.id}`);
  };


  return (
    <Container>
      <ContentBox>
        <Heading>Welcome to the birde care observations portal!</Heading>

        <p>Stay connected with your elderly relatives by accessing their care records in one convenient place. Gain insights into their well-being and stay informed about the care they receive by viewing the observations our carers are making in real time.</p>

        <p>To get started, simply select the family member you would like to view the observations for below. We understand the importance of family bonds, and we're here to provide you with a transparent and compassionate way to stay involved in their care journey.</p>

        <SelectContainer>
          {!loading && careRecipients && careRecipients.map(careRecipient => {
              return (
                <Option 
                  key={careRecipient.id}
                  onClick={handleChooseCareRecipient}
                  value={careRecipient.id}>
                    {careRecipient.name}
                </Option>
              )
            })}
        </SelectContainer>
      </ContentBox>
    </Container>
  )
}

export default LandingPage;