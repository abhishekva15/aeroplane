import React from 'react'
import { icon } from '../../utility/icon'
import { formatBalance } from '../../utility/helper'

const AllData = ({combinedData}) => {
  return (
    <div className="table-height">
    <div className="table-container" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <div className="table-header">
            <div className="table-heading" style={{ paddingLeft: ".2rem" }}>
                <p className='heading-table'>User</p>
            </div>
            <div className="table-para-all bet-x">
                <p className='heading-table margin-para' style={{ textAlign: "center" }}>Bet</p>
                <p className='heading-table' style={{ textAlign: "right" }}>X</p>
            </div>
            <div className="table-heading" style={{ display: "flex", justifyContent: "flex-end", paddingRight: ".5rem" }}>
                <p className='heading-table'>Cash out</p>
            </div>
        </div>
        {
            combinedData?.length > 0 ? combinedData?.map((el, i) => (
                <div className="table-body" key={i} style={{
                    background: el?.plane_status === "cashout" ? "#123405" : "#101112",
                    border: el?.plane_status === "cashout" ? "1px solid green" : "1px solid #101112",
                    overflowX: "auto", whiteSpace: "nowrap"
                }}>
                    <div className="user-img-all" style={{ minWidth: "62px", maxWidth: "62px" }}>
                        {el?.avatar ? <img className='user-img' src={el?.avatar} alt="" /> : <img className='user-img' src={icon.profiledefaultImg} alt="" />
                        }
                        <p className='user-name'>{(el?.name?.slice(0, 1))?.toLowerCase() + "***" + el?.name?.slice(-1)}</p>

                    </div>
                    <div className="bet-head-container">
                        <div className="bet-amount-body" style={{ minWidth: "60%", maxWidth: "60%" }}>
                            <p className='cashout-para' style={{ fontSize: "14px", fontWeight: "normal", color: el?.status === "cashout" ? "white" : "#bbbfc5", paddingRight: 0 }}>{formatBalance(el?.bet_id?.split(":")[2])}</p>
                        </div>

                        {
                            el?.maxAutoCashout === "null" ? <>
                                {
                                    el?.max_mult ? <div className="bet-mult" style={{
                                        color: el?.max_mult > 10 ? "#C017B4" : (el?.max_mult >= 2 && el?.max_mult <= 10) ? " #913EF8" : "#34B4FF",
                                        background: "#00000080"
                                    }}>
                                        {el?.max_mult}x
                                    </div> : null
                                }
                            </> : <>
                                {
                                    el?.max_mult ? <div className="bet-mult" style={{
                                        color: el?.max_mult > 10 ? "#C017B4" : (el?.max_mult >= 2 && el?.max_mult <= 10) ? " #913EF8" : "#34B4FF",
                                        background: "#00000080"
                                    }}>
                                        {el?.maxAutoCashout}x
                                    </div> : null
                                }
                            </>
                        }

                    </div>
                    <div className="cashout-head-container" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <p className='cashout-para' style={{ fontSize: "14px", fontWeight: "normal", color: el?.plane_status === "cashout" ? "white" : "#bbbfc5" }}>{formatBalance(el?.final_amount) ? formatBalance(el?.final_amount) : null}</p>
                    </div>
                </div>
            )) : null
        }
    </div>
</div>
  )
}

export default AllData