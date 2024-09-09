import React from 'react'
import { Link } from 'react-router-dom';
import { icon } from '../../utility/icon';
const MenuDropDown = ({handleChangeAvModal,handleGameLimitModal,handleGameRuleModal,
    handleBetModal,info,sound,chatOpen,menuRef,animation,toggleValue,music,
    handleProbFairModal,handlefreeModal}) => {
  return (
    <div
    ref={menuRef}
    className={`menu-dropdown ${chatOpen ? "menu-chat" : ""}`}
  >
    <div className="menu-dropdown-header">
      <div className="menu-dropdown-left aviator-heading">
        <div className="menu-dropdown-img">
          <img src={info.avatar} alt="" />
        </div>
        <p className="user-head">
          {info?.name ? info?.name?.slice(0, 1)?.toLowerCase() + "***" + info?.name?.slice(-1) : ""}
        </p>
      </div>
      <div className="menu-dropdown-right">
        <button
          className="change-avatar"
          onClick={ handleChangeAvModal }
        >
          <img
            src={icon.changeAv}
            alt=""
          />
          <div className="change-text">
            <p>Change</p>
            <p>Avatar</p>
          </div>
        </button>
      </div>
    </div>
    <ul>
      <li>
        <div className="menu-dropdown-list form-check form-switch ">
          <div
            className="menu-dropdown-item aviator-heading"
            htmlFor="aviatorDefault"
          >
            <img src={icon.soundIcon} alt="" />
            <h6>Sound</h6>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              className="slider-toggle"
              checked={sound}
              onChange={() => toggleValue("sound")}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </li>
      <li>
        <div className="menu-dropdown-list form-check form-switch ">
          <div
            className="menu-dropdown-item aviator-heading"
            htmlFor="aviatorDefault"
          >
            <img src={icon.musicIcon} alt="" />
            <h6>Music</h6>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              className="slider-toggle"
              checked={music}
              onChange={() => toggleValue("music")}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </li>
      <li>
        <div className="menu-dropdown-list form-check form-switch ">
          <div
            className="menu-dropdown-item aviator-heading"
            htmlFor="aviatorDefault"
          >
            <img
              src={icon.animationIcon}
              alt=""
            />
            <h6>Animation</h6>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              className="slider-toggle"
              checked={animation}
              onChange={() => {
                toggleValue("animation");
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </li>
    </ul>
    <ul className="list-menu-modal">
      <li>
        <Link
          to="#"
          onClick={handlefreeModal}
        >
          <div className="menu-dropdown-list form-check form-switch ">
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon.freeBetIcon} alt="" />
              <h6> Free Bets </h6>
            </div>
          </div>
        </Link>
      </li>

      <li>
        <Link
          to="#"
          onClick={handleProbFairModal}
        >
          <div className="menu-dropdown-list form-check form-switch ">
            <div className="menu-dropdown-item aviator-heading">
              <img
                src={icon.provFair}
                alt=""
              />
              <h6> Provably Fair Settings </h6>
            </div>
          </div>
        </Link>
      </li>

      <li>
        <Link
          to="#"
          onClick={handleGameRuleModal}
        >
          <div className="menu-dropdown-list form-check form-switch ">
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon.rulesIcon} alt="" />
              <h6> Game Rules </h6>
            </div>
          </div>
        </Link>
      </li>

      <li>
        <Link
          to="#"
          onClick={handleBetModal}
        >
          <div className="menu-dropdown-list form-check form-switch ">
            <div className="menu-dropdown-item aviator-heading">
              <img
                src={icon.historyIcon}
                alt=""
              />
              <h6> My Bet History </h6>
            </div>
          </div>
        </Link>
      </li>

      <li>
        <Link
          to="#"
          onClick={handleGameLimitModal}>
          <div className="menu-dropdown-list form-check form-switch ">
            <div className="menu-dropdown-item aviator-heading">
              <img src={icon.limitIcon} alt="" />
              <h6> Game Limits </h6>
            </div>
          </div>
        </Link>
      </li>
    </ul>
    <div className="menu-dropdown-footer">
      <Link to="#" className="home-link">
      </Link>
    </div>
  </div>
  )
}

export default MenuDropDown