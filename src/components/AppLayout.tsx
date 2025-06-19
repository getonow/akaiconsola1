import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import RoleAccess from './RoleAccess';
import ScheduledProcesses from './ScheduledProcesses';
import SystemLogs from './SystemLogs';
import PlatformSettings from './PlatformSettings';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const AppLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleAccess />;
      case 'processes':
        return <ScheduledProcesses />;
      case 'logs':
        return <SystemLogs />;
      case 'settings':
        return <PlatformSettings />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform' : 'relative'}
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={(section) => {
            setActiveSection(section);
            if (isMobile) setSidebarOpen(false);
          }} 
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        {isMobile && (
          <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 px-4 py-3 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-800 hover:bg-blue-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-lg font-semibold text-blue-900">AkunAI Admin Console</h1>
            <div className="w-8" /> {/* Spacer */}
          </div>
        )}
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto bg-white/60 backdrop-blur-sm">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;