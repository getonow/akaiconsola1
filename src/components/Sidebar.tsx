import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, Shield, Clock, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

const menuItems = [
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'roles', label: 'Role & Access Control', icon: Shield },
  { id: 'processes', label: 'Scheduled Processes', icon: Clock },
  { id: 'logs', label: 'System Logs', icon: FileText },
  { id: 'settings', label: 'Platform Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, className }) => {
  return (
    <div className={cn('w-64 bg-gradient-to-b from-blue-50 to-blue-100 border-r border-blue-200 h-full shadow-lg', className)}>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/6824f1e74792863c7aa3b60f_1750292479197_1d4cb453.png" 
              alt="AkunAI Logo" 
              className="h-12 w-auto mb-3"
            />
            <h1 className="text-xl font-bold text-blue-900 text-center">
              Admin Console
            </h1>
          </div>
          <p className="text-blue-600 text-sm text-center">Enterprise Management</p>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  'w-full justify-start text-left transition-all duration-200 text-blue-800 hover:bg-blue-200/50',
                  activeSection === item.id && 'bg-blue-200 text-blue-900 shadow-md font-medium'
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;