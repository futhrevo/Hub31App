import _ from 'underscore';

import realm from '../../../realm';
import Courses from './Courses';
import { keys, defaults, name } from './schema';

async function writeCourses(objects) {
  if (objects.length > 0) {
    await realm.write(() => {
      for (let i = 0; i < objects.length; i += 1) {
        const obj = _.defaults(objects[i], defaults);
        const payload = _.pick(obj, keys);
        realm.create(name, payload, true);
      }
    });
  }
}
async function deleteCourses(objects) {
  if (objects.length > 0) {
    const allCourses = await realm
      .objects('name')
      .filtered(objects.map((id) => `_id == ${id}`).join(' OR '));
    await realm.delete(allCourses);
  }
}
async function deleteAllCourses() {
  await realm.deleteModel(name);
}

export { writeCourses, deleteCourses, deleteAllCourses };
