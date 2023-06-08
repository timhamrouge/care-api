import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Observation from '../components/Observation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimelineContainer = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  width: 60%;
  border: 4px solid #ADE1EE;
  border-radius: 10px;
  padding: 16px;
  max-width: 600px;
  list-style-type: none;
  @media (max-width: 800px) {
    width: 90%;
    margin-top: 36px;
  }
`;

const ObservationsPage = () => {
  const { care_recipient_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [careRecipient, setCareRecipient] = useState<{date: { id: string, name: string}} | null>(null);
  const [observationEvents, setObservationEvents] = useState<{date: { id: string, name: string}} | null>(null);
  // do something with pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pages, setPages] = useState<number | null>(null);
  const [observationEventsTotal, setObservationEventsTotal] = useState<number | null>(null);


  useEffect(() => {
    const fetchCareRecipient = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/care-recipients/${care_recipient_id}`);
        const json = await response.json();
        setCareRecipient(json.data);
      } catch (error) {
        console.error("Error fetching care recipient:", error);
      }
    };

    if (care_recipient_id) {
      const fetchObservationEvents = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/observations/${care_recipient_id}`);
          const json = await response.json();
          setPages(json.pages);
          setObservationEventsTotal(json.total);
          setObservationEvents(json.observations);
        } catch (error) {
          console.error("Error fetching observation events:", error);
        }
      };

      fetchObservationEvents();
    }

    setLoading(false);
    fetchCareRecipient();
  }, [care_recipient_id]);

  return (
  <Container>
    <TimelineContainer>
      {/* fix types and props */}
      {!loading && observationEvents && observationEvents.map((observationEvent: any) => {
        return (<Observation observation={observationEvent} key={observationEvent.id}/>)})}
    </TimelineContainer>

  </Container>
  )
}

export default ObservationsPage;