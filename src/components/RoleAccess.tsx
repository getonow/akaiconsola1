import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Users } from 'lucide-react';

const mockRoles = [
  { id: 1, name: 'Admin', userCount: 5, permissions: { negotiation: ['read', 'write'], benchmark: ['read', 'write'], market: ['read', 'write'], contracts: ['read', 'write'], admin: ['read', 'write'] } },
  { id: 2, name: 'Analyst', userCount: 12, permissions: { negotiation: ['read'], benchmark: ['read', 'write'], market: ['read', 'write'], contracts: ['read'], admin: [] } },
  { id: 3, name: 'Procurement User', userCount: 8, permissions: { negotiation: ['read', 'write'], benchmark: ['read'], market: ['read'], contracts: ['read', 'write'], admin: [] } },
];

const modules = ['Negotiation', 'Benchmark', 'Market', 'Contracts', 'Admin Console'];
const permissions = ['Read', 'Write'];

const RoleAccess: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Role & Access Control</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Roles</h3>
          <div className="space-y-3">
            {mockRoles.map((role) => (
              <Card 
                key={role.id} 
                className={`cursor-pointer transition-all ${selectedRole === role.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{role.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{role.userCount} users</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Permissions Matrix</h3>
          {selectedRole ? (
            <Card>
              <CardHeader>
                <CardTitle>{mockRoles.find(r => r.id === selectedRole)?.name} Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module} className="border-b pb-3">
                      <h5 className="font-medium mb-2">{module}</h5>
                      <div className="flex gap-4">
                        {permissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox id={`${module}-${permission}`} />
                            <label htmlFor={`${module}-${permission}`} className="text-sm">
                              {permission}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                Select a role to view and edit permissions
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleAccess;