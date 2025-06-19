import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Calendar, Filter } from 'lucide-react';

const mockLogs = [
  { id: 1, timestamp: '2024-01-15 14:30:25', eventType: 'Login', user: 'john@company.com', description: 'User logged in successfully' },
  { id: 2, timestamp: '2024-01-15 14:25:10', eventType: 'Role Change', user: 'admin@company.com', description: 'Changed user jane@company.com role from User to Analyst' },
  { id: 3, timestamp: '2024-01-15 14:00:00', eventType: 'Job Run', user: 'System', description: 'Contract Analysis process completed successfully' },
  { id: 4, timestamp: '2024-01-15 13:45:33', eventType: 'Error', user: 'System', description: 'AI Opportunity Scan failed - API timeout' },
  { id: 5, timestamp: '2024-01-15 13:30:15', eventType: 'Login', user: 'jane@company.com', description: 'User logged in successfully' },
];

const SystemLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  const getEventTypeBadge = (eventType: string) => {
    const variants = {
      Login: 'bg-blue-100 text-blue-800',
      'Role Change': 'bg-purple-100 text-purple-800',
      'Job Run': 'bg-green-100 text-green-800',
      Error: 'bg-red-100 text-red-800'
    };
    return variants[eventType as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">System Logs</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="role-change">Role Change</SelectItem>
            <SelectItem value="job-run">Job Run</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="john">john@company.com</SelectItem>
            <SelectItem value="jane">jane@company.com</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                <TableCell>
                  <Badge className={getEventTypeBadge(log.eventType)}>{log.eventType}</Badge>
                </TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell className="max-w-md">{log.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SystemLogs;