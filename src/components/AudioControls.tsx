'use client'

import { useState, useRef, useEffect } from 'react'

export default function AudioControls() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [frequency, setFrequency] = useState(440)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Initialize Web Audio API when component mounts
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.log('Web Audio API not available:', error)
      }
    }

    return () => {
      stopAudio()
    }
  }, [])

  const startAudio = () => {
    if (!audioContextRef.current) return

    // Create oscillator for neural activity sonification
    oscillatorRef.current = audioContextRef.current.createOscillator()
    gainNodeRef.current = audioContextRef.current.createGain()

    oscillatorRef.current.connect(gainNodeRef.current)
    gainNodeRef.current.connect(audioContextRef.current.destination)

    oscillatorRef.current.frequency.value = frequency
    gainNodeRef.current.gain.value = volume * 0.1 // Keep it subtle

    oscillatorRef.current.start()
    setIsAudioEnabled(true)
  }

  const stopAudio = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current = null
    }
    setIsAudioEnabled(false)
  }

  const toggleAudio = () => {
    if (isAudioEnabled) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  const updateFrequency = (newFreq: number) => {
    setFrequency(newFreq)
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = newFreq
    }
  }

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume * 0.1
    }
  }

  return (
    <div className="p-4 bg-black/30">
      <h3 className="text-sm font-bold text-memory-gold mb-3">
        Neural Sonification
      </h3>
      
      <div className="space-y-3">
        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          className={`w-full p-2 rounded text-sm font-medium transition-colors ${
            isAudioEnabled 
              ? 'bg-memory-gold text-black' 
              : 'bg-black/50 text-white border border-memory-gold/30'
          }`}
        >
          {isAudioEnabled ? '🔊 Audio On' : '🔇 Audio Off'}
        </button>

        {/* Volume Control */}
        <div>
          <label className="text-xs text-white/70 block mb-1">
            Volume: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => updateVolume(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Frequency Control */}
        <div>
          <label className="text-xs text-white/70 block mb-1">
            Base Frequency: {frequency}Hz
          </label>
          <input
            type="range"
            min="200"
            max="800"
            step="10"
            value={frequency}
            onChange={(e) => updateFrequency(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Export Controls */}
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2">Export Options</p>
          <div className="flex gap-2">
            <button className="flex-1 p-1 text-xs bg-blue-600/20 text-blue-300 rounded border border-blue-600/30">
              CSV
            </button>
            <button className="flex-1 p-1 text-xs bg-green-600/20 text-green-300 rounded border border-green-600/30">
              TwoTone
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="text-xs text-white/50 pt-2">
          Status: {isAudioEnabled ? 'Listening to Lang\'s thoughts' : 'Silent'}
        </div>
      </div>
    </div>
  )
}