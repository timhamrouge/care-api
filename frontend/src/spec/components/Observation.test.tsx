import { render, screen } from '@testing-library/react';
import Observation from '../../components/Observation';

import { Observation as ObservationType } from '../../services/types';

let observation: ObservationType = {
  id: '1234',
  timestamp: "2019-05-12T15:20:15+01:00",
  event_type: 'fluid_intake_observation',
  Caregiver: {
    id: '1234',
    first_name:  'Penelope',
    last_name: 'Hill'
  },
  payload: {
    fluid: 'regular',
    consumed_volume_ml: '230'
  }
}

describe("Observation", () => {
  test('renders a timestamp', () => {
    render(<Observation observation={observation}/>);
    const timestamp = screen.getByText(/12th May 2019 3:20 PM/i);
    expect(timestamp).toBeInTheDocument();
  });

  test('renders an observation title and carer name', () => {
    render(<Observation observation={observation}/>);
    const title = screen.getByText(/Fluid intake observation made by Penelope Hill/i);
    expect(title).toBeInTheDocument();
  });

  test('renders an observation notes title', () => {
    render(<Observation observation={observation}/>);
    const notesTitle = screen.getByText(/Observation notes from carer:/i);
    expect(notesTitle).toBeInTheDocument();
  });

  test('renders an observation notes section', () => {
    render(<Observation observation={observation}/>);
    const notes = screen.getByText(/"regular"/i);
    expect(notes).toBeInTheDocument();
  });

  test('fluid_intake observations render a fluid consumed section', () => {
    render(<Observation observation={observation}/>);
    const fluidAmount = screen.getByText(/"230ml"/i);
    expect(fluidAmount).toBeInTheDocument();
  })

  test('renders fallback when there is no Caregiver', () => {
    observation.Caregiver = null;

    render(<Observation observation={observation}/>);
    const fallback = screen.getByText(/a carer/i);
    expect(fallback).toBeInTheDocument();
  })

  describe('food_intake_observation', () => {
    let observation: ObservationType = {
      id: '1234',
      timestamp: "2019-05-12T15:20:15+01:00",
      event_type: 'food_intake_observation',
      Caregiver: {
        id: '1234',
        first_name:  'Penelope',
        last_name: 'Hill'
      },
      payload: {
        note: 'bangers and mash',
        meal: 'evening meal'
      }
    }

    test('renders a type of meal section', () => {
      render(<Observation observation={observation}/>);
      const typeOfMealTitle = screen.getByText(/Type of meal:/i);
      expect(typeOfMealTitle).toBeInTheDocument();
    });

    test('renders what type of meal was consumed', () => {
      render(<Observation observation={observation}/>);
      const typeOfMeal = screen.getByText(/"evening meal"/i);
      expect(typeOfMeal).toBeInTheDocument();
    });
  });
});
