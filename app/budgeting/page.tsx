"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Calculator, Target, AlertTriangle, TrendingUp, Bell, Mail, Smartphone } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Budget {
  id: string
  name: string
  facility: string
  period: string
  limit: number
  current: number
  unit: string
  status: "normal" | "warning" | "critical"
  alerts: boolean
}

export default function BudgetingPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "1",
      name: "Daily Plant A Budget",
      facility: "Plant A - Assembly",
      period: "Daily",
      limit: 12.0,
      current: 8.7,
      unit: "tCO₂",
      status: "normal",
      alerts: true,
    },
    {
      id: "2",
      name: "Weekly Plant B Budget",
      facility: "Plant B - Packaging",
      period: "Weekly",
      limit: 75.0,
      current: 68.2,
      unit: "tCO₂",
      status: "warning",
      alerts: true,
    },
    {
      id: "3",
      name: "Monthly Plant C Budget",
      facility: "Plant C - Processing",
      period: "Monthly",
      limit: 300.0,
      current: 312.5,
      unit: "tCO₂",
      status: "critical",
      alerts: true,
    },
  ])

  const [newBudget, setNewBudget] = useState({
    name: "",
    facility: "",
    period: "",
    limit: "",
    alerts: true,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return (
          <Badge variant="default" className="bg-green-500">
            Normal
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Warning
          </Badge>
        )
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getUtilizationPercentage = (current: number, limit: number) => {
    return (current / limit) * 100
  }

  const addBudget = () => {
    if (newBudget.name && newBudget.facility && newBudget.period && newBudget.limit) {
      const budget: Budget = {
        id: Date.now().toString(),
        name: newBudget.name,
        facility: newBudget.facility,
        period: newBudget.period,
        limit: Number.parseFloat(newBudget.limit),
        current: 0,
        unit: "tCO₂",
        status: "normal",
        alerts: newBudget.alerts,
      }
      setBudgets([...budgets, budget])
      setNewBudget({ name: "", facility: "", period: "", limit: "", alerts: true })
    }
  }

  const toggleAlerts = (id: string) => {
    setBudgets(budgets.map((budget) => (budget.id === id ? { ...budget, alerts: !budget.alerts } : budget)))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Carbon Budgeting</h1>
            <p className="text-sm text-muted-foreground">Set limits and track emission budgets</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Calculator className="h-3 w-3" />
            {budgets.length} Active Budgets
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Budget Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budgets</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{budgets.length}</div>
              <p className="text-xs text-muted-foreground">Active budget limits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts Active</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{budgets.filter((b) => b.status !== "normal").length}</div>
              <p className="text-xs text-muted-foreground">Threshold breaches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Utilization</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  budgets.reduce((acc, b) => acc + getUtilizationPercentage(b.current, b.limit), 0) / budgets.length
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">Of budget limits</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Budget Overview</TabsTrigger>
            <TabsTrigger value="create">Create Budget</TabsTrigger>
            <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              {budgets.map((budget) => {
                const utilization = getUtilizationPercentage(budget.current, budget.limit)

                return (
                  <Card key={budget.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{budget.name}</CardTitle>
                          <CardDescription>
                            {budget.facility} • {budget.period}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(budget.status)}
                          {budget.alerts && <Bell className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">
                            {budget.current.toFixed(1)} / {budget.limit.toFixed(1)} {budget.unit}
                          </div>
                          <div className="text-sm text-muted-foreground">{utilization.toFixed(1)}% utilized</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${getStatusColor(budget.status)}`}>
                            {budget.status === "critical"
                              ? "EXCEEDED"
                              : budget.status === "warning"
                                ? "WARNING"
                                : "NORMAL"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {(budget.limit - budget.current).toFixed(1)} {budget.unit} remaining
                          </div>
                        </div>
                      </div>

                      <Progress value={Math.min(utilization, 100)} className="h-3" />

                      <div className="flex items-center justify-between text-sm">
                        <span>Budget Period: {budget.period}</span>
                        <div className="flex items-center gap-2">
                          <span>Alerts:</span>
                          <Switch checked={budget.alerts} onCheckedChange={() => toggleAlerts(budget.id)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Budget</CardTitle>
                <CardDescription>Set emission limits and thresholds for facilities or departments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget-name">Budget Name</Label>
                    <Input
                      id="budget-name"
                      placeholder="e.g., Daily Plant A Budget"
                      value={newBudget.name}
                      onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facility">Facility</Label>
                    <Select
                      value={newBudget.facility}
                      onValueChange={(value) => setNewBudget({ ...newBudget, facility: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select facility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plant-a">Plant A - Assembly</SelectItem>
                        <SelectItem value="plant-b">Plant B - Packaging</SelectItem>
                        <SelectItem value="plant-c">Plant C - Processing</SelectItem>
                        <SelectItem value="all">All Facilities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="period">Budget Period</Label>
                    <Select
                      value={newBudget.period}
                      onValueChange={(value) => setNewBudget({ ...newBudget, period: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="limit">Emission Limit (tCO₂)</Label>
                    <Input
                      id="limit"
                      type="number"
                      placeholder="e.g., 12.0"
                      value={newBudget.limit}
                      onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable-alerts"
                    checked={newBudget.alerts}
                    onCheckedChange={(checked) => setNewBudget({ ...newBudget, alerts: checked })}
                  />
                  <Label htmlFor="enable-alerts">Enable threshold alerts</Label>
                </div>

                <Button onClick={addBudget} className="w-full">
                  Create Budget
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>Configure notification settings for budget threshold alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-muted-foreground">Send alerts via email</div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">SMS Notifications</div>
                          <div className="text-sm text-muted-foreground">Send alerts via SMS</div>
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-muted-foreground">Browser push notifications</div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alert Thresholds</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="warning-threshold">Warning Threshold (%)</Label>
                      <Input id="warning-threshold" type="number" defaultValue="80" placeholder="80" />
                      <p className="text-xs text-muted-foreground">
                        Alert when budget utilization reaches this percentage
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="critical-threshold">Critical Threshold (%)</Label>
                      <Input id="critical-threshold" type="number" defaultValue="95" placeholder="95" />
                      <p className="text-xs text-muted-foreground">
                        Critical alert when budget utilization reaches this percentage
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alert Recipients</h3>

                  <div className="space-y-2">
                    <Label htmlFor="recipients">Email Recipients</Label>
                    <Textarea
                      id="recipients"
                      placeholder="manager@company.com, supervisor@company.com"
                      defaultValue="john.doe@company.com, jane.smith@company.com"
                    />
                    <p className="text-xs text-muted-foreground">Comma-separated list of email addresses</p>
                  </div>
                </div>

                <Button className="w-full">Save Alert Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
