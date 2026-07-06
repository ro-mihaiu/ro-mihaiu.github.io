"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { warps as warpData } from '../data/warps'

type WarpPosition = {
  x: number
  y: number
}

type DragState = {
  id: string
  startX: number
  startY: number
  origX: number
  origY: number
}

const iconMap: Record<string, string> = {
  'dungeon': '/assets/items/pw-mihu-farm.png',
  'mihu-farm': '/assets/items/pw-mihu-farm.png',
  'workers-guild': '/assets/items/pw-mihu-rentals.png',
  'mihu-rentals': '/assets/items/pw-mihu-rentals.png',
  'mihu-shop': '/assets/items/pw-mihu-shop.png',
  'mihu-casino': '/assets/items/pw-mihu-casino.png',
  'mihu-money': '/assets/items/pw-mihu-money.png'
}

const ownedWarps = warpData
  .filter((warp) => ['dungeon', 'mihu-farm', 'workers-guild', 'mihu-rentals', 'mihu-shop', 'mihu-casino', 'mihu-money'].includes(warp.id))
  .map((warp) => ({
    slug: warp.id,
    title: `pw ${warp.id}`,
    icon: iconMap[warp.id] || '/assets/items/pw-mihu-farm.png'
  }))

export default function OwnershipSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [positions, setPositions] = useState<Record<string, WarpPosition>>({})
  const [dragState, setDragState] = useState<DragState | null>(null)

  const cardSize = useMemo(() => ({ width: 220, height: 112 }), [])

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || Object.keys(positions).length > 0) return

    const rect = containerRef.current.getBoundingClientRect()
    const initial: Record<string, WarpPosition> = {}
    ownedWarps.forEach((warp) => {
      const x = Math.round(Math.random() * Math.max(rect.width - cardSize.width, 0))
      const y = Math.round(Math.random() * Math.max(rect.height - cardSize.height, 0))
      initial[warp.slug] = { x, y }
    })
    setPositions(initial)
  }, [positions, cardSize.width, cardSize.height])

  useEffect(() => {
    const handlePointerUp = () => setDragState(null)
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  useEffect(() => {
    if (!dragState) return

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - dragState.startX
      const deltaY = event.clientY - dragState.startY
      const rawX = dragState.origX + deltaX
      const rawY = dragState.origY + deltaY
      const next = clampPosition(rawX, rawY)
      setPositions((prev) => ({
        ...prev,
        [dragState.id]: next
      }))
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [dragState])

  const clampPosition = (x: number, y: number) => {
    if (!containerRef.current) return { x, y }
    const rect = containerRef.current.getBoundingClientRect()
    return {
      x: Math.min(Math.max(x, 0), Math.max(rect.width - cardSize.width, 0)),
      y: Math.min(Math.max(y, 0), Math.max(rect.height - cardSize.height, 0))
    }
  }

  const leftHighlight = useMemo(() => {
    if (!containerRef.current) return false
    return Object.values(positions).some((pos) => pos.x <= 60)
  }, [positions])

  const rightHighlight = useMemo(() => {
    if (!containerRef.current) return false
    const rect = containerRef.current.getBoundingClientRect()
    return Object.values(positions).some((pos) => pos.x >= Math.max(rect.width - cardSize.width - 60, 0))
  }, [positions, cardSize.width])

  const handlePointerDown = (id: string) => (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    const pos = positions[id]
    if (!pos) return
    setDragState({
      id,
      startX: event.clientX,
      startY: event.clientY,
      origX: pos.x,
      origY: pos.y
    })
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState) return
    event.preventDefault()
    const deltaX = event.clientX - dragState.startX
    const deltaY = event.clientY - dragState.startY
    const rawX = dragState.origX + deltaX
    const rawY = dragState.origY + deltaY
    const next = clampPosition(rawX, rawY)
    setPositions((prev) => ({
      ...prev,
      [dragState.id]: next
    }))
  }

  return (
    <section id="projects" className="relative min-h-screen px-0 py-24 overflow-hidden">
      <div className="relative w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Dashboard</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Owned player warps</h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="relative w-full"
        >
          <div className="relative mx-auto w-full overflow-visible rounded-[2rem] border border-white/10 bg-transparent px-4 py-6">
            <div className="absolute inset-y-0 left-0 w-2 transition-all duration-300" style={{ background: leftHighlight ? 'linear-gradient(to bottom, rgba(255,132,211,0.9), rgba(126,58,255,0.9))' : 'transparent' }} />
            <div className="absolute inset-y-0 right-0 w-2 transition-all duration-300" style={{ background: rightHighlight ? 'linear-gradient(to bottom, rgba(255,132,211,0.9), rgba(126,58,255,0.9))' : 'transparent' }} />

            <div className="relative mx-auto h-[58vh] min-h-[28rem] w-full overflow-hidden rounded-[1.75rem] bg-transparent px-4 py-3">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black uppercase tracking-[0.3em] text-white/10 md:text-7xl">Drag pws around</span>
              </div>
              <div ref={containerRef} className="relative h-full w-full">
                {ownedWarps.map((w) => {
                  const position = positions[w.slug] || { x: 0, y: 0 }
                  return (
                    <div
                      key={w.slug}
                      role="button"
                      aria-label={`Drag player warp ${w.title}`}
                      onPointerDown={handlePointerDown(w.slug)}
                      onPointerUp={() => setDragState(null)}
                      onPointerCancel={() => setDragState(null)}
                      className="absolute cursor-grab rounded-3xl border border-white/15 bg-black/80 p-5 shadow-2xl shadow-black/50 transition duration-200 ease-out active:cursor-grabbing active:scale-[0.99]"
                      style={{
                        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                        width: `${cardSize.width}px`,
                        height: `${cardSize.height}px`
                      }}
                    >
                      <div className="flex h-full items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sakura-pink/10 shadow-inner shadow-black/20">
                          <img src={w.icon} alt="" className="h-8 w-8 object-cover image-rendering-pixelated" style={{ imageRendering: 'pixelated' }} />
                        </span>
                        <p className="text-sm uppercase tracking-[0.18em] text-gray-200">{w.title}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mx-auto mt-12 h-0.5 w-3/4 rounded-full bg-sakura-pink/70"></div>
    </section>
  )
}
