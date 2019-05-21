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
    console.log(` realm has ${realm.objects(name).length} objects`);
  }
}

function queryRealm(name, filter = null, sort = null) {
  const q = realm.objects(name);
  console.log(`realm query returned: ${q.length}`);

  if (filter !== null) {
    const f = q.filtered(filter);
    if (sort !== null) {
      return f.sorted(sort);
    }
    return f;
  }
  return q;
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
export {
  writeRealm, deleteRealm, deleteModel, deleteAll, queryRealm,
};
