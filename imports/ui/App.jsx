import React from 'react'
import { Form } from './Form.jsx'
import file from '../JSON/interest-inquery.json'
import nucc_icon from '../art/NUCC.js'
export const App = () => (
  <div
    id="main"
    style={{
      display: 'flex',
      width: '100vw',
    }}
  >
    <Form JSONquestions={file} />
  </div>
)
