
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Home, BarChart, Database, Settings, Upload, Star, TrendingUp, Package, User, Book, Clock, LogOut, Search, Wrench, FileText, Timer, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DropdownItem {
  title: string;
  link: string;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  link?: string;
  dropdown?: DropdownItem[];
}

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();

  const toggleDropdown = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const navItems: NavItem[] = [
    {
      title: 'Home',
      icon: <Home size={20} />,
      link: '/'
    },
    {
      title: 'รายงาน',
      icon: <BarChart size={20} />,
      dropdown: [
        { title: 'รายงานมาตรฐาน', link: '/standard-reports' },
        { title: 'รายงานข้อมูลหม้อแปลงไฟฟ้า', link: '/transformer-reports' },
        { title: 'รายงานข้อมูลความเสียหาย', link: '/damage-reports' }
      ]
    },
    {
      title: 'ข้อมูลพื้นฐานหม้อแปลง',
      icon: <Database size={20} />,
      dropdown: [
        { title: 'หม้อแปลงไฟฟ้า', link: '#' },
        { title: 'การย้ายหม้อแปลง', link: '#' },
        { title: 'ความผิดปกติหม้อแปลง', link: '#' }
      ]
    },
    {
      title: 'ข้อมูลบำรุงรักษาหม้อแปลง',
      icon: <Wrench size={20} />,
      dropdown: [
        { title: 'ค้นหาข้อมูลบำรุงรักษาหม้อแปลง', link: '#' },
        { title: 'Visual Inspection', link: '#' },
        { title: 'ผลทดสอบน้ำมัน', link: '#' },
        { title: 'ผลทดสอบทางไฟฟ้า', link: '/electrical-test-results' },
        { title: 'Core Insulation Resistance', link: '/core-insulation-resistance' },
        { title: 'บำรุงรักษา OLTC', link: '#' },
        { title: 'ดูข้อมูลผลการทดสอบทั้งหมด', link: '#' },
        { title: 'ตรวจสอบสภาพหม้อแปลงไฟฟ้า', link: '#' }
      ]
    },
    {
      title: 'ค่าประเมินอายุ',
      icon: <Timer size={20} />,
      dropdown: [
        { title: 'DP-Limit', link: '/dp-limit' }
      ]
    },
    {
      title: 'Upload ข้อมูล',
      icon: <Upload size={20} />,
      dropdown: [
        { title: 'การทดสอบทางน้ำมัน', link: '/oil-test-upload' },
        { title: 'การทดสอบทางไฟฟ้า', link: '/electrical-test-upload' },
        { title: 'Activate ผลการทดสอบ', link: '/activate-test-results' }
      ]
    },
    {
      title: 'ความสำคัญของหม้อแปลง',
      icon: <Star size={20} />,
      dropdown: [
        { title: 'เพิ่มรายการ', link: '#' },
        { title: 'ค้นหาและแก้ไข', link: '#' }
      ]
    },
    {
      title: 'การวิเคราะห์ทางเศรษฐศาสตร์',
      icon: <TrendingUp size={20} />,
      dropdown: [
        { title: 'Factor Setting', link: '#' },
        { title: 'ราคาและ Loss ของหม้อแ��ลง', link: '#' },
        { title: 'ข้อมูลที่จำเป็นในการพิจารณา', link: '#' }
      ]
    },
    {
      title: 'Inventory Control',
      icon: <Package size={20} />,
      dropdown: [
        { title: 'น้ำมันหม้อแปลง', link: '#' },
        { title: 'คลังรายการน้ำมัน', link: '#' },
        { title: 'รายการเบิกจ่าย', link: '#' },
        { title: 'รายการสั่งซื้อ/รับน้ำมัน', link: '#' },
        { title: 'รายการค่าใช้จ่าย', link: '#' },
        { title: 'ผลการคำนวน', link: '#' },
        { title: 'ระยะเวลาได้รับน้ำมัน', link: '#' },
        { title: 'Bushing', link: '#' },
        { title: 'Arrester', link: '#' },
        { title: 'OLCT', link: '#' }
      ]
    },
    {
      title: 'การจัดการ',
      icon: <Settings size={20} />,
      dropdown: [
        { title: 'เปลี่ยนรหัสผ่าน', link: '/change-password' },
        { title: 'การจัดการผู้ใช้งาน', link: '/user-management' },
        { title: 'กำหนดข้อมูลพื้นฐานหม้อแปลง', link: '/transformer-config-management' },
        { title: 'กำหนดข้อมูลความสำคัญหม้อแปลง', link: '/transformer-importance-config' },
        { title: 'กำหนดข้อมูลการทดสอบ', link: '#' },
        { title: 'หัวข้อ Visual Inspection', link: '/visual-inspection-topics' },
        { title: 'เกณฑ์ Visual Inspection', link: '/visual-inspection-criteria' },
        { title: 'คะแนน %HI', link: '/score-percentage-hi' },
        { title: 'คะแนน %Factor', link: '/score-percentage-factor' },
        { title: 'Weight อุปกรณ์ย่อย', link: '/subequipment-weight' },
        { title: 'Score และ Weight การทดสอบ', link: '/score-weight-testing' },
        { title: 'Weight อุปกรณ์หลัก', link: '/main-equipment-weight' }
      ]
    }
  ];

  const bottomNavItems: NavItem[] = [
    {
      title: 'คู่มือการใช้งาน',
      icon: <Book size={20} />,
      link: '#'
    },
    {
      title: 'ประวัติการลงข้อมูลผลทดสอบ',
      icon: <Clock size={20} />,
      link: '#'
    },
    {
      title: 'ออกจากระบบ',
      icon: <LogOut size={20} />,
      link: '#'
    }
  ];

  const isActiveLink = (link: string) => {
    return location.pathname === link;
  };

  const isActiveDropdown = (items: DropdownItem[]) => {
    return items.some(item => isActiveLink(item.link));
  };

  return (
    <aside 
      className={`bg-sidebar h-screen overflow-y-auto transition-all duration-300 ${
        open ? 'w-72' : 'w-0 sm:w-20'
      } flex flex-col shadow-lg`}
    >
      <div className="p-4">
        <div className={`flex items-center ${open ? 'justify-start' : 'justify-center'}`}>
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
            <FileText className="text-transformer-primary" size={24} />
          </div>
          {open && (
            <h1 className="ml-3 text-white font-bold text-lg">PowerTransformer</h1>
          )}
        </div>
      </div>

      <div className="flex-1 py-2">
        <div className="space-y-1 px-3">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.dropdown ? (
                <div>
                  <div 
                    className={`sidebar-nav-item ${
                      isActiveDropdown(item.dropdown) ? 'bg-white/10' : ''
                    }`}
                    onClick={() => toggleDropdown(item.title)}
                  >
                    {item.icon}
                    {open && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {expandedItems[item.title] ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </>
                    )}
                  </div>
                  {open && expandedItems[item.title] && (
                    <div className="sidebar-nav-dropdown">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link 
                          to={dropdownItem.link} 
                          key={dropdownIndex}
                          className={`dropdown-item ${
                            isActiveLink(dropdownItem.link) ? 'bg-white/10 text-white' : ''
                          }`}
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to={item.link || '#'} 
                  className={`sidebar-nav-item ${
                    isActiveLink(item.link || '') ? 'bg-white/10' : ''
                  }`}
                >
                  {item.icon}
                  {open && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto py-2 border-t border-sidebar-border/30">
        <div className="space-y-1 px-3">
          {bottomNavItems.map((item, index) => (
            <Link 
              to={item.link || '#'} 
              key={index}
              className={`sidebar-nav-item ${
                isActiveLink(item.link || '') ? 'bg-white/10' : ''
              }`}
            >
              {item.icon}
              {open && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
