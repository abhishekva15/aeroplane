import React from 'react'

const ErrorModal = ({setErrorModal,error}) => {
  return (
    <div className='session-expire-1'>
        <div className="session-modal">
            <p className='session-para' style={{ fontSize: "20px" }}>
                {error}
            </p>
            <button onClick={() => setErrorModal(false)} type="button" aria-label="Close" className="icon-close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    </div>

  )
}

export default ErrorModal