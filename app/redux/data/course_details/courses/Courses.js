import Realm from 'realm';
import { schema as properties, name } from './schema';

class Courses extends Realm.Object {}

Courses.schema = {
  name,
  primaryKey: '_id',
  properties,
};

export default Courses;
