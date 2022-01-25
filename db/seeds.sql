INSERT INTO departments (department_name)
VALUES 
('human resources'),
('accounting'),
('manufacturing'),
('management'),
('software');

INSERT INTO roles (role_title, role_salary, department_id)
VALUES 
('manager', 80000, 4),
('super full stack developer', 400000, 2),
('accountant', 50000, 2),
('manufacturing', 30000, 3);

INSERT INTO employees (first_name, last_name, roles_id)
VALUES 
('Dominic', 'Mastrocola', 2),
('Todd', 'Barkley', 1),
('John', 'Smith', 3);