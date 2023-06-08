import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

import ObservationIcon from '../components/EventIcon';

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

const ObservationEventContainer = styled.li`
  padding-bottom: 1.5rem;
  border-left: 1px solid #67C8E0;
  position: relative;
  padding-left: 20px;
  margin-left: 10px;
  &:last-child{
    border: 0px;
    padding-bottom: 0;
  }
  &:before{
    content: '';
    width: 15px;
    height: 15px;
    background: white;
    border: 1px solid #ADE1EE;
    box-shadow: 1px 1px 0px #67C8E0;
    box-shadow: 1px 1px 0px #67C8E0;
    border-radius: 50%;
    position: absolute;
    left: -9px;
    top: 0px;
  }
  }
`;

const ObservationEventHeader = styled.div`
  display: flex;
`;

const ObservationEventBody = styled.div`
  display: flex;
  border: 4px solid #F2E8FA;
  border-radius: 10px;
  padding: 8px;
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
        return (<ObservationEventContainer key={observationEvent.id}>
          {console.log(observationEvent)}
          <ObservationEventHeader>
          {observationEvent.timestamp}

          </ObservationEventHeader>
          <ObservationEventBody>
            <ObservationIcon observationType={observationEvent.event_type}/>
            {observationEvent.event_type} by {observationEvent.Caregiver ? `${observationEvent.Caregiver.first_name} ${observationEvent.Caregiver.last_name}` : 'a carer'}
          
            
          </ObservationEventBody>


        </ObservationEventContainer>)
      })}
    </TimelineContainer>

  </Container>
  )
}

export default ObservationsPage;