"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Zap, Leaf, Settings, TrendingDown, Clock, CheckCircle } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  category: "energy" | "equipment" | "process" | "materials"
  impact: "high" | "medium" | "low"
  effort: "low" | "medium" | "high"
  savings: string
  timeframe: string
  confidence: number
  implemented: boolean
}

export function RecommendationsPanel() {
  const recommendations: Recommendation[] = [
    {
      id: "1",
      title: "Optimize HVAC Scheduling",
      description:
        "Implement smart scheduling for heating and cooling systems based on production schedules and occupancy patterns.",
      category: "energy",
      impact: "high",
      effort: "low",
      savings: "12.3 tCO₂/month",
      timeframe: "2 weeks",
      confidence: 94,
      implemented: false,
    },
    {
      id: "2",
      title: "Upgrade to LED Lighting",
      description: "Replace fluorescent lighting with energy-efficient LED systems across Plant B packaging facility.",
      category: "equipment",
      impact: "medium",
      effort: "medium",
      savings: "8.7 tCO₂/month",
      timeframe: "1 month",
      confidence: 89,
      implemented: false,
    },
    {
      id: "3",
      title: "Implement Predictive Maintenance",
      description: "Use AI-driven predictive maintenance to optimize equipment efficiency and reduce energy waste.",
      category: "process",
      impact: "high",
      effort: "high",
      savings: "18.5 tCO₂/month",
      timeframe: "3 months",
      confidence: 87,
      implemented: false,
    },
    {
      id: "4",
      title: "Switch to Renewable Materials",
      description: "Replace 30% of current packaging materials with biodegradable alternatives.",
      category: "materials",
      impact: "medium",
      effort: "medium",
      savings: "6.2 tCO₂/month",
      timeframe: "6 weeks",
      confidence: 76,
      implemented: true,
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "energy":
        return <Zap className="h-4 w-4" />
      case "equipment":
        return <Settings className="h-4 w-4" />
      case "process":
        return <TrendingDown className="h-4 w-4" />
      case "materials":
        return <Leaf className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "energy":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "equipment":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "process":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400"
      case "materials":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge variant="destructive">High Impact</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Impact</Badge>
      case "low":
        return <Badge variant="outline">Low Impact</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "low":
        return (
          <Badge variant="default" className="bg-green-500">
            Low Effort
          </Badge>
        )
      case "medium":
        return <Badge variant="secondary">Medium Effort</Badge>
      case "high":
        return <Badge variant="outline">High Effort</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recommendations</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendations.length}</div>
            <p className="text-xs text-muted-foreground">
              {recommendations.filter((r) => !r.implemented).length} pending implementation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.7 tCO₂</div>
            <p className="text-xs text-muted-foreground">per month if all implemented</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(recommendations.reduce((acc, r) => acc + r.confidence, 0) / recommendations.length)}%
            </div>
            <p className="text-xs text-muted-foreground">AI model confidence</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className={rec.implemented ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${getCategoryColor(rec.category)}`}>
                      {getCategoryIcon(rec.category)}
                    </div>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    {rec.implemented && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  {getImpactBadge(rec.impact)}
                  {getEffortBadge(rec.effort)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Potential Savings</div>
                  <div className="font-semibold text-green-600 dark:text-green-400">{rec.savings}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Implementation Time</div>
                  <div className="font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {rec.timeframe}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">AI Confidence</div>
                  <div className="flex items-center gap-2">
                    <Progress value={rec.confidence} className="h-2 flex-1" />
                    <span className="text-sm font-medium">{rec.confidence}%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <Badge variant="outline" className="capitalize">
                    {rec.category}
                  </Badge>
                </div>
              </div>

              {!rec.implemented && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Implement Recommendation
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              )}

              {rec.implemented && (
                <div className="flex items-center gap-2 pt-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Successfully implemented</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
