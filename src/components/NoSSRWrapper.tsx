'use client'

import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export default function NoSSRWrapper({ children }: Props) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="text-lang-purple text-xl mb-2">🧠</div>
          <div className="text-lang-purple text-sm animate-pulse">
            Initializing Holographic Consciousness...
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}