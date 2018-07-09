import Realm from 'realm';
import { schema as properties } from './schema';

class EnCourses extends Realm.Object {}

EnCourses.schema = {
  name: 'EnCourses',
  primaryKey: '_id',
  properties,
};

export default EnCourses;
