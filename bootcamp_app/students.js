const { Pool } = require('pg');
const { idleTimeoutMillis } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

  const cohort = process.argv[2];
  const limit = process.argv[3];
  const values = [cohort, limit];

pool.query(`
  SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
  FROM students
  JOIN cohorts on cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2
  `, values)
  .then(res => {
    for (user of res.rows) {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    }
  })
  .catch(err => console.log('query error', err.stack));
