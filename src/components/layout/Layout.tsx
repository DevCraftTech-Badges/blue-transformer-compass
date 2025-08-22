
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const employeeNo = typeof window !== 'undefined' ? localStorage.getItem('employeeNo') : null;

  // Redirect to login if not authenticated (except on login page which doesn't use this layout anyway)
  useEffect(() => {
    if (!employeeNo) {
      navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeNo]);

  // Logout now handled exclusively in Sidebar bottom button.

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="header-gradient shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar} 
                className="text-white hover:bg-white/10 mr-4"
              >
                <Menu size={24} />
              </Button>
              <h1 className="text-xl text-white font-medium">Assessment Program of Power Transformers</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-white text-sm font-medium">User Admin</div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs uppercase">A</div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
