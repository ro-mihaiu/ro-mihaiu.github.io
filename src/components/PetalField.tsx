import React from 'react'

const petals = Array.from({ length: 12 }, (_, index) => index + 1)

export default function PetalField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <span key={petal} className={`petal petal-${petal}`} />
      ))}
    </div>
  )
}
