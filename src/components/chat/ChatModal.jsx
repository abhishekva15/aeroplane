import React from 'react'
import { RiCloseFill } from 'react-icons/ri'
import GifPicker from 'gif-picker-react';
import '../chat/chat.css'
import EmojiPicker from 'emoji-picker-react'
const ChatModal = ({isEmojiPickerOpen,isGifPickerOpen,selectedGif,setIsEmojiPickerOpen,
    handleEmojiSelect,handleGifSelect,setIsGifPickerOpen,setSelectedGif
}) => {
  return (
 <div className="">
       {isEmojiPickerOpen && (
                    <div className="emoji-picker">
                        <div className="emoji-modal">
                            <div className="header-modal-head">
                                <h2>EMOJI</h2>
                                <div className="" onClick={() => setIsEmojiPickerOpen(false)}>
                                    <RiCloseFill className="icon-close" />
                                </div>
                            </div>

                            <EmojiPicker
                                theme='black'
                                searchPlaceHolder='Search emoji...'
                                skinTonesDisabled
                                width="100%"
                                reactions={false}
                                reactionsDefaultOpen={false}
                                onEmojiClick={handleEmojiSelect} height={350} categories={[
                                    {
                                        category: 'suggested',
                                        name: 'Favorites'
                                    },
                                    {
                                        category: 'smileys_people',
                                        name: 'People'
                                    }
                                ]} style={{ backgroundColor: "transparent", border: "none" }} />
                        </div>
                    </div>
                )}
                {isGifPickerOpen && (
                    <div className="emoji-picker">
                        <div className="emoji-modal">
                            <div className="header-modal-head">
                                <h2>GIF</h2>
                                <div className="" onClick={() => setIsGifPickerOpen(false)}>
                                    <RiCloseFill className="icon-close" />
                                </div>
                            </div>
                            <GifPicker height={350} searchPlaceHolder='Search gif...' width="100%" tenorApiKey="AIzaSyAXXqKRIcHz9yp3ictns1yQ6U1Dty1n-yQ"
                                onGifClick={handleGifSelect}
                            />
                        </div>
                    </div>
                )}
                {selectedGif &&
                    <div className="selected-gif-container">
                    <div className="emoji-modal-1">
                  <div className="close-gif">
                  <button className="remove-gif" onClick={() => setSelectedGif('')}>
                            <RiCloseFill className="icon-close" />
                        </button>
                  </div>
                    <img src={selectedGif.url} alt="Selected GIF" className="selected-gif" />
                    </div>
                    </div>
                }
 </div>
  )
}

export default ChatModal