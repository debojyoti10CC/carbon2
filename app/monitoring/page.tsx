"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Wifi, WifiOff, Thermometer, Zap, Gauge, AlertCircle, CheckCircle } from "lucide-react"
import { EmissionsChart } from "@/components/emissions-chart"
import { Progress } from "@/components/ui/progress"

interface SensorData {
  id: string
  name: string
  type: string
  value: number
  unit: string
  status: "online" | "offline" | "warning"
  lastUpdate: string
  facility: string
}

export default function MonitoringPage() {
  const [sensors, setSensors] = useState<SensorData[]>([
    {
      id: "CO2-001",
      name: "CO₂ Sensor A1",
      type: "emissions",
      value: 2.4,
      unit: "tCO₂/h",
      status: "online",
      lastUpdate: "2s ago",
      facility: "Plant A",
    },
    {
      id: "TEMP-001",
      name: "Temperature A1",
      type: "temperature",
      value: 68.5,
      unit: "°C",
      status: "online",
      lastUpdate: "1s ago",
      facility: "Plant A",
    },
    {
      id: "PWR-001",
      name: "Power Meter A1",
      type: "power",
      value: 145.2,
      unit: "kW",
      status: "warning",
      lastUpdate: "3s ago",
      facility: "Plant A",
    },
    {
      id: "CO2-002",
      name: "CO₂ Sensor B1",
      type: "emissions",
      value: 3.1,
      unit: "tCO₂/h",
      status: "online",
      lastUpdate: "1s ago",
      facility: "Plant B",
    },
    {
      id: "FLOW-001",
      name: "Gas Flow B1",
      type: "flow",
      value: 89.3,
      unit: "m³/h",
      status: "offline",
      lastUpdate: "2m ago",
      facility: "Plant B",
    },
    {
      id: "CO2-003",
      name: "CO₂ Sensor C1",
      type: "emissions",
      value: 4.8,
      unit: "tCO₂/h",
      status: "online",
      lastUpdate: "1s ago",
      facility: "Plant C",
    },
  ])

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: sensor.status === "online" ? Math.max(0, sensor.value + (Math.random() - 0.5) * 0.2) : sensor.value,
          lastUpdate: sensor.status === "online" ? `${Math.floor(Math.random() * 5) + 1}s ago` : sensor.lastUpdate,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "emissions":
        return <Activity className="h-4 w-4" />
      case "temperature":
        return <Thermometer className="h-4 w-4" />
      case "power":
        return <Zap className="h-4 w-4" />
      case "flow":
        return <Gauge className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="default" className="bg-green-500">
            Online
          </Badge>
        )
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Warning
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const onlineSensors = sensors.filter((s) => s.status === "online").length
  const totalSensors = sensors.length

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Real-time Monitoring</h1>
            <p className="text-sm text-muted-foreground">Live sensor data and IoT device status</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Activity className="h-3 w-3" />
            {onlineSensors}/{totalSensors} Online
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* System Status Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sensor Network</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {onlineSensors}/{totalSensors}
              </div>
              <p className="text-xs text-muted-foreground">Devices online</p>
              <Progress value={(onlineSensors / totalSensors) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">Accuracy rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Update Frequency</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.1s</div>
              <p className="text-xs text-muted-foreground">Average interval</p>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Live Emissions Data</CardTitle>
            <CardDescription>Real-time carbon emissions from all manufacturing facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <EmissionsChart />
          </CardContent>
        </Card>

        {/* Sensor Details */}
        <Card>
          <CardHeader>
            <CardTitle>IoT Sensor Network</CardTitle>
            <CardDescription>Individual sensor status and real-time readings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Sensors</TabsTrigger>
                <TabsTrigger value="emissions">Emissions</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
                <TabsTrigger value="power">Power</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sensors.map((sensor) => (
                    <Card key={sensor.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getSensorIcon(sensor.type)}
                            <CardTitle className="text-sm">{sensor.name}</CardTitle>
                          </div>
                          {getStatusIcon(sensor.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(sensor.status)}
                          <Badge variant="outline" className="text-xs">
                            {sensor.facility}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">
                            {sensor.value.toFixed(1)} {sensor.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">Last update: {sensor.lastUpdate}</div>
                          {sensor.status === "warning" && (
                            <div className="text-xs text-yellow-600 dark:text-yellow-400">⚠️ High readings detected</div>
                          )}
                          {sensor.status === "offline" && (
                            <div className="text-xs text-red-600 dark:text-red-400">🔴 Connection lost</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="emissions">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sensors
                    .filter((s) => s.type === "emissions")
                    .map((sensor) => (
                      <Card key={sensor.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getSensorIcon(sensor.type)}
                              <CardTitle className="text-sm">{sensor.name}</CardTitle>
                            </div>
                            {getStatusIcon(sensor.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {sensor.value.toFixed(1)} {sensor.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {sensor.facility} • {sensor.lastUpdate}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="environmental">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sensors
                    .filter((s) => s.type === "temperature" || s.type === "flow")
                    .map((sensor) => (
                      <Card key={sensor.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getSensorIcon(sensor.type)}
                              <CardTitle className="text-sm">{sensor.name}</CardTitle>
                            </div>
                            {getStatusIcon(sensor.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {sensor.value.toFixed(1)} {sensor.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {sensor.facility} • {sensor.lastUpdate}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="power">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sensors
                    .filter((s) => s.type === "power")
                    .map((sensor) => (
                      <Card key={sensor.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getSensorIcon(sensor.type)}
                              <CardTitle className="text-sm">{sensor.name}</CardTitle>
                            </div>
                            {getStatusIcon(sensor.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {sensor.value.toFixed(1)} {sensor.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {sensor.facility} • {sensor.lastUpdate}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
