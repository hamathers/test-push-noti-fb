const express = require("express");
const path = require("path");
const admin = require("firebase-admin");

const app = express();
const PORT = 4000;

const serviceAccountPath = path.resolve(__dirname, "serviceAccountKey.json");

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/about", (req, res) => {
  res.send("This is my about route..... ");
});

app.post("/send-notification", (req, res) => {
  const message = {
    notification: {
      title: "New Notification",
      body: "This is a test notification.",
    },
    token: req.query.token, // Replace with your desired topic or device token
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Notification sent successfully:", response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error sending notification:", error);
      res.sendStatus(500);
    });
});

// Export the Express API
module.exports = app;
