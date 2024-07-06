import React from 'react'
import { Toaster } from 'react-hot-toast'
import EmailSender from './components/EmailSender'

const App = () => {
  return (
    <div>
      <EmailSender />
      <Toaster />
    </div>
  )
}

export default App
