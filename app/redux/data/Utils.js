import _ from 'underscore';

import realm from '../realm';

async function writeRealm(objects, name, keys, defaults) {
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
async function deleteRealm(objects, name) {
  if (objects.length > 0) {
    const allCourses = await realm
      .objects(name)
      .filtered(objects.map((id) => `_id == ${id}`).join(' OR '));
    await realm.delete(allCourses);
  }
}
async function deleteModel(name) {
  await realm.deleteModel(name);
}

async function deleteAll() {
  await realm.deleteAll();
}
export { writeRealm, deleteRealm, deleteModel, deleteAll };
