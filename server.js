//Declare dependencies / variables

const express = require ('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require ('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

//connect to the database ***

const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
});

//checking the connections
db.connect((err) => {
    //If con
    if(err) return console.log("error connecting to the mysql db");
    
    console.log("Connection to mysql successful as id: ", db.threadID)

   //Question 1

    app.set('view engine', 'ejs');
    app.set('views', _dirname + '/views');

    //Get data
    app.get('/data', (req, res) => {
        //retrieve data from database
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                //Render the data in a template
                res.render('data', {results: results});
            }

        });
    });


      //Question 2

      app.set('view engine', 'ejs');
      app.set('views', _dirname + '/views');
  
      //Get data
      app.get('/data2', (req, res) => {
          //retrieve data from database
          db.query('SELECT * FROM providers', (err, results) => {
              if (err) {
                  console.error(err);
                  res.status(500).send('Error retrieving data');
              } else {
                  //Render the data in a template
                  res.render('data', {results: results});
              }
  
          });
      });


        //Question 3

    app.set('view engine', 'ejs');
    app.set('views', _dirname + '/views');

    //Get data
    app.get('/data', (req, res) => {
        //retrieve data from database
        db.query('SELECT first_name FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                //Render the data in a template
                res.render('data', {results: results});
            }

        });
    });


        //Question 4

        app.set('view engine', 'ejs');
        app.set('views', _dirname + '/views');
    
        //Get data
        app.get('/data2', (req, res) => {
            //retrieve data from database
            db.query('SELECT proviver_specialty FROM providers', (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error retrieving data');
                } else {
                    //Render the data in a template
                    res.render('data', {results: results});
                }
    
            });
        });

    app.listen(process.env.PORT, () => {
        console.log(`server listening on port ${process.env.PORT}`);

        //send message to the browser
        console.log('Sending message to browser ...');
        app.get('/', (req,res) => {
            res.send('Server started successfully! Wedding can go ON!!!')
        })
    });
});