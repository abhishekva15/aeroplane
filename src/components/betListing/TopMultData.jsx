import React from 'react'
import LoadingComponent from '../loader/LoadingComponent'
import { formatDate, formateTime } from '../../utility/helper'
import { icon } from '../../utility/icon'
const TopMultData = ({ loading, topWinData,roundHandle }) => {
  return (
    <div className='top-win-card-container'>
      <div className=''>
        <div className="table-container">
          <div className="table-header">
            <div className="table-heading">
              <p className='heading-table'>Date</p>
            </div>
            <div className="table-heading" style={{ textAlign: "center" }}>
              <p className='heading-table'>X</p>
            </div>
            <div className="table-heading" style={{ display: "flex", justifyContent: "flex-end" }}>
              <p className='heading-table'>Fairness</p>
            </div>
          </div>
          {
            loading ? <LoadingComponent /> : (topWinData?.length > 0 ? topWinData?.map((el, i) => (
              <div key={i} className={`table-body-1 ${i === 0 ? "active-table-para" : ""}`} style={{ height: i === 0 ? "auto" : "34px", alignItems: "center" }}>
                {
                  i === 0 ? null : <div className={`table-para-2`}>
                    <p className='multi-date' style={{ paddingBottom: 0 }}>
                      {formatDate(el.created_at)} {formateTime(el.created_at)}
                    </p>
                  </div>
                }

                {
                  i === 0 ?<>
                  <div className=""></div>
                   <div className="multi-date-container" >
                    <p className='multi-date'>
                      {formatDate(el.created_at)} {formateTime(el.created_at)}
                    </p>
                    <div className="max-mult-para">
                      <p className='multi-para-max' style={{ fontSize: "24px", color: "#C017B4" }}>
                        {el?.max_mult}x
                      </p>
                    </div>

                  </div>
                   <div className="table-para" style={{ display: "flex", justifyContent: "flex-end",marginRight:"6px" }}>
                   <img src={icon.check} alt="" className='check' onClick={() => roundHandle(el)}  />
                 </div>
                  </>
                    : <>
                      <div className="max-mult-top" >
                        <div className="max-mult-para" style={{borderRadius:"11px"}}>
                          <p className='multi-para-max' style={{ fontSize: "12px", color: el?.max_mult > 10 ? "#C017B4" : (el?.max_mult >= 2 && el?.max_mult <= 10) ? " #913EF8" : "#34B4FF", }}>
                            {el?.max_mult}x
                          </p>
                        </div>
                      </div>
                      <div className="table-para" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <img src={icon.check} alt="" className='check' onClick={() => roundHandle(el)} />
                      </div>
                    </>
                }
              </div>
            )) : null)

          }
        </div>
      </div>

    </div>
  )
}

export default TopMultData