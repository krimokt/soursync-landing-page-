'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Eye, Smartphone, MousePointerClick, LogOut, Mail, FileText } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface AnalyticsDashboardProps {
  user: User
}

export function AnalyticsDashboard({ user }: AnalyticsDashboardProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // Placeholder data - can be replaced with real GA4 data later
  const stats = {
    totalUsers: 1247,
    totalViews: 3891,
    ctaClicks: 156,
    devices: [
      { name: 'Desktop', users: 742, percentage: 59.5 },
      { name: 'Mobile', users: 398, percentage: 31.9 },
      { name: 'Tablet', users: 107, percentage: 8.6 },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/blog">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[rgb(6,182,212)] text-[rgb(6,182,212)] hover:bg-[rgb(6,182,212)]/10"
              >
                <FileText className="w-4 h-4" />
                Blog
              </Button>
            </Link>
            <Link href="/admin/waitlist">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[rgb(6,182,212)] text-[rgb(6,182,212)] hover:bg-[rgb(6,182,212)]/10"
              >
                <Mail className="w-4 h-4" />
                View Waitlist
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2 border-border hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Time Range Indicator */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing data for the last 7 days
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <Card className="border-border bg-card hover:border-[rgb(6,182,212)]/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="w-4 h-4 text-[rgb(6,182,212)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12.5% from previous week
              </p>
            </CardContent>
          </Card>

          {/* Total Views */}
          <Card className="border-border bg-card hover:border-[rgb(6,182,212)]/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
              <Eye className="w-4 h-4 text-[rgb(6,182,212)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +8.3% from previous week
              </p>
            </CardContent>
          </Card>

          {/* CTA Clicks */}
          <Card className="border-border bg-card hover:border-[rgb(6,182,212)]/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                CTA Clicks
              </CardTitle>
              <MousePointerClick className="w-4 h-4 text-[rgb(6,182,212)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.ctaClicks}</div>
              <p className="text-xs text-muted-foreground mt-1">
                4.0% conversion rate
              </p>
            </CardContent>
          </Card>

          {/* Device Overview */}
          <Card className="border-border bg-card hover:border-[rgb(6,182,212)]/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Device
              </CardTitle>
              <Smartphone className="w-4 h-4 text-[rgb(6,182,212)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">Desktop</div>
              <p className="text-xs text-muted-foreground mt-1">
                59.5% of all users
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Device Breakdown */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Device Breakdown
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              User distribution by device type
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.devices.map((device) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-24 text-sm font-medium text-foreground">
                      {device.name}
                    </div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[rgb(6,182,212)] rounded-full transition-all duration-500"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {device.users.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground min-w-[50px] text-right">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Note about placeholder data */}
        <div className="mt-8 p-4 bg-muted/20 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> These are placeholder values. 
            Integrate with Google Analytics 4 API to fetch real-time data.
          </p>
        </div>
      </main>
    </div>
  )
}

