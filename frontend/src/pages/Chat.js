import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import './Chat.css'

function Chat(){
    const [chats,setChats] = useState([]);
    const [prompt,setPrompt] = useState("");
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    // const API_URL = "http://127.0.0.1:8000/api/chat_bot/";
    const API_URL = "/api/chat_bot/";
    useEffect(()=>{
        fetchChats();
    },[]);
    const fetchChats = async()=>{
        try{
            const token = localStorage.getItem("access");
            const response = await axios.get(API_URL,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            setChats(response.data);
        }catch(error){
            console.error("fetch chat error:",error.response?.data);
            setError("failed to load chat history");
        }
        
    };
    const sendMessage = async () => {

        if (!prompt.trim()) {
            return;
        }
        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('access');
            const response = await axios.post(
                API_URL,
                {
                    prompt: prompt
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setChats((prevChats) => [
                ...prevChats,
                response.data
            ]);
            setPrompt('');
        } catch (error) {
            console.error(
                'Send message error:',
                error.response?.data
            );
            setError(
                error.response?.data?.error || 'Failed to send message'
            );

        } finally {
            setLoading(false);
        }
    };
    return(
        <div className='chat-page'>
            <div className="chat-header">
                <h1>AI Chatbot</h1>
                <p>Chat with Ollama</p>
            </div>

            {error && (
                <p className="text-danger">
                    {error}
                </p>
            )}
            <div className = 'chat-history'>
                { chats.length === 0 ? (<p>Welcome </p>) : (chats.map((chat)=>(
                    <div className='chat-item' key={chat.id}>
                        <div className = 'user-message'>
                            <strong>You : </strong>
                            <p>{chat.prompt}</p>
                        </div>
                        <div className='ai-message'>
                            <strong>AI :</strong>
                            <p>{chat.response}</p>
                        </div>
                    </div>
                )
                ))}
            </div>
            <div className='chat-input'>
                <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder='type youre message' rows={3} />
                <Button onClick={sendMessage} disabled={loading} >
                    {loading ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </div>
    )
}
export default Chat;