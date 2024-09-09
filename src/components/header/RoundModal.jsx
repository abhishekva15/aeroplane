import React, { useState } from 'react'
import ReadMore from '../modal/headerModal/ReadMore';
import { icon } from '../../utility/icon';
import { formateTime } from '../../utility/helper';

const RoundModal = ({ setRoundModal, roundData }) => {
  console.log(roundData)
  const [provOpen, setProvOpen] = useState(false)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setRoundModal(false)
    }
  };
  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="header-modal-content-game">
        <div className="header-modal-head">
          <div className="round-flex">
            <h2>Round {roundData?.lobby_id}</h2>
            <div className="round-max" style={{
              color: roundData?.settled_max_mult
                ? roundData.settled_max_mult >= 10
                  ? "#C017B4"
                  : roundData.settled_max_mult >= 2 && roundData.settled_max_mult <= 10
                    ? "#913EF8"
                    : "#34B4FF"
                : roundData?.max_mult >= 10
                  ? "#C017B4"
                  : roundData?.max_mult >= 2 && roundData?.max_mult <= 10
                    ? "#913EF8"
                    : "#34B4FF",
              fontWeight: "700",
            }}
            >
              {roundData?.max_mult ? roundData?.max_mult : roundData?.settled_max_mult}x
            </div>
            <p className='round-time'>{formateTime(roundData?.created_at)}</p>
          </div>
          <button onClick={() => setRoundModal(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button></div>
        <div className="round-server-container">
          <div className="server-seed">
            <div className="server-card">
              <div className="">
                <img src={icon.server} alt='' className='server-image' />
              </div>
              <div className="server-seed-para">
                <p className='server-seed-name'>Server Seed:</p>
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Generated on our side</p>
              </div>
            </div>
            <div className="server-black-card">
              <p className='dummy-para'>
                DxSUPfskSuDddmS6CO9V0QNBJe338Yz3XuQHKCMN
              </p>
            </div>
          </div>
          <div className="server-seed">
            <div className="server-card">
              <div className="">
                <img src={icon.client} alt='' className='server-image' />
              </div>
              <div className="server-seed-para">
                <p className='server-seed-name'>Client Seed:</p>
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Generated on players side</p>
              </div>
            </div>
            <div className="server-black-card padding-server">
              <div className="player-client">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Player N1:</p>
                <div className="client-name">
                  <img src={icon.img1} alt="" className='client-name-img' />
                  <p className='server-seed-name'>a***m</p>
                </div>
              </div>
              <div className="client-name" style={{ gap: "1rem" }}>
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Seed:</p>
                <p className='server-seed-name select-cursor'>WZIswQpImBmIAaQtIXhq</p>
              </div>
            </div>
            <div className="server-black-card padding-server">
              <div className="player-client">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Player N2:</p>
                <div className="client-name">
                  <img src={icon.img1} alt="" className='client-name-img' />
                  <p className='server-seed-name'>d***m</p>
                </div>
              </div>
              <div className="client-name" style={{ gap: "1rem" }}>
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Seed:</p>
                <p className='server-seed-name select-cursor'>WZIswQpImBmIAaQtIXhq</p>
              </div>
            </div>
            <div className="server-black-card padding-server">
              <div className="player-client">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Player N3:</p>
                <div className="client-name">
                  <img src={icon.img1} alt="" className='client-name-img' />
                  <p className='server-seed-name'>c***m</p>
                </div>
              </div>
              <div className="client-name" style={{ gap: "1rem" }}>
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Seed:</p>
                <p className='server-seed-name select-cursor'>WZIswQpImBmIAaQtIXhq</p>
              </div>
            </div>
          </div>
          <div className="server-seed">
            <div className="server-card">
              <div className="">
                <img src={icon.hash} alt='' style={{ width: "100%" }} />
              </div>
              <div className="server-seed-para">
                <p className='server-seed-name'>Combined SHA512 Hash:</p>
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>
                  Above seeds combined and converted to SHA512 Hash. This is your game result
                </p>
              </div>
            </div>
            <div className="server-black-card">
              <p className='server-seed-name select-cursor'>
                7b014b8eb78af442e6526042b0d63d58d62c7378b0c741c2cb5747b32fa9a316fc57fe88853d8ae06aa65915fa21ac417aa8a38bc7fa2a8d0ae43515590bbdca
              </p>
            </div>
          </div>
          <div className="hex-flex-container">
            <div className="hex-flex">
              <div className="hex-number">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Hex:</p>
              </div>
              <div className="hex-number">
                <p className='server-seed-name' style={{ color: "#ffffff80", textAlign: "center" }}>Decimal:</p>
              </div>
              <div className="hex-number">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Result:</p>
              </div>
            </div>
            <div className="server-black-card hex-flex">
              <div className="hex-number">
                <p className='server-seed-name'>7b014b8eb78af</p>
              </div>
              <div className="hex-number" style={{ textAlign: "center" }}>
                <p className='server-seed-name'>2163927885248687</p>
              </div>
              <div className="hex-number" style={{ textAlign: "center" }}>
                <p className='server-seed-name' style={{ marginLeft: "1rem" }} >
                  {roundData?.max_mult ? roundData?.max_mult : roundData?.settled_max_mult}
                </p>
              </div>
            </div>
          </div>
          <div className="hex-flex-container-mobile">
            <div className="hex-flex-column-mobile">
              <div className="hex-number">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Hex:</p>
              </div>
              <div className="server-black-card">
                <p className='server-seed-name'>
                  cc606afd8bc4re
                </p>
              </div>
            </div>
            <div className="hex-flex-column-mobile">
              <div className="hex-number">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Decimal:</p>
              </div>
              <div className="server-black-card">
                <p className='server-seed-name'>
                  2163927885248687
                </p>
              </div>
            </div>
            <div className="hex-flex-column-mobile">
              <div className="hex-number">
                <p className='server-seed-name' style={{ color: "#ffffff80" }}>Result:</p>
              </div>
              <div className="server-black-card">
                <p className='server-seed-name'>
                  {roundData?.max_mult ? roundData?.max_mult : roundData?.settled_max_mult}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="avatar-footer" >
          <p className='server-seed-name' style={{ color: "#ffffff80" }}>For instructions check <span style={{ color: "#e30c32", marginLeft: "5px", cursor: "pointer" }} onClick={() => { setProvOpen(true) }}>What is Provably Fair</span></p>
        </div>

      </div>
      {
        provOpen && (<ReadMore setProbOpen={setProvOpen} />)
      }
    </div>

  )
}

export default RoundModal
