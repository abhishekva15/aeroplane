import React, { useEffect, useState } from 'react';
import { formatBalance } from '../../../utility/helper';


const CashoutModal = ({ oneCashout, openModal, setOpenModal }) => {
  const [timers, setTimers] = useState([]);
  useEffect(() => {
    timers.forEach(timer => clearTimeout(timer));
    setTimers([]);

    const newTimers = [];
   openModal?.length>0 && openModal?.forEach((modal, index) => {
      if (modal.show) {
        const timer = setTimeout(() => {
          setOpenModal(prev => prev.map(m => (m.bet_id === modal.bet_id ? { ...m, show: false } : m)));
        }, 3000);
        newTimers.push(timer);
      }
    });
    setTimers(newTimers);

    return () => {
      newTimers.forEach(timer => clearTimeout(timer));
    };
  }, [openModal,setOpenModal]);

  return (
    <>
      {oneCashout?.length > 0 && oneCashout?.map((el,i) => (
        openModal[i]?.show && (
          <div className={`win-modal ${openModal[i]?.show ? 'slideIn' : 'slideOut'}`} key={i} style={{ top: `${10 + i * 10}%` }}>
            <div className="win-modal-body">
              <div className="won-text">
                <span className='you-won-text'>You have cashed out!</span>
                <p>{el.maxAutoCashout === "null" ? el.max_mult : el.maxAutoCashout}x</p>
              </div>
              <div className="bg-win">
                <button className='btn-win'>
                  <p className='win-amt'>
                    Win
                    <span>{formatBalance(el.final_amount) || "0"}</span>
                  </p>
                </button>
              </div>
              <button onClick={() => setOpenModal(prev => prev.map((m) => (openModal[i].bet_id === m.bet_id ? {...m,show:false} : m)))} type="button" aria-label="Close" className="icon-close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default CashoutModal;
