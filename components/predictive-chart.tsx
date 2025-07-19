"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  historical: {
    label: "Historical Data",
    color: "hsl(var(--chart-1))",
  },
  predicted: {
    label: "Predicted Emissions",
    color: "hsl(var(--chart-2))",
  },
  confidence: {
    label: "Confidence Interval",
    color: "hsl(var(--chart-3))",
  },
  target: {
    label: "Target Limit",
    color: "hsl(var(--chart-4))",
  },
}

interface PredictiveChartProps {
  timeRange: string
  facility: string
}

export function PredictiveChart({ timeRange, facility }: PredictiveChartProps) {
  // Generate sample data based on props
  const generateData = () => {
    const data = []
    const now = new Date()
    const days = timeRange === "7d" ? 14 : timeRange === "30d" ? 60 : 120

    for (let i = -days / 2; i < days / 2; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() + i)

      const isHistorical = i < 0
      const baseValue = 3.2 + Math.sin(i * 0.1) * 0.8 + Math.random() * 0.4

      if (isHistorical) {
        data.push({
          date: date.toISOString().split("T")[0],
          historical: baseValue,
          predicted: null,
          confidenceUpper: null,
          confidenceLower: null,
          target: 4.0,
          isPrediction: false,
        })
      } else {
        const predicted = baseValue + i * 0.02 + Math.sin(i * 0.15) * 0.3
        const confidence = 0.3 + i * 0.01

        data.push({
          date: date.toISOString().split("T")[0],
          historical: null,
          predicted: predicted,
          confidenceUpper: predicted + confidence,
          confidenceLower: Math.max(0, predicted - confidence),
          target: 4.0,
          isPrediction: true,
        })
      }
    }

    return data
  }

  const data = generateData()

  return (
    <ChartContainer config={chartConfig} className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs fill-muted-foreground"
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          />
          <YAxis
            className="text-xs fill-muted-foreground"
            label={{ value: "tCO₂/day", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            }
          />

          {/* Confidence interval area */}
          <Area
            type="monotone"
            dataKey="confidenceUpper"
            stroke="none"
            fill="var(--color-confidence)"
            fillOpacity={0.1}
          />
          <Area
            type="monotone"
            dataKey="confidenceLower"
            stroke="none"
            fill="var(--color-confidence)"
            fillOpacity={0.1}
          />

          {/* Target line */}
          <ReferenceLine
            y={4.0}
            stroke="var(--color-target)"
            strokeDasharray="5 5"
            label={{ value: "Target", position: "topRight" }}
          />

          {/* Historical data */}
          <Line
            type="monotone"
            dataKey="historical"
            stroke="var(--color-historical)"
            strokeWidth={2}
            dot={{ r: 3 }}
            connectNulls={false}
            name="Historical"
          />

          {/* Predicted data */}
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="var(--color-predicted)"
            strokeWidth={2}
            strokeDasharray="8 4"
            dot={{ r: 3 }}
            connectNulls={false}
            name="Predicted"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
