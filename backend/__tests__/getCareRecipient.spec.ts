import app from '../src/application'
import request from 'supertest';

const careRecipientId = 'df50cac5-293c-490d-a06c-ee26796f850d';

describe('/care-recipients/:care_recipient_id', () => {
  it('returns a care recipient', async () => {
    await request(app)
      .get(`/care-recipients/${careRecipientId}`)
      .expect(200)
      .expect((res) => {
        expect(typeof res.body.data).toBe("object");
      });
  })

  it('returns all attributes for the care recipient', async () => {
    await request(app)
      .get(`/care-recipients/${careRecipientId}`)
      .expect(200)
      .expect((res) => {
        const careRecipient = res.body.data;
        expect(careRecipient).toHaveProperty('id');
        expect(careRecipient).toHaveProperty('name');
      });
  })
});
