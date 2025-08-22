import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const VALID_EMPLOYEE_CODE = '12345678';
// เปลี่ยน path นี้ให้ชี้ไปยังไฟล์โลโก้จริงในโฟลเดอร์ public (วางไฟล์เช่น public/logo.png แล้วแก้เป็น '/logo.png')
const LOGO_SRC = '/Login.png';

const Login: React.FC = () => {
  const [employeeNo, setEmployeeNo] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const logged = localStorage.getItem('employeeNo');
    if(logged) navigate('/');
    if(!localStorage.getItem('employeeNoCredential')) {
      localStorage.setItem('employeeNoCredential', VALID_EMPLOYEE_CODE);
    }
  },[navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if(!employeeNo.trim()) { setError('กรุณากรอกรหัสพนักงาน'); return; }
    setSubmitting(true);
    setTimeout(()=>{ // simulate async
      const credential = localStorage.getItem('employeeNoCredential') || VALID_EMPLOYEE_CODE;
      if(employeeNo.trim() === credential) {
        localStorage.setItem('employeeNo', employeeNo.trim());
        navigate('/');
      } else {
        setError('รหัสพนักงานไม่ถูกต้อง');
        setSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-[#0a3b8d] bg-[radial-gradient(circle_at_center,_#144fa8_0%,_#0a3b8d_55%,_#072f70_100%)]">
      {/* Side subtle overlays */}
      <div className="absolute inset-y-0 left-0 w-[18%] bg-[#072d6b]/70 pointer-events-none"/>
      <div className="absolute inset-y-0 right-0 w-[18%] bg-[#072d6b]/70 pointer-events-none"/>
      <div className="relative z-10 w-full max-w-[480px] px-4">
  <div className="bg-white/95 backdrop-blur-[2px] rounded-lg mx-auto px-14 pt-12 pb-10 flex flex-col items-center border border-[#d7dde6] shadow-[0_4px_14px_-2px_rgba(0,0,0,0.18),0_3px_6px_rgba(0,0,0,0.08)] w-[25vw] min-w-[480px] max-w-[600px] min-h-[25vh]">
          <div className="w-full flex items-center justify-center mb-4 select-none">
            <img
              src={LOGO_SRC}
              onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/placeholder.svg'; }}
              alt="Organization Logo"
              className="max-h-40 w-auto object-contain drop-shadow-sm"
              draggable={false}
            />
          </div>
          <h1 className="font-bold text-[20px] md:text-[22px] mb-6 select-none tracking-wide text-neutral-800">login</h1>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="employeeNo" className="text-[16px] font-semibold tracking-wide text-black">Employee No.</label>
              <Input
                id="employeeNo"
                autoFocus
                maxLength={20}
                value={employeeNo}
                onChange={e=> setEmployeeNo(e.target.value)}
                className="h-9 text-[13px] rounded-[3px] border border-black focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-black/30 focus:border-black transition-colors"/>
            </div>
            {error && <div className="text-[11px] text-red-600 font-medium">{error}</div>}
            <Button disabled={submitting} type="submit" className="w-full h-10 rounded-[3px] bg-[#0a3b8d] hover:bg-[#0a3b8d]/92 disabled:opacity-60 text-white font-semibold tracking-wide text-[16px] shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-colors">{submitting? 'กำลังตรวจสอบ...' : 'ยืนยัน'}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
