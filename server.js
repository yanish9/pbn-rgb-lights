// server.js
const express = require("express");
const path = require("path");

const { exec } = require('child_process');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/color", (req, res) => {
  const { id, color } = req.body || {};
  // Log exactly what arrived
  console.log(`[COLOR] Button ${id} -> ${color}`);

  setColor(req);
  // You could forward to hardware here, write to a DB, etc.
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


function setColor(req){
  
  const item = req.body;

  console.log("__________________")
  console.log(item) 
  console.log("__________________")
 

  // item.nid = nid;

  var jsonString = JSON.stringify(item);

  jsonString = "'" + jsonString + "'";
  console.log(jsonString);

  const scriptPath = path.join('/home/yan/sx126x_lorawan_hat_code/python/lora/examples/SX126x/', 'transmitter_set_color.py');

  // var l = item.color;
  // l = l.substring(l.indexOf("(")+1, l.lastIndexOf(")"))
  // Run the Python script with RGB values as arguments
  exec(`sudo python3 ${scriptPath} ${jsonString}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
      // return res.status(500).send('Error executing Python script');
    }

    // Send success response with script output
    console.log(`Script Output: ${stdout}`);
    // res.status(200).json({
    //   status: 'success',
    //   message: `Color RGB(${item.color}) saved successfully`,
    // });
  });

  res.status(200).send('Data saved successfully');
}