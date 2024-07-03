const express = require("express");
const conn = require("./conn");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  conn.query("SELECT * FROM USER", (err, rows, fields) => {
    if (err) throw err;

    res.send(rows);
  });
});

app.post("/create", (req, res) => {
  const body = req.body;
  const { firstName, lastName, email, password, isActive } = body;
  if (body) {
    conn.query(
      `INSERT INTO USER (firstName, lastName, email, password, isActive) values ('${firstName}', '${lastName}', '${email}', '${password}', '${isActive}' )`,
      (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
      }
    );
  }
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { firstName, lastName, email, password, isActive } = body;
  if (id) {
    conn.query(
      `UPDATE user SET firstName = ?, lastName = ?, email = ?, password = ?, isActive = ? where id = ?`,[firstName, lastName, email, password, isActive, id],
      (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
      }
    );
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    conn.query(`DELETE FROM user where id = ${id}`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
  }
});

app.listen(port, () => {
  console.log(`running`);
});
