"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, X } from "lucide-react"

interface Alert {
  id: string
  type: "warning" | "critical" | "info"
  title: string
  description: string
  timestamp: string
  facility: string
  acknowledged: boolean
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      title: "Threshold Approaching",
      description: "Plant B emissions at 85% of daily budget",
      timestamp: "2 min ago",
      facility: "Plant B",
      acknowledged: false,
    },
    {
      id: "2",
      type: "critical",
      title: "Budget Exceeded",
      description: "Plant C has exceeded hourly emission limit",
      timestamp: "5 min ago",
      facility: "Plant C",
      acknowledged: false,
    },
    {
      id: "3",
      type: "info",
      title: "Optimization Complete",
      description: "Energy efficiency improved by 3.2%",
      timestamp: "15 min ago",
      facility: "Plant A",
      acknowledged: true,
    },
  ])

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return <Badge variant="secondary">Warning</Badge>
      default:
        return <Badge variant="default">Info</Badge>
    }
  }

  return (
    <div className="space-y-3">
      {alerts.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">No active alerts</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`
              rounded-lg border p-3 space-y-2 transition-all
              ${alert.acknowledged ? "opacity-60 border-muted" : "border-border"}
            `}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {getAlertIcon(alert.type)}
                <span className="text-sm font-medium">{alert.title}</span>
              </div>
              <div className="flex items-center gap-1">
                {getAlertBadge(alert.type)}
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => dismissAlert(alert.id)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">{alert.description}</p>

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {alert.facility} • {alert.timestamp}
              </div>
              {!alert.acknowledged && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs px-2 bg-transparent"
                  onClick={() => acknowledgeAlert(alert.id)}
                >
                  Acknowledge
                </Button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
