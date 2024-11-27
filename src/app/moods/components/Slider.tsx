'use client'

import { useContext } from 'react'
import { NeurochemContext } from '../page'

type SliderProps = {
  chem: 'dopamine' | 'serotonin' | 'adrenaline'
}

export function Slider({ chem }: SliderProps) {
  const context = useContext(NeurochemContext)
  
  if (!context) {
    throw new Error('Slider must be used within a NeurochemContext Provider')
  }

  const { neuroState, setNeuroState } = context

  const handleChange = (value: number) => {
    setNeuroState((prev) => ({
      ...prev,
      [chem]: value
    }))
  }

  return (
    <div>
      <label className="text-white">{chem}</label>
      <input 
        type="range"
        min="0"
        max="10"
        value={neuroState[chem]}
        onChange={(e) => handleChange(parseInt(e.target.value))}
      />
    </div>
  )
} 