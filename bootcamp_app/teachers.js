const { Pool } = require('pg');
const { idleTimeoutMillis } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


const cohort = process.argv[2];

const sqlQuery = `
  SELECT teachers.name AS teacher, cohorts.name AS cohort
  FROM assistance_requests
  JOIN teachers ON teachers.id = assistance_requests.teacher_id
  JOIN students ON students.id = assistance_requests.student_id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name = '${cohort}'
  GROUP BY teachers.name, cohorts.name
  ORDER BY teacher;
`

pool.query(sqlQuery)
  .then(res => {
    for (const row of res.rows) {
      console.log(`${row.cohort}: ${row.teacher}`);
    }
  })
  .catch(err => {
    console.log(err);
  });

