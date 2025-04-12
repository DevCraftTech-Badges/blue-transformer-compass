
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Check, X } from 'lucide-react';

// Mock data for demonstration purposes
const mockUsers = [
  { 
    id: 1, 
    login: 'admin', 
    firstname: 'Admin', 
    lastname: 'User',
    privileges: [true, true, true, true, true, true, true, true, true]
  },
  { 
    id: 2, 
    login: 'engineer', 
    firstname: 'วิศวกร', 
    lastname: 'ทดสอบ',
    privileges: [true, true, true, true, false, false, false, false, false]
  },
  { 
    id: 3, 
    login: 'operator', 
    firstname: 'ผู้ใช้งาน', 
    lastname: 'ทั่วไป',
    privileges: [true, true, false, false, false, false, false, false, false]
  },
];

export const UserTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Login</TableHead>
          <TableHead className="whitespace-nowrap">Firstname</TableHead>
          <TableHead className="whitespace-nowrap">Lastname</TableHead>
          <TableHead className="text-center">1</TableHead>
          <TableHead className="text-center">2</TableHead>
          <TableHead className="text-center">3</TableHead>
          <TableHead className="text-center">4</TableHead>
          <TableHead className="text-center">5</TableHead>
          <TableHead className="text-center">6</TableHead>
          <TableHead className="text-center">7</TableHead>
          <TableHead className="text-center">8</TableHead>
          <TableHead className="text-center">9</TableHead>
          <TableHead className="text-center whitespace-nowrap">จัดการ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.login}</TableCell>
            <TableCell>{user.firstname}</TableCell>
            <TableCell>{user.lastname}</TableCell>
            
            {/* Privilege columns 1-9 */}
            {user.privileges.map((hasPrivilege, index) => (
              <TableCell key={index} className="text-center">
                {hasPrivilege ? 
                  <Check size={18} className="mx-auto text-green-500" /> : 
                  <X size={18} className="mx-auto text-red-500" />
                }
              </TableCell>
            ))}
            
            {/* Action buttons */}
            <TableCell className="whitespace-nowrap">
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Pencil size={16} className="text-blue-600" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Trash2 size={16} className="text-red-600" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
