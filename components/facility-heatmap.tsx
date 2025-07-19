"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

const facilities = [
  { id: "A1", name: "Assembly Line 1", x: 1, y: 1 },
  { id: "A2", name: "Assembly Line 2", x: 2, y: 1 },
  { id: "P1", name: "Packaging Unit 1", x: 1, y: 2 },
  { id: "P2", name: "Packaging Unit 2", x: 2, y: 2 },
  { id: "Q1", name: "Quality Control", x: 3, y: 1 },
  { id: "S1", name: "Storage", x: 3, y: 2 },
]

export function FacilityHeatmap() {
  const [emissions, setEmissions] = useState<Record<string, number>>({
    A1: 2.1,
    A2: 2.8,
    P1: 1.9,
    P2: 2.3,
    Q1: 1.2,
    S1: 0.8,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setEmissions((prev) => {
        const updated = { ...prev }
        Object.keys(updated).forEach((key) => {
          updated[key] = Math.max(0, updated[key] + (Math.random() - 0.5) * 0.2)
        })
        return updated
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getIntensityColor = (value: number) => {
    if (value < 1.5) return "bg-green-500/20 border-green-500/40"
    if (value < 2.5) return "bg-yellow-500/20 border-yellow-500/40"
    return "bg-red-500/20 border-red-500/40"
  }

  const getIntensityBadge = (value: number) => {
    if (value < 1.5) return { variant: "default" as const, label: "Low" }
    if (value < 2.5) return { variant: "secondary" as const, label: "Med" }
    return { variant: "destructive" as const, label: "High" }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 h-32">
        {facilities.map((facility) => {
          const emission = emissions[facility.id]
          const intensity = getIntensityBadge(emission)

          return (
            <div
              key={facility.id}
              className={`
                relative rounded-lg border-2 p-2 transition-all duration-300
                ${getIntensityColor(emission)}
                hover:scale-105 cursor-pointer
              `}
              style={{
                gridColumn: facility.x,
                gridRow: facility.y,
              }}
            >
              <div className="text-xs font-medium truncate">{facility.id}</div>
              <div className="text-xs text-muted-foreground mt-1">{emission.toFixed(1)} tCO₂</div>
              <Badge variant={intensity.variant} className="absolute top-1 right-1 text-xs px-1 py-0">
                {intensity.label}
              </Badge>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40"></div>
          <span>Low (&lt;1.5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/40"></div>
          <span>Medium (1.5-2.5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/40"></div>
          <span>High (&gt;2.5)</span>
        </div>
      </div>
    </div>
  )
}
