"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface SustainabilityScoreProps {
  score: number
}

export function SustainabilityScore({ score: initialScore }: SustainabilityScoreProps) {
  const [score, setScore] = useState(initialScore)
  const [previousScore, setPreviousScore] = useState(initialScore)

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousScore(score)
      setScore((prev) => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(0, Math.min(100, prev + change))
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [score])

  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-green-500"
    if (value >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreGrade = (value: number) => {
    if (value >= 90) return "A+"
    if (value >= 80) return "A"
    if (value >= 70) return "B"
    if (value >= 60) return "C"
    return "D"
  }

  const scoreDiff = score - previousScore
  const getTrendIcon = () => {
    if (Math.abs(scoreDiff) < 0.5) return <Minus className="h-3 w-3" />
    return scoreDiff > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
  }

  const getTrendColor = () => {
    if (Math.abs(scoreDiff) < 0.5) return "text-muted-foreground"
    return scoreDiff > 0 ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</div>
        <div className="text-sm text-muted-foreground">out of 100</div>
        <Badge variant="outline" className="mt-2">
          Grade {getScoreGrade(score)}
        </Badge>
      </div>

      <Progress value={score} className="h-3" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Energy Efficiency</span>
          <span className="font-medium">85%</span>
        </div>
        <div className="flex justify-between">
          <span>Waste Reduction</span>
          <span className="font-medium">72%</span>
        </div>
        <div className="flex justify-between">
          <span>Carbon Intensity</span>
          <span className="font-medium">68%</span>
        </div>
        <div className="flex justify-between">
          <span>Renewable Energy</span>
          <span className="font-medium">91%</span>
        </div>
      </div>

      <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
        {getTrendIcon()}
        <span>
          {Math.abs(scoreDiff) < 0.5
            ? "No change"
            : `${scoreDiff > 0 ? "+" : ""}${scoreDiff.toFixed(1)} from last update`}
        </span>
      </div>
    </div>
  )
}
