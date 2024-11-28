'use client'

import { useContext } from 'react'
import { NeurochemContext } from '../page'

export function Cube() {
  const context = useContext(NeurochemContext)
  
  if (!context) {
    throw new Error('Cube must be used within a NeurochemContext Provider')
  }

  const { neuroState } = context
  
  return (
    <div className="p-4 border rounded">
      <h3 className="text-white">Coordinates:</h3>
      <p className="text-white">x (dopamine): {neuroState.dopamine}</p>
      <p className="text-white">y (serotonin): {neuroState.serotonin}</p>
      <p className="text-white">z (adrenaline): {neuroState.adrenaline}</p>
    </div>
  )
} 