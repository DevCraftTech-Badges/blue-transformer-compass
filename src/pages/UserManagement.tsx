
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { UserTable } from '@/components/userManagement/UserTable';
import { AddUserModal } from '@/components/userManagement/AddUserModal';
import { Plus } from 'lucide-react';

const UserManagementPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold">การจัดการผู้ใช้งานในระบบ</h1>
          <Button 
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2" size={18} />
            เพิ่มผู้ใช้งานในระบบ
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <UserTable />
          </div>
        </div>

        <AddUserModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      </div>
    </Layout>
  );
};

export default UserManagementPage;
