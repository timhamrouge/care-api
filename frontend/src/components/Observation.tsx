import styled from "styled-components";

import {format } from "date-fns";
import { sentenceCase } from 'change-case';

import ObservationIcon from '../components/EventIcon';

const Container = styled.li`
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

const Header = styled.div`
  // display: flex;
  margin-bottom: 4px;
`;

const ObservationEventBody = styled.div`
  display: flex;
  border: 4px solid #F2E8FA;
  border-radius: 10px;
  padding: 8px;
`;
// implement these properly
interface Props {
  observation: {
    timestamp: string;
  }
}

const setBody

const Observation = ({observation} : Props) => {
  return (
    <Container>
          {console.log(observation)}
          <Header>
          {format(new Date(observation.timestamp), 'do LLL y p')}
          </Header>
          <ObservationEventBody>
            <ObservationIcon observationType={observation.event_type}/>
            {sentenceCase(observation.event_type)} 
            {/* <p> */}
              made by {observation.Caregiver ? `${observation.Caregiver.first_name} ${observation.Caregiver.last_name}` : 'a carer'}  
            {/* </p> */}
          </ObservationEventBody>
    </Container>
  )
}

export default Observation;