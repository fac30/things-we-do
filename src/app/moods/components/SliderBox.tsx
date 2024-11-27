'use client'

import { Slider } from './Slider'

export function SliderBox() {
  return (
    <div className="flex flex-col gap-4">
      <Slider chem="dopamine" />
      <Slider chem="serotonin" />
      <Slider chem="adrenaline" />
    </div>
  )
} 