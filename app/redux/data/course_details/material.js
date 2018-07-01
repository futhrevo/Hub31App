export const materialSchema = {
  name: 'Materials',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    chapter_id: 'string',
    material_no: 'int',
    material_title: 'string',
    material_link: 'string',
    mandatory: 'bool',
    max_points: 'int',
    material_type: 'int',
  },
};
