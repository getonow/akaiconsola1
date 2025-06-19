import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Download, Settings, Mail, Database } from 'lucide-react';

const PlatformSettings: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Platform Settings</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Audit Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Platform Config
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="AkunAI Enterprise" />
            </div>
            <div>
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@akunai.com" />
            </div>
            <div>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <Switch id="maintenance-mode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="user-registration">Allow User Registration</Label>
              <Switch id="user-registration" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smtp-server">SMTP Server</Label>
              <Input id="smtp-server" defaultValue="smtp.company.com" />
            </div>
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" type="number" defaultValue="587" />
            </div>
            <div>
              <Label htmlFor="from-email">From Email</Label>
              <Input id="from-email" type="email" defaultValue="noreply@akunai.com" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Enable Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div>
              <Label htmlFor="email-template">Welcome Email Template</Label>
              <Textarea 
                id="email-template" 
                placeholder="Enter email template..." 
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              API Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">Market Data API</div>
                  <div className="text-sm text-gray-500">https://api.marketdata.com</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">Contract Analysis API</div>
                  <div className="text-sm text-gray-500">https://api.contracts.com</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-600">Disconnected</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Add New Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <Switch id="login-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts">System Alerts</Label>
              <Switch id="system-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="process-alerts">Process Failure Alerts</Label>
              <Switch id="process-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-reports">Weekly Reports</Label>
              <Switch id="weekly-reports" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
      </div>
    </div>
  );
};

export default PlatformSettings;