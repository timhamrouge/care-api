import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faStethoscope, faGlassWater, faDroplet, faFaceSmile, faSyringe, faEye, faUtensils } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

interface Props {
  observationType: string;
}

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`

const ObservationIcon = ({observationType}: Props) => {
  const getIcon = (eventType: any) => {
    switch (eventType) {
      case 'fluid_intake_observation':
        return <StyledIcon icon={faGlassWater} />
      case 'physical_health_observation':
        return <StyledIcon icon={faStethoscope} />
      case 'mental_health_observation':
        return <StyledIcon icon={faBrain} />
      case 'food_intake_observation':
        return <StyledIcon icon={faUtensils} />
      case 'incontinence_pad_observation':
        return <StyledIcon icon={faDroplet} />
      case 'catheter_observation':
        return <StyledIcon icon={faSyringe} />
      case 'mood_observation':
        return <StyledIcon icon={faFaceSmile} />
      default:
        return <StyledIcon icon={faEye} />
    }
  }
  return (
    getIcon(observationType)
  )
}

export default ObservationIcon;