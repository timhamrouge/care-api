export interface Observation {
  id: string;
  timestamp: string;
  event_type: string;
  Caregiver: Caregiver | null;
  payload: {
    fluid?: string;
    consumed_volume_ml?: string;
    note?: string;
    meal?: string;
    pad_condition?: string;
    volume_ml?: string;
    mood?: string;
  }
};

export interface Caregiver {
  id: string;
  first_name: string;
  last_name: string;
};
