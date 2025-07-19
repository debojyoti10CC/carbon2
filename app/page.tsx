"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Activity, AlertTriangle, TrendingDown, TrendingUp, Zap, Leaf, Target, BarChart3 } from "lucide-react"
import { EmissionsChart } from "@/components/emissions-chart"
import { FacilityHeatmap } from "@/components/facility-heatmap"
import { SustainabilityScore } from "@/components/sustainability-score"
import { AlertsPanel } from "@/components/alerts-panel"

export default function Dashboard() {
  const [realTimeData, setRealTimeData] = useState({
    currentEmissions: 8.7,
    dailyBudget: 12.0,
    weeklyTrend: -5.2,
    facilitiesOnline: 3,
    alertsCount: 2,
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        currentEmissions: prev.currentEmissions + (Math.random() - 0.5) * 0.2,
        weeklyTrend: prev.weeklyTrend + (Math.random() - 0.5) * 0.5,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const budgetUtilization = (realTimeData.currentEmissions / realTimeData.dailyBudget) * 100

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Carbon Emissions Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time monitoring and analytics</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Activity className="h-3 w-3" />
            Live
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Emissions</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.currentEmissions.toFixed(1)} tCO₂</div>
              <p className="text-xs text-muted-foreground">{budgetUtilization.toFixed(1)}% of daily budget</p>
              <Progress value={budgetUtilization} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Trend</CardTitle>
              {realTimeData.weeklyTrend < 0 ? (
                <TrendingDown className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {realTimeData.weeklyTrend > 0 ? "+" : ""}
                {realTimeData.weeklyTrend.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">vs. previous week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Facilities Online</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.facilitiesOnline}/3</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.alertsCount}</div>
              <p className="text-xs text-muted-foreground">Threshold warnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Real-time Emissions Tracking</CardTitle>
              <CardDescription>Live carbon emissions data from all manufacturing facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <EmissionsChart />
            </CardContent>
          </Card>
        </div>

        {/* Secondary Panels */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Sustainability Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SustainabilityScore score={78} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Facility Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FacilityHeatmap />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AlertsPanel />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and AI-powered recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="justify-start gap-2 bg-transparent">
                <Leaf className="h-4 w-4" />
                Generate ESG Report
              </Button>
              <Button variant="outline" className="justify-start gap-2 bg-transparent">
                <Target className="h-4 w-4" />
                Set New Targets
              </Button>
              <Button variant="outline" className="justify-start gap-2 bg-transparent">
                <BarChart3 className="h-4 w-4" />
                Run Simulation
              </Button>
              <Button variant="outline" className="justify-start gap-2 bg-transparent">
                <TrendingDown className="h-4 w-4" />
                Optimize Operations
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
