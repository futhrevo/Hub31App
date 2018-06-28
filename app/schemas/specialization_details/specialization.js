export const specializationSchema = {
  name: 'Specializations',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: 'string',
    description: 'string',
    specialization_discount: 'int',
    active: 'bool',
  },
};
