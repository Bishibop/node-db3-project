const db = require('../data/db-config.js');

async function find() {
  return db('schemes');
}

async function findById(id) {
  return db('schemes').where({id: id}).first();
}

async function findSteps(id) {
  const steps = await db('steps')
    .join('schemes', 'steps.scheme_id', 'schemes.id')
    .where({scheme_id: id})
    .orderBy('step_number')
    .select('steps.id',
            'schemes.scheme_name',
            'steps.step_number',
            'steps.instructions');
  return steps;
}

async function add(scheme) {
  const ids = await db('schemes').insert(scheme);
  return findById(ids[0]);
}

async function update(changes, id) {
  const updates = await db('schemes').where({id: id}).update(changes)
  return findById(id);
}

async function remove(id) {
  const deletedScheme = await findById(id);
  const numAffectedRows = await db('schemes').where({id: id}).del();
  if (numAffectedRows) {
    return deletedScheme;
  } else {
    return null;
  }
}

// STRETCH
async function findStepById(id) {
  return db('steps').where({id: id}).first();
}

async function addStep(step, scheme_id) {
  const ids = await db('steps').insert({...step, scheme_id: scheme_id});
  return findStepById(ids[0]);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
}
