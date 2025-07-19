"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Brain, Calendar, Target } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PredictiveChart } from "@/components/predictive-chart"
import { RecommendationsPanel } from "@/components/recommendations-panel"
import { ForecastMetrics } from "@/components/forecast-metrics"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [facility, setFacility] = useState("all")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Predictive Analytics</h1>
            <p className="text-sm text-muted-foreground">AI-powered forecasting and optimization recommendations</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Brain className="h-3 w-3" />
            ML Models Active
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <Select value={facility} onValueChange={setFacility}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select facility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Facilities</SelectItem>
                <SelectItem value="plant-a">Plant A - Assembly</SelectItem>
                <SelectItem value="plant-b">Plant B - Packaging</SelectItem>
                <SelectItem value="plant-c">Plant C - Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="ml-auto bg-transparent">
            <Brain className="h-4 w-4 mr-2" />
            Retrain Models
          </Button>
        </div>

        {/* Forecast Metrics */}
        <ForecastMetrics />

        <Tabs defaultValue="forecasting" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forecasting">Emission Forecasting</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="models">Model Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="forecasting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Emission Forecast
                </CardTitle>
                <CardDescription>
                  Predictive analysis of carbon emissions based on historical data and operational patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PredictiveChart timeRange={timeRange} facility={facility} />
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Seasonal Patterns</CardTitle>
                  <CardDescription>Identified emission patterns and seasonal variations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Summer Peak</div>
                        <div className="text-sm text-muted-foreground">June - August</div>
                      </div>
                      <Badge variant="destructive">+23% emissions</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Winter Efficiency</div>
                        <div className="text-sm text-muted-foreground">December - February</div>
                      </div>
                      <Badge variant="default" className="bg-green-500">
                        -15% emissions
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Production Cycles</div>
                        <div className="text-sm text-muted-foreground">Monthly patterns</div>
                      </div>
                      <Badge variant="secondary">±8% variation</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                  <CardDescription>Probability of exceeding emission targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next 7 days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next 30 days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next quarter</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <strong>Key Risk Factors:</strong>
                      <ul className="mt-2 space-y-1 list-disc list-inside">
                        <li>Increased production demand</li>
                        <li>Equipment maintenance schedules</li>
                        <li>Seasonal energy consumption</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <RecommendationsPanel />
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Model Accuracy</CardTitle>
                  <CardDescription>Performance metrics for prediction models</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emission Forecasting</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                        </div>
                        <span className="text-sm font-medium">94.2%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Energy Optimization</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "91%" }}></div>
                        </div>
                        <span className="text-sm font-medium">91.7%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Anomaly Detection</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                        <span className="text-sm font-medium">87.3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Training Status</CardTitle>
                  <CardDescription>Model training and update information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Last Training</div>
                        <div className="text-sm text-muted-foreground">2 hours ago</div>
                      </div>
                      <Badge variant="default" className="bg-green-500">
                        Complete
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Data Points</div>
                        <div className="text-sm text-muted-foreground">Training dataset</div>
                      </div>
                      <span className="font-medium">2.4M samples</span>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Next Update</div>
                        <div className="text-sm text-muted-foreground">Scheduled</div>
                      </div>
                      <span className="font-medium">22 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feature Importance</CardTitle>
                <CardDescription>Key factors influencing emission predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Production Volume</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-sm font-medium">0.85</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Energy Consumption</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <span className="text-sm font-medium">0.78</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Equipment Efficiency</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <span className="text-sm font-medium">0.65</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ambient Temperature</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                        <span className="text-sm font-medium">0.42</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time of Day</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                        <span className="text-sm font-medium">0.28</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
