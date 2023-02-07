SELECT COUNT(teacher_id), teachers.name
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
WHERE teachers.name LIKE 'Waylon Boehm'
GROUP BY teachers.name;