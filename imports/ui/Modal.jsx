import React from 'react'
import * as ReactDOM from 'react-dom'
//import cat from '../art/cat.gif'
export const Modal = () => {
  return (
    <div className="centralized hidden">
      <div id="popup-modal" tabIndex="100">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
            >
              <svg
                onClick={() => {
                  document
                    .querySelector('#popup-modal')
                    .parentNode.classList.add('hidden')
                }}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <p align="center">
                <img src="/cat.gif" width="100em" />
              </p>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                The inquiry has been saved. Thanks for your time 🎈
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
