import React, { useEffect, useState, useRef } from 'react'
import '../chat/chat.css'
import ChatList from './ChatList'
import ChatModal from './ChatModal'
import ChatSend from './ChatSend'
import { io } from 'socket.io-client';
const ChatBox = ({ chatOpen, setChatOpen, info }) => {
    const [chatData, setChatData] = useState([])
    const [newMessage, setNewMessage] = useState('');
    const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
    const [charCount, setCharCount] = useState(160);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [totalCount, setTotalCount] = useState({})
    const [selectedGif, setSelectedGif] = useState('');
    const [loading, setLoading] = useState(true)
    const [sendingMessage, setSendingMessage] = useState(false);
    const [shouldScroll, setShouldScroll] = useState(true);
    const [scrollCount, setScrollCount] = useState(0);
    const [spamNotification, setSpamNotification] = useState(false);
    const chatListRef = useRef(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [isUserAtBottom, setIsUserAtBottom] = useState(true);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        if (chatOpen) {
            const URL = `${process.env.REACT_APP_BASE_URL_CHAT}`;
            const newSocket = io(URL, {
                transports: ['websocket'],
                query: {
                    game: "aviator",
                }
            });
            setSocket(newSocket);
            newSocket.emit("message", `GCT:${info.id}:${info.operator_id}:${limit}:0`);
            newSocket.on("chat", (data) => {
                setLoading(true)
                setChatData(data.chatData);
                setLoading(false)
            });
            newSocket.on("totalUserChat", (data) => {
                setTotalCount(data);
            });

            return () => {
                newSocket.off("chat");
                newSocket.disconnect();
            };
        }
    }, [chatOpen, info.id]);
    useEffect(() => {
        if (chatOpen && chatListRef.current && shouldScroll) {
            scrollToBottom()
        }
    }, [chatData, chatOpen, shouldScroll]);

    const scrollToBottom = () => {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    };
  

    const spamFilter = (message) => {
        const spamKeywords = ["spam", "advertisement", "click here", "buy now", "free"];
        return spamKeywords.some(keyword => message.toLowerCase().includes(keyword));
    };
    const sendMessage = async () => {
        setIsEmojiPickerOpen(false);
        setIsGifPickerOpen(false);
        const messageWithGif = newMessage ? newMessage : null;
        const gif = selectedGif.url;
        if (spamFilter(newMessage)) {
            setSpamNotification(true);
            setTimeout(() => {
                setSpamNotification(false);
            }, 3000);
            return;
        }
        if (newMessage.trim() || selectedGif) {
            socket.emit("message", `CT:${info.id}:${info.operator_id}:${messageWithGif}:${gif}`);
            setTimeout(() => {
                socket.emit("message", `GCT:${info.id}:${info.operator_id}:${limit}:0`);
            }, 1000);
            socket.on("chat", (data) => {
                setLoading(false);
                setChatData(data.chatData);
              });
            setNewMessage('');
            setSelectedGif('');
            setCharCount(160);
            scrollToBottom();

        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleInputChange = (e) => {
        const message = e.target.value;
        if (message?.length <= 160) {
            setNewMessage(message);
            setCharCount(160 - message?.length);
        }
    };

    const handelEmojiOpen = () => {
        setIsEmojiPickerOpen(!isEmojiPickerOpen)
        setIsGifPickerOpen(false)
    }
    const handelGigOpen = () => {
        setIsGifPickerOpen(!isGifPickerOpen)
        setIsEmojiPickerOpen(false)
    }

    const handleGifSelect = (gif) => {
        setSelectedGif(gif);
        setIsGifPickerOpen(false);
    };
    const handleEmojiSelect = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setNewMessage(newMessage + emoji);
    };
    const handleLike = (item) => {
        setShouldScroll(false);
        socket.emit("message", `LK:${item.id}:${info.id}:${info.operator_id}`)
        setTimeout(() => {
            socket.emit("message", `GCT:${info.id}:${info.operator_id}:${limit}:${offset}`);
        }, 3000);
        setNewMessage('');
    }

    const handleDisconnect = () => {
        socket.emit("message", `DCH:${info.id}:${info.operator_id}`)
        setChatOpen(false)
    }
    const handleUserShow = (item) => {
        const formattedName = `@${item.charAt(0).toLowerCase()}***${item.charAt(item.length - 1)}`;
        setNewMessage(formattedName);
    }

    return (
        <div className='chat-container'>
            <div className="chat-content">
                <div className="chat-header">
                    <div className=""></div>
                    <div className="chat-online">
                        <div className="circle"></div>
                        <div className="chat-online-text"> {chatData?.length} {totalCount?.totaleUser}</div>
                    </div>
                    <button onClick={handleDisconnect} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>
                </div>
                <ChatList loading={loading}  sendingMessage={sendingMessage} chatData={chatData} chatListRef={chatListRef} handleLike={handleLike} handleUserShow={handleUserShow} />
                {spamNotification && (
                    <div className="spam-notification">
                        <p>Spam Filter</p>
                    </div>
                )}
                <ChatModal selectedGif={selectedGif}
                    setIsEmojiPickerOpen={setIsEmojiPickerOpen}
                    setIsGifPickerOpen={setIsGifPickerOpen}
                    setSelectedGif={setSelectedGif}
                    handleEmojiSelect={handleEmojiSelect}
                    handleGifSelect={handleGifSelect}
                    isEmojiPickerOpen={isEmojiPickerOpen}
                    isGifPickerOpen={isGifPickerOpen}
                />
              
                <ChatSend handelEmojiOpen={handelEmojiOpen}
                    handelGigOpen={handelGigOpen}
                    selectedGif={selectedGif}
                    sendMessage={sendMessage}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                    charCount={charCount}
                    sendingMessage={sendingMessage}
                    newMessage={newMessage}
                />

            </div>

        </div>
    )
}

export default ChatBox