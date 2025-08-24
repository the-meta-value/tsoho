'use client'

import NeuralVisualization from './NeuralVisualization'
import NoSSRWrapper from './NoSSRWrapper'

interface Props {
  activity: number[]
}

export default function ClientOnlyNeuralVisualization({ activity }: Props) {
  return (
    <NoSSRWrapper>
      <NeuralVisualization activity={activity} />
    </NoSSRWrapper>
  )
}