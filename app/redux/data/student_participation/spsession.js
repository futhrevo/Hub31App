export const spsessionSchema = {
  name: 'SpSessions',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    specialization_id: 'string',
    start_date: 'date',
    end_date: 'date',
  },
};
