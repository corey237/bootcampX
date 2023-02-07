SELECT AVG(total_duration) AS average_total_duration FROM (
  SELECT cohorts.name, SUM(assistance_requests.completed_at - assistance_requests.started_at) as total_duration
  FROM cohorts
  JOIN students ON students.cohort_id = cohorts.id
  JOIN assistance_requests ON assistance_requests.student_id = students.id
  GROUP BY cohorts.name
  ORDER BY total_duration ASC
) AS total_duration;