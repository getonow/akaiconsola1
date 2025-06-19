import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Play, Pause, Edit, AlertTriangle } from 'lucide-react';
import ManualProcessRunner from './ManualProcessRunner';

const mockProcesses = [
  { id: 1, name: 'AI Opportunity Scan', description: 'Automated scanning for new opportunities', frequency: 'Daily', lastRun: '2024-01-15 06:00', nextRun: '2024-01-16 06:00', status: 'Active' },
  { id: 2, name: 'Benchmark Scan', description: 'Market benchmark data collection', frequency: 'Weekly', lastRun: '2024-01-14 12:00', nextRun: '2024-01-21 12:00', status: 'Active' },
  { id: 3, name: 'Contract Analysis', description: 'Automated contract review and analysis', frequency: 'Hourly', lastRun: '2024-01-15 14:00', nextRun: '2024-01-15 15:00', status: 'Error' },
  { id: 4, name: 'Notification Delivery', description: 'System notification processing', frequency: 'Every 15 min', lastRun: '2024-01-15 14:45', nextRun: '2024-01-15 15:00', status: 'Paused' },
];

const ScheduledProcesses: React.FC = () => {
  const getStatusBadge = (status: string) => {
    const variants = {
      Active: 'bg-green-100 text-green-800',
      Paused: 'bg-yellow-100 text-yellow-800',
      Error: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Error') {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Scheduled Processes</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Process
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Processes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Paused Processes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed Processes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Process Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProcesses.map((process) => (
              <TableRow key={process.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(process.status)}
                    {process.name}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{process.description}</TableCell>
                <TableCell>{process.frequency}</TableCell>
                <TableCell>{process.lastRun}</TableCell>
                <TableCell>{process.nextRun}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(process.status)}>{process.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" title="Run Now">
                      <Play className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" title="Pause/Resume">
                      <Pause className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" title="Edit Schedule">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <ManualProcessRunner />
    </div>
  );
};

export default ScheduledProcesses;