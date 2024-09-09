import React from 'react'
const RollbackPopup = ({ rollback, setRollbackModal }) => {
  return (
    <div className='session-expire-1'>
      <div className="session-modal">
        <p className='session-para-error'>
          {rollback}
        </p>  
        <button onClick={() => setRollbackModal(false)} type="button" aria-label="Close" className="icon-close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  )
}

export default RollbackPopup