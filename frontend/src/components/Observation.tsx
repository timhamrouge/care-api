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

const Timestamp = styled.div`
  // display: flex;
  margin-bottom: 4px;
`;

const ObservationEventBody = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid #F2E8FA;
  border-radius: 10px;
  padding: 8px;
`;

const ObservationEventTitle = styled.div`
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 2px solid #F2E8FA;
`;

const ObservationEventNotes = styled.div`
  border: 4px solid #F2E8FA;
  border-radius: 4px;
  margin: 8px;
  padding: 8px;
  font-style: italic;
`;

const FluidObservationAmount = styled.div`
  border: 4px solid #F2E8FA;
  border-radius: 4px;
  margin: 8px;
  padding: 8px;
  font-style: italic;
`

// implement these properly
interface Props {
  observation: {
    timestamp: string;
  }
}
// todo finish doing this mapping when more info is known
const payloadKey = (eventType) => {
  switch (eventType) {
    case 'fluid_intake_observation':
      // also consumed vol though
      return 'fluid'
    // case 'physical_health_observation':
    //   return <StyledIcon icon={faStethoscope} />
    case 'mental_health_observation':
      return 'note'
    // case 'food_intake_observation':
    //   return <StyledIcon icon={faUtensils} />
    case 'incontinence_pad_observation':
      return 'pad_condition'
    // case 'catheter_observation':
    //   return ''
    case 'mood_observation':
      return 'mood'
    default:
      return 'note'
  }
}

const Observation = ({ observation }: Props) => {
  const caregiverName = observation.Caregiver
    ? `${observation.Caregiver.first_name} ${observation.Caregiver.last_name}`
    : "a carer";

  return (
    <Container>
      <Timestamp>{format(new Date(observation.timestamp), "do LLL y p")}</Timestamp>
      <ObservationEventBody>
        <ObservationEventTitle>
          <ObservationIcon observationType={observation.event_type} />
          {sentenceCase(observation.event_type)} made by {caregiverName}
        </ObservationEventTitle>
        Observation notes from carer:
        <ObservationEventNotes>
          "{observation.payload[payloadKey(observation.event_type)]}"
        </ObservationEventNotes>
        {observation.event_type === "fluid_intake_observation" && (
          <>
            Amount of fluid consumed:
            <FluidObservationAmount>
              "{observation.payload.consumed_volume_ml}ml"
            </FluidObservationAmount>
          </>
        )}
      </ObservationEventBody>
    </Container>
  );
};

export default Observation;