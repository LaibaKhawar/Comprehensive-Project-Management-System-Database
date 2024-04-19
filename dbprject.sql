
-- create database project_managment_2;
show databases;
use project_managment_2;

-- creating the necassary tables

CREATE TABLE admin (
    admin_id INT PRIMARY KEY auto_increment,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE customer (
    cust_id INT PRIMARY KEY auto_increment,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    age INT
);

CREATE TABLE project_manager (
    P_M_id INT PRIMARY KEY auto_increment,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    age INT
);

CREATE TABLE issue (
    issue_id INT PRIMARY KEY auto_increment,
    comments TEXT,
    file_upload longblob,
    level_priority VARCHAR(50),
    type VARCHAR(50),
    status VARCHAR(50),
    name VARCHAR(100),
    completion_date DATE
);

CREATE TABLE sprint (
    sprint_id INT PRIMARY KEY auto_increment,
    P_M_id INT,
    issue_id INT,
    FOREIGN KEY (P_M_id) REFERENCES project_manager(P_M_id),
    FOREIGN KEY (issue_id) REFERENCES issue(issue_id)
);

CREATE TABLE project (
    proj_id INT PRIMARY KEY auto_increment,
    report LONGBLOB,
    sprint_id INT,
    issue_id INT,
    version VARCHAR(50),
    name VARCHAR(100),
    P_M_id INT,
    FOREIGN KEY (sprint_id) REFERENCES sprint(sprint_id),
    FOREIGN KEY (issue_id) REFERENCES issue(issue_id),
    FOREIGN KEY (P_M_id) REFERENCES project_manager(P_M_id)
);

CREATE TABLE team (
    team_id INT PRIMARY KEY auto_increment,
    team_name VARCHAR(100),
    P_M_id INT,
    proj_id INT,
    FOREIGN KEY (P_M_id) REFERENCES project_manager(P_M_id),
    FOREIGN KEY (proj_id) REFERENCES project(proj_id)
);

CREATE TABLE team_members (
    member_id INT PRIMARY KEY auto_increment,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100),
    age INT,
    password VARCHAR(100),
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES team(team_id)
);

CREATE TABLE issue_handler (
    issue_handler_id INT PRIMARY KEY auto_increment,
    issue_id INT,
    member_id INT,
    FOREIGN KEY (issue_id) REFERENCES issue(issue_id),
    FOREIGN KEY (member_id) REFERENCES team_members(member_id)
);


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';

select fname from customer;

SELECT * FROM admin ;

INSERT INTO customer (fname, lname, email, password, age) VALUES ('shammaz', 'khan', 'khan@example.com', '1234', 25);

select * from customer;

INSERT INTO team (team_id, team_name, P_M_id, proj_id)
VALUES
  (1, 'Team A', 1, 1),
  (2, 'Team B', 2, 2),
  (3, 'Team C', 1, 3);

INSERT INTO team_members (member_id, fname, lname, email, age, password, team_id)
VALUES
  (4, 'Mike', 'Johnson', 'mike@exp.com', 28, 'password789', 2);


INSERT INTO project (proj_id, report, sprint_id, issue_id, version, name, P_M_id)
VALUES
  (1, 'Lorem ipsum dolor sit amet', 1, 1, '1.0', 'Project A', 1),
  (2, 'Lorem ipsum dolor sit amet', 2, 2, '2.0', 'Project B', 2),
  (3, 'Lorem ipsum dolor sit amet', 3, 3, '1.5', 'Project C', 1);

INSERT INTO project_manager (fname, lname, P_M_id, email, password, age)
VALUES
  ('John', 'Smith', 1, 'johnsmith@example.com', 'password123', 35),
  ('Jane', 'Doe', 2, 'janedoe@example.com', 'password456', 40),
  ('Mike', 'Johnson', 3, 'mikejohnson@example.com', 'password789', 38);

INSERT INTO issue (issue_id, comments, file_upload, level_priority, type, status, name, completion_date)
VALUES
  (1, 'Lorem ipsum dolor sit amet', NULL, 'High', 'Bug', 'Open', 'Issue A', '2023-05-31'),
  (2, 'Lorem ipsum dolor sit amet', NULL, 'Medium', 'Feature', 'In Progress', 'Issue B', '2023-06-15'),
  (3, 'Lorem ipsum dolor sit amet', NULL, 'Low', 'Enhancement', 'Closed', 'Issue C', '2023-05-20');

INSERT INTO sprint (sprint_id, P_M_id, issue_id)
VALUES
  (1, 1, 1),
  (2, 2, 2),
  (3, 1, 3);

INSERT INTO project ( report, sprint_id, issue_id, version, name, P_M_id)
VALUES ( 'Lorem ipsum dolor sit amet', 1, 1, '1.0', 'Project A', 1);

