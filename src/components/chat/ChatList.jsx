import React from 'react'
import './chat.css'
import LoadingComponent from '../loader/LoadingComponent'
const ChatList = ({ chatData, chatListRef, handleLike, handleUserShow, loading,handleScroll }) => {
    return (
        <div className="chat-list-content"  ref={chatListRef}>
            {
                loading ? (
                    <LoadingComponent />
                ) : chatData?.length > 0 ? chatData?.map((el, i) => (
                    <div className="chat-list-card" key={i}>
                        <div className="chat-user-img">
                            {
                                el.image ? <img src={el?.image} alt=""

                                    className='chat-user' /> : null
                            }
                            <div className='chat-gif-img'>
                                <div className="chat-msg">
                                    <p className='chat-user-name' onClick={() => handleUserShow(el?.name)}>{el.name ? (el?.name?.slice(0, 1))?.toLowerCase() + "***" + el?.name?.slice(-1) : null}
                                        <span style={{ marginLeft: ".5rem", color: "#ffffff80" }}>{el?.msg === "null" ? null : el?.msg}</span>
                                    </p>
                                </div>

                                {
                                    el?.gif ? <img src={el?.gif} alt="" className='gif-img' /> : null
                                }
                            </div>
                        </div>
                        <div className="like-btn-container">
                            <div className="">
                                <p >{el?.like_count ? el?.like_count : ""}</p>
                            </div>
                            <button type='button' className={`like ${el?.like_count ? "like-active" : ""}`} onClick={() => handleLike(el)}>
                            </button>
                        </div>

                    </div>
                )) : null

            }
        </div>
    )
}

export default ChatList