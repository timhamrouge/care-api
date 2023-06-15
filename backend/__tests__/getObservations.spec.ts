import app from '../src/application'
import request from 'supertest';

const careRecipientId = 'df50cac5-293c-490d-a06c-ee26796f850d';

describe('/observations/:care_recipient_id', () => {
  it('returns paginated observations for a care recipient', async () => {
    await request(app)
      .get(`/observations/${careRecipientId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.total).toBeGreaterThan(0);
        expect(res.body.observations.length).toBe(5);
        expect(res.body.pages).toBeGreaterThan(0);
      });
  })

  it('populates a Caregiver for the observation', async () => {
    await request(app)
      .get(`/observations/${careRecipientId}`)
      .expect(200)
      .expect((res) => {
        const careGiver = res.body.observations[0].Caregiver;
        expect(careGiver).toHaveProperty('id');
        expect(res.body.observations[0].caregiver_id).toBe(careGiver.id);
        expect(careGiver).toHaveProperty('first_name');
        expect(careGiver).toHaveProperty('last_name');
      });
  })

  it('returns an array of observations', async () => {
    await request(app)
      .get(`/observations/${careRecipientId}`)
      .expect(200)
      .expect((res) => {
        const firstObservation = res.body.observations[0];
        expect(firstObservation).toHaveProperty('id');
        expect(firstObservation.care_recipient_id).toBe(careRecipientId);
        expect(firstObservation).toHaveProperty('event_type');
        expect(firstObservation).toHaveProperty('payload');
        expect(firstObservation).toHaveProperty('timestamp');
      });
  })

  it('supports filtering on the event_type', async () => {
    await request(app)
      .get(`/observations/${careRecipientId}?filters=mood`)
      .expect(200)
      .expect((res) => {
        const firstObservation = res.body.observations[0];
        const secondObservation = res.body.observations[1];

        expect(firstObservation.event_type).toBe('mood_observation');
        expect(secondObservation.event_type).toBe('mood_observation');
      });
  })
});
