"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  plantA: {
    label: "Plant A - Assembly",
    color: "hsl(var(--chart-1))",
  },
  plantB: {
    label: "Plant B - Packaging",
    color: "hsl(var(--chart-2))",
  },
  plantC: {
    label: "Plant C - Processing",
    color: "hsl(var(--chart-3))",
  },
  budget: {
    label: "Daily Budget",
    color: "hsl(var(--chart-4))",
  },
}

export function EmissionsChart() {
  const [data, setData] = useState([
    { time: "00:00", plantA: 2.1, plantB: 2.8, plantC: 3.2, budget: 4.0 },
    { time: "04:00", plantA: 1.8, plantB: 2.5, plantC: 2.9, budget: 4.0 },
    { time: "08:00", plantA: 3.2, plantB: 3.8, plantC: 4.1, budget: 4.0 },
    { time: "12:00", plantA: 2.9, plantB: 3.5, plantC: 3.8, budget: 4.0 },
    { time: "16:00", plantA: 3.1, plantB: 3.2, plantC: 3.9, budget: 4.0 },
    { time: "20:00", plantA: 2.4, plantB: 2.9, plantC: 3.4, budget: 4.0 },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData]
        const lastEntry = newData[newData.length - 1]
        const currentTime = new Date()
        const timeString = currentTime.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })

        const newEntry = {
          time: timeString,
          plantA: Math.max(0, lastEntry.plantA + (Math.random() - 0.5) * 0.3),
          plantB: Math.max(0, lastEntry.plantB + (Math.random() - 0.5) * 0.3),
          plantC: Math.max(0, lastEntry.plantC + (Math.random() - 0.5) * 0.3),
          budget: 4.0,
        }

        if (newData.length >= 20) {
          newData.shift()
        }
        newData.push(newEntry)

        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ChartContainer config={chartConfig} className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs fill-muted-foreground" />
          <YAxis
            className="text-xs fill-muted-foreground"
            label={{ value: "tCO₂/hour", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="plantA"
            stroke="var(--color-plantA)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Plant A"
          />
          <Line
            type="monotone"
            dataKey="plantB"
            stroke="var(--color-plantB)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Plant B"
          />
          <Line
            type="monotone"
            dataKey="plantC"
            stroke="var(--color-plantC)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Plant C"
          />
          <Line
            type="monotone"
            dataKey="budget"
            stroke="var(--color-budget)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Budget Limit"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
