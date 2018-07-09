import Realm from 'realm';
import { schema as properties } from './schema';

class Chapters extends Realm.Object {}

Chapters.schema = {
  name: 'Chapters',
  primaryKey: '_id',
  properties,
};

export default Chapters;
