var express = require("express");
var mysql = require("mysql");
var app = express();
var connection = require('./database');
const session = require('express-session');
app.use(session({
  secret: 'shammaz',
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/home', (req, res) => {
  const isAdmin = req.session.isAdmin || null;
  const ispm = req.session.ispm || null;
  const istm = req.session.istm || null;
  const iscus = req.session.iscus || null;
  connection.query('SELECT fname FROM admin', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server sError');
      return;
    }
    res.render('C:/Users/Laiba/Desktop/DatabaseProject/home.ejs', { admins: results,isAdmin,ispm,istm,iscus });
  });
});

app.get('/', function(req, response) {
	// Render login template
	response.sendFile('C:/Users/Laiba/Desktop/DatabaseProject/login.html');
});



  //LOGIN USER SECTION
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    connection.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length > 0) {
        req.session.isAdmin=true;
        console.log('logged in as admin');
        res.redirect('/home');
      } 
      else {
        connection.query('SELECT * FROM customer WHERE email = ? AND password = ?', [email, password], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          if (results.length > 0) {
            req.session.iscus=true;
            console.log('logged in as customer');
            res.redirect('/home');
          } else {
            connection.query('SELECT * FROM team_members WHERE email = ? AND password = ?', [email, password], (err, results) => {
              if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).send('Internal Server Error');
                return;
              }
              if (results.length > 0) {
                req.session.istm=true;
                console.log('logged in as team member');
                res.redirect('/home');
              } else {
                connection.query('SELECT * FROM project_manager WHERE email = ? AND password = ?', [email, password], (err, results) => {
                  if (err) {
                  console.error('Error executing MySQL query:', err);
                  res.status(500).send('Internal Server Error');
                  return;
                    
                  }
                  if (results.length > 0) {
                    req.session.ispm=true;
                    console.log('logged in as project manager');
                    res.redirect('/home');
                  } else {
                    res.send('Invalid username or password.');
                  }
                });
              return;
              }
            });
          }
        });
      }
    });
  });
  
  //ADD USER SECTION
  app.post('/users/add', (req, res) => {
    if (req.session.isAdmin==true) {
      const { fname,lname,email,age, password,usertype } = req.body;
      if (usertype=="customer"){
        connection.query('INSERT INTO customer (fname, lname,email, password, age) VALUES (?, ?, ?, ?, ?)', [fname,lname,email, password,age], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('User added');
          res.redirect('/home');
        });
      }
      else if(usertype=="projectmanager"){
        connection.query('INSERT INTO project_manager (fname, lname,email, password, age) VALUES (?, ?, ?, ?, ?)', [fname,lname,email, password,age], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('User added');
          res.redirect('/home');
        });
      }
      else if(usertype=="teammember"){
        connection.query('INSERT INTO team_members (fname, lname,email, password, age) VALUES (?, ?, ?, ?, ?)', [fname,lname,email, password,age], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('User added');
          res.redirect('/home');
        });
      }
      else if(usertype=="admin"){
        connection.query('INSERT INTO admin (fname, lname,email, password, age) VALUES (?, ?, ?, ?, ?)', [fname,lname,email, password,age], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('User added');
          res.redirect('/home');
        });
      } 
    } 
    else {
      res.send('Unauthorized');
    }
  });

  //DELETE USER SECTION
  app.post('/users/delete/', (req, res) => {
    if (req.session.isAdmin==true) {
      const { userid,usertype } = req.body;
      if(usertype=="projectmanager") {
        connection.query('DELETE FROM project_manager WHERE P_M_id = ?', [userid], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('user deleted');
          res.redirect('/home');
        });
      }
      else if(usertype=="customer"){
        connection.query('DELETE FROM customer WHERE cust_id = ?', [userid], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('user deleted');
          res.redirect('/home');
        });
      }
      else if(usertype=="teammember"){
        connection.query('DELETE FROM team_members WHERE member_id = ?', [userid], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('user deleted');
          res.redirect('/home');
        });
      }
    } else {
      res.send('Unauthorized');
    }
  });
  //UPDATE USER SECTION
  app.post('/users/update/', (req, res) => {
    if (req.session.isAdmin==true) {
      const { userid,fname,lname,email,age, password,usertype } = req.body;
      
      if(usertype=="projectmanager") {
        connection.query('UPDATE project_manager SET fname = ?, lname = ?, email = ?, password = ? WHERE P_M_id = ?', [fname,lname,email,password,userid], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('user updated');
          res.redirect('/home');
        });
      }
      else if(usertype=="customer"){
        connection.query('UPDATE customer SET fname = ?, lname = ?, email = ?, password = ? WHERE cust_id = ?', [fname,lname,email,password,userid], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('user updated');
          res.redirect('/home');
        });
      }
      else if(usertype=="teammember"){
        connection.query('UPDATE project_manager SET fname = ?, lname = ?, email = ?, password = ? WHERE member_id = ?', [fname,lname,email,password,userid], (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('user updated');
          res.redirect('/home');
        });
      }
    } else {
      res.send('Unauthorized');
    }
  });
  
  //CUSTOMER SECTION
  app.get('/users/showissue/', (req, res) => {
    if (req.session.iscus==true) {
      connection.query('SELECT * FROM issue', (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Issue shown');
        res.send(results);
      });
    } else {
      res.send('No Issues');
    }
  });
  app.post('/users/addproject/', (req, res) => {
    if (req.session.iscus==true) {
      const {report,projid,sprintid,issueid,version, name,pmid } = req.body;
      connection.query('INSERT INTO project (proj_id,report, sprint_id, issue_id, version, name, P_M_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [projid,report,sprintid,issueid,version, name,pmid], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('project added');
        res.redirect('/home');
      });
    }
    else {
      res.send('Cannot add');
    }
  });
  //PROJECT MANAGER SECTION
  app.get('/users/showproject/', (req, res) => {
    if (req.session.ispm==true) {
      connection.query('SELECT * FROM project', (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Project shown');
        res.send(results);
      });
    } else {
      res.send('No Issues');
    }
  });

  app.post('/users/projectdelete/', (req, res) => {
    if (req.session.ispm==true) {
      const { projid } = req.body;
      connection.query('DELETE FROM project WHERE proj_id = ?', [projid], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Project deleted');
        res.redirect('/home');
      });
    }
  });

  app.post('/users/updateproject/', (req, res) => {
    if (req.session.ispm==true) {
      const { projid,version } = req.body;
      connection.query('UPDATE project SET version = ? WHERE proj_id = ?', [version,projid], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Project updated');
        res.redirect('/home');
      });
    }
  });

  //TEAM MEMBER SECTION
  app.get('/users/showissueteam/', (req, res) => {
    if (req.session.istm==true) {
      connection.query('SELECT * FROM issue', (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Issue shown to team member');
        res.send(results);
      });
    } else {
      res.send('No Issues');
    }
  });
  app.get('/users/showprojectteam/', (req, res) => {
    if (req.session.ispm==true) {
      connection.query('SELECT * FROM project', (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Project shown to team member');
        res.send(results);
      });
    } else {
      res.send('No Issues');
    }
  });

app.listen(3000, function(){
    console.log('App Listening on port 3000')
    connection.connect(function(err){
        if (err) throw err;
        console.log('Database connected!');
        })
});



