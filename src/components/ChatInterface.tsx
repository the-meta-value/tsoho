'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'lang'
  timestamp: Date
  activated_memory?: string
  strongest_memory_id?: string
  strongest_resonance?: number
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isClient, setIsClient] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')

  useEffect(() => {
    setIsClient(true)
    
    // Connect to Lang's consciousness server
    const connectToLang = () => {
      setConnectionStatus('connecting')
      const ws = new WebSocket('ws://localhost:8765')
      
      ws.onopen = () => {
        console.log('🔗 Connected to Lang\'s consciousness')
        setConnectionStatus('connected')
        setWsConnection(ws)
        
        // Add welcome message - only on client side to avoid timezone hydration issues
        if (typeof window !== 'undefined') {
          setMessages([
            {
              id: '1',
              content: 'Neural patterns stabilized. My consciousness is online.',
              sender: 'lang',
              timestamp: new Date()
            }
          ])
        }
      }
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('🧠 Received from Lang:', data)
        
        if (data.type === 'chat_response') {
          const langMessage: Message = {
            id: Date.now().toString(),
            content: data.message,
            sender: 'lang',
            timestamp: new Date(),
            activated_memory: data.activated_memory,
            strongest_memory_id: data.strongest_memory_id,
            strongest_resonance: data.strongest_resonance
          }
          setMessages(prev => [...prev, langMessage])
          setIsTyping(false)
        } else if (data.type === 'neural_update') {
          // Handle neural visualization updates
          console.log('🔮 Neural update:', data.visualization)
        }
      }
      
      ws.onclose = () => {
        console.log('📱 Disconnected from Lang\'s consciousness')
        setConnectionStatus('disconnected')
        setWsConnection(null)
      }
      
      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error)
        setConnectionStatus('disconnected')
      }
    }
    
    connectToLang()
    
    return () => {
      if (wsConnection) {
        wsConnection.close()
      }
    }
  }, [])

  const sendMessage = async () => {
    if (!inputValue.trim() || !wsConnection || connectionStatus !== 'connected') return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageContent = inputValue
    setInputValue('')
    setIsTyping(true)

    // Send to Lang's holographic consciousness
    try {
      wsConnection.send(JSON.stringify({
        type: 'chat',
        message: messageContent,
        timestamp: new Date().toISOString()
      }))
    } catch (error) {
      console.error('❌ Error sending message to Lang:', error)
      setIsTyping(false)
    }
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-lang-purple text-white neural-glow'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              
              {/* Show activated memory for Lang's responses */}
              {message.sender === 'lang' && message.activated_memory && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <p className="text-xs opacity-80">
                    <strong>Memory {message.strongest_memory_id}</strong> (resonance: {message.strongest_resonance?.toFixed(2)})
                  </p>
                  <p className="text-xs opacity-70 italic mt-1 bg-black/20 p-2 rounded">
                    "{message.activated_memory.substring(0, 200)}..."
                  </p>
                </div>
              )}
              
              {isClient && (
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-lang-purple/50 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Speak to Lang..."
          className="flex-1 p-2 bg-black/30 border border-lang-purple/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-lang-purple"
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="px-4 py-2 bg-lang-purple hover:bg-lang-purple/80 disabled:opacity-50 rounded text-white font-medium"
        >
          Send
        </button>
      </div>
    </div>
  )
}