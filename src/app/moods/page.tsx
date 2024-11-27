'use client'

import { createContext, useState } from 'react'
import { Cube } from './components/Cube'
import { SliderBox } from './components/SliderBox'

export const NeurochemContext = createContext(null)

export default function MoodsPage() {
  const [neuroState, setNeuroState] = useState({
    dopamine: 5,
    serotonin: 5,
    adrenaline: 5
  })

  return (
    <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
      <div className="flex flex-col gap-4">
        <Cube />
        <SliderBox />
      </div>
    </NeurochemContext.Provider>
  )
}
