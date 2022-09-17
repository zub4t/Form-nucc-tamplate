import React, { useState } from 'react'
import { Modal } from './Modal.jsx'
import { Meteor } from 'meteor/meteor'
import { mount } from 'react-mounter'
function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
}

export const Form = ({ JSONquestions = '{}' }) => {
  //--------------------------------
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    let data = Array.from(formData.entries()).map((arr) => {
      let [key, value] = arr
      if (Object.is(document.querySelector(`[name=${key}]`).type, 'radio')) {
      }

      return { key, value }
    })
    Meteor.call('responses.insert', data)
    console.log(data)
    document.querySelector('#popup-modal').parentNode.classList.remove('hidden')
    // mount(Modal)
  }
  const questionType_2_HTML = (name, type, r) => {
    switch (type) {
      case 'open':
        return `  
     <div class="relative z-0 mb-6 w-full group">
    <input type="text" name="floating_open_${name}" id="floating_open_${name}" class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required />

</div>
               
                `

      case 'yes-no':
        return `
        <div class="flex items-center mb-4">
    <input value='yes' id="yes_${name}" type="radio" value="" name='${name}' class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="yes_${name}" class="ml-2 text-sm font-medium ">Yes</label>
</div>


<div class="flex items-center mb-4">
    <input value='no' id="no_${name}" type="radio" value="" name='${name}' class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="no_${name}" class="ml-2 text-sm font-medium ">No</label>
</div>
           
                `
      case 'enum':
        //todo handle multiple enums in a form

        let str = ''
        r['question-alternatives'].forEach((op) => {
          str += `
            <div key='key_${op}' class="flex items-center mb-4">
                <input value='${op}' id='enum_${op}' type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name='${name}'>
                <label for='enum_${op}' class="ml-2 text-sm font-medium ">${op} </label>
            </div>

                
                `
        })
        return str
      case 'date-time':
        return `

      
                <div>
                    <input  type="datetime-local" value='${formatDate(
                      new Date(),
                    )}T00:00'
class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       min="2022-09-07T09:00" max="2022-12-14T20:00"
                    id='date-time' name='${name}'>
                </div>
                `
    }
  }

  return (
    <>
      <Modal />

      <form
        onSubmit={handleSubmit}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        {JSONquestions.questions.map(
          ({ 'question-title': title, name, 'question-type': type, ...r }) => {
            return (
              <div key={name}>
                <h5 className="text-xl font-bold dark:text-white">{title}</h5>

                <div
                  dangerouslySetInnerHTML={{
                    __html: `${questionType_2_HTML(name, type, r)}`,
                  }}
                />
              </div>
            )
          },
        )}
        <input
          type="submit"
          value="Submit"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        />
      </form>
    </>
  )
}
