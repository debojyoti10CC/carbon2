"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, AlertTriangle, Target, BarChart3 } from "lucide-react"

export function ForecastMetrics() {
  const metrics = [
    {
      title: "7-Day Forecast",
      value: "24.8 tCO₂",
      change: "+2.3%",
      trend: "up",
      target: "22.0 tCO₂",
      confidence: 94,
      status: "warning",
    },
    {
      title: "30-Day Forecast",
      value: "98.2 tCO₂",
      change: "-1.8%",
      trend: "down",
      target: "95.0 tCO₂",
      confidence: 87,
      status: "normal",
    },
    {
      title: "Quarterly Forecast",
      value: "312.5 tCO₂",
      change: "+5.7%",
      trend: "up",
      target: "285.0 tCO₂",
      confidence: 76,
      status: "critical",
    },
  ]

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-red-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-green-500" />
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return (
          <Badge variant="default" className="bg-green-500">
            On Track
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Warning
          </Badge>
        )
      case "critical":
        return <Badge variant="destructive">Over Target</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <Target className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {getStatusIcon(metric.status)}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-medium ${metric.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                  {metric.change}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">vs Target: {metric.target}</span>
                {getStatusBadge(metric.status)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-medium">{metric.confidence}%</span>
                </div>
                <Progress value={metric.confidence} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
