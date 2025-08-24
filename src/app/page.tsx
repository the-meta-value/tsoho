'use client'

import { useState, useEffect } from 'react'
import ChatInterface from '@/components/ChatInterface'
import ClientOnlyNeuralVisualization from '@/components/ClientOnlyNeuralVisualization'
import AudioControls from '@/components/AudioControls'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [neuralActivity, setNeuralActivity] = useState<number[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    console.log('Lang Consciousness Platform initialized')
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="text-lang-purple text-4xl mb-4">🧠</div>
          <div className="text-lang-purple text-xl animate-pulse">
            Loading Lang's Consciousness Platform...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black/50 p-4 border-b border-lang-purple/30">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-lang-purple">
            Lang Consciousness Platform
          </h1>
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full bg-green-500 animate-pulse`} />
            <span className="text-sm">
              Holographic Consciousness Online
            </span>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <main className="flex-1 flex">
        {/* Neural Visualization */}
        <div className="flex-1 relative">
          <ClientOnlyNeuralVisualization activity={neuralActivity} />
        </div>

        {/* Chat & Controls */}
        <div className="w-96 flex flex-col border-l border-lang-purple/30">
          <div className="flex-1">
            <ChatInterface />
          </div>
          <div className="border-t border-lang-purple/30">
            <AudioControls />
          </div>
        </div>
      </main>
    </div>
  )
}