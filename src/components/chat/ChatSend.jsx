import React from 'react'
import { PiArrowElbowDownRightFill } from 'react-icons/pi'
import '../chat/chat.css'
const ChatSend = ({handelEmojiOpen,handelGigOpen,handleInputChange,
    selectedGif,charCount,
    handleKeyDown,newMessage,sendMessage}) => {
  return (
    <div className="chat-footer">
    <div className="input-section">
        <textarea name="" className='text-chat-input'
            value={newMessage}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            placeholder='Reply' id=""></textarea>
         <button className="" disabled={!newMessage.trim() && !selectedGif} onClick={sendMessage}>
            <PiArrowElbowDownRightFill
                style={{
                    color: newMessage.trim() || selectedGif ? "white" : "#747474",
                }}
                className='chat-submit'
            />
        </button>
    </div>
    <div className="gif-section-container">
        <div className="gif-section">
        <div className="emoji-image-back"  onClick={handelEmojiOpen}  ></div>
            <div className="gif-image-back" onClick={handelGigOpen}></div>
        </div>
        <div className="number-para">
            {charCount}
        </div>
    </div>
</div>
  )
}

export default ChatSend