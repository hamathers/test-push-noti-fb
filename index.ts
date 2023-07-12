import path from 'path'
import express from 'express'
import admin from 'firebase-admin'
import cors from 'cors'

const app = express()

// Enable CORS for all routes
app.use(cors())

// Resolve the path to the serviceAccountKey.json file
const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json')

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath)
})

// Define route to send notification
app.post('/send-notification', (req: any, res: any) => {
  const message = {
    notification: {
      title: 'New Notification',
      body: 'This is a test notification.'
    },
    token: req.query.token // Replace with your desired topic or device token
  }

  admin
    .messaging()
    .send(message)
    .then((response: any) => {
      console.log('Notification sent successfully:', response)
      res.sendStatus(200)
    })
    .catch((error: any) => {
      console.log('Error sending notification:', error)
      res.sendStatus(500)
    })
})

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001')
})
