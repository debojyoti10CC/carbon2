"use client"
import { Activity, Building2, Calculator, FileText, Home, Target, TrendingUp, Zap } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const navigation = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
  },
  {
    title: "Real-time Monitoring",
    url: "/monitoring",
    icon: Activity,
    badge: "Live",
  },
  {
    title: "Carbon Budgeting",
    url: "/budgeting",
    icon: Calculator,
  },
  {
    title: "Predictive Analytics",
    url: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "Scenario Simulation",
    url: "/simulation",
    icon: Target,
  },
  {
    title: "ESG Reporting",
    url: "/reporting",
    icon: FileText,
  },
]

const facilities = [
  {
    name: "Plant A - Assembly",
    status: "normal",
    emissions: "2.4 tCO2",
  },
  {
    name: "Plant B - Packaging",
    status: "warning",
    emissions: "3.1 tCO2",
  },
  {
    name: "Plant C - Processing",
    status: "critical",
    emissions: "4.8 tCO2",
  },
]

export function AppSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          {state === "expanded" && (
            <div>
              <h1 className="text-lg font-semibold">CarbonIQ</h1>
              <p className="text-xs text-muted-foreground">Manufacturing Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state === "expanded" && (
          <SidebarGroup>
            <SidebarGroupLabel>Facilities</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                {facilities.map((facility) => (
                  <div key={facility.name} className="rounded-lg border border-border/40 p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3 w-3" />
                      <span className="text-xs font-medium truncate">{facility.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          facility.status === "normal"
                            ? "default"
                            : facility.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {facility.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{facility.emissions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground">Plant Manager</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
