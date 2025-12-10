"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'motion/react';
import { Mail, Calendar, Tag, Download, Rocket, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface WaitlistEntry {
  id: string;
  email: string;
  source: string;
  plan_interest: string | null;
  created_at: string;
}

export function WaitlistTable() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingLaunchEmails, setSendingLaunchEmails] = useState(false);
  const [launchEmailResult, setLaunchEmailResult] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load waitlist');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Source', 'Plan Interest', 'Joined Date'];
    const rows = entries.map(entry => [
      entry.email,
      entry.source,
      entry.plan_interest || 'N/A',
      format(new Date(entry.created_at), 'yyyy-MM-dd HH:mm:ss'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const sendLaunchEmails = async () => {
    if (!confirm(`Are you sure you want to send launch emails to all ${entries.length} waitlist members?`)) {
      return;
    }

    setSendingLaunchEmails(true);
    setLaunchEmailResult(null);
    setError(null);

    try {
      const response = await fetch('/api/waitlist/launch-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send launch emails');
      }

      setLaunchEmailResult(
        `✅ Successfully sent ${data.successful} emails. ${data.failed > 0 ? `${data.failed} failed.` : ''}`
      );
    } catch (err: any) {
      setError(err.message || 'Failed to send launch emails');
    } finally {
      setSendingLaunchEmails(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="w-8 h-8 border-4 border-[rgb(6,182,212)]/30 border-t-[rgb(6,182,212)] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading waitlist...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="p-12 text-center">
          <p className="text-red-400">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const stats = {
    total: entries.length,
    bySource: entries.reduce((acc, entry) => {
      acc[entry.source] = (acc[entry.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byPlan: entries.reduce((acc, entry) => {
      const plan = entry.plan_interest || 'No preference';
      acc[plan] = (acc[plan] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Entries</CardTitle>
            <Mail className="h-4 w-4 text-[rgb(6,182,212)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Source</CardTitle>
            <Tag className="h-4 w-4 text-[rgb(6,182,212)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground capitalize">
              {Object.entries(stats.bySource).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Popular Plan</CardTitle>
            <Tag className="h-4 w-4 text-[rgb(6,182,212)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground capitalize">
              {Object.entries(stats.byPlan).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4">
        <Button
          onClick={sendLaunchEmails}
          disabled={sendingLaunchEmails || entries.length === 0}
          className="bg-gradient-to-r from-[rgb(6,182,212)] to-blue-600 hover:from-[rgb(6,182,212)]/90 hover:to-blue-600/90 text-white border-0"
        >
          {sendingLaunchEmails ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Send Launch Emails ({entries.length})
            </>
          )}
        </Button>
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="text-[rgb(6,182,212)] border-[rgb(6,182,212)] hover:bg-[rgb(6,182,212)]/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Launch Email Result */}
      {launchEmailResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
        >
          {launchEmailResult}
        </motion.div>
      )}

      {/* Table */}
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Source</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Plan Interest</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-sm text-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[rgb(6,182,212)]" />
                        {entry.email}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-foreground">
                      <span className="px-2 py-1 rounded-full bg-[rgb(6,182,212)]/10 text-[rgb(6,182,212)] text-xs font-medium capitalize">
                        {entry.source}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-foreground capitalize">
                      {entry.plan_interest || (
                        <span className="text-muted-foreground italic">No preference</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(entry.created_at), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {entries.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No waitlist entries yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


