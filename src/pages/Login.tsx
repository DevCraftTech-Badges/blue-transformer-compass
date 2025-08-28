import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Page-local design tokens
  const styleVars: React.CSSProperties = {
  ['--bg-overlay' as any]: 'rgba(20, 65, 148, 0.78)',
  ['--brand-blue' as any]: '#1E3A8A',
  ['--brand-yellow' as any]: '#FFD200',
  ['--card-w' as any]: '400px',
  ['--card-h' as any]: '451px',
  ['--card-radius' as any]: '18px',
  ['--card-pad' as any]: '28px',
  ['--btn-w' as any]: '200px',
  ['--btn-h' as any]: '40px',
  ['--shadow' as any]: '0 22px 60px rgba(2,6,23,.35)',
  ['--input-bg' as any]: '#E9F0FF',
  ['--input-border' as any]: '#D7E1FF',
  };

  useEffect(() => {
    // Redirect if already logged in
    const logged = localStorage.getItem('employeeNo');
    if (logged) navigate('/');
    // Seed a default credential for username (keeps compatibility with existing change-code page)
    if (!localStorage.getItem('employeeNoCredential')) {
      localStorage.setItem('employeeNoCredential', '12345678');
    }
    // Prefill remembered code into password field
    const remembered = localStorage.getItem('employeeNoRemember');
    if (remembered) {
      setPassword(remembered);
      setRemember(true);
    }
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const p = password.trim();
    if (!p) {
      setError('กรุณากรอกรหัสผ่าน');
      return;
    }

    try {
      setLoading(true);
      // Validate password against stored credential (password acts as the code)
      const credential = localStorage.getItem('employeeNoCredential') || '12345678';
      if (p === credential) {
        localStorage.setItem('employeeNo', p);
        if (remember) {
          localStorage.setItem('employeeNoRemember', p);
        } else {
          localStorage.removeItem('employeeNoRemember');
        }
        navigate('/');
      } else {
        setError('รหัสผ่านไม่ถูกต้อง');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative login-root" style={styleVars}>
      {/* Scoped styles for this page */}
      <style>{`
        /* LINE Seed Sans TH font faces (place files under /public/fonts) */
        @font-face {
          font-family: 'LINE Seed Sans TH';
          src: url('/fonts/LINESeedSansTH-Regular.woff2') format('woff2'),
               url('/fonts/LINESeedSansTH-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'LINE Seed Sans TH';
          src: url('/fonts/LINESeedSansTH-Bold.woff2') format('woff2'),
               url('/fonts/LINESeedSansTH-Bold.woff') format('woff');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'LINE Seed Sans TH';
          src: url('/fonts/LINESeedSansTH-ExtraBold.woff2') format('woff2'),
               url('/fonts/LINESeedSansTH-ExtraBold.woff') format('woff');
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }
        .login-root, .login-root * {
          font-family: 'LINE Seed Sans TH', 'Noto Sans Thai', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        * { box-sizing: border-box; }
  .bg { min-height:100dvh; }
  .bg-img { position:fixed; inset:0; background: url('/Bg_login.png') center/cover no-repeat; filter: blur(8px); transform: scale(1.04); z-index: -1; }
  .overlay { position:fixed; inset:0; background:var(--bg-overlay); z-index:0; }
        .center { position:relative; z-index:1; min-height:100dvh; display:grid; place-items:center; padding:24px; }
  .card{ width:min(92vw, var(--card-w)); height:var(--card-h); background:rgba(255,255,255,.96); border-radius:var(--card-radius); padding:var(--card-pad); border:1px solid rgba(0,0,0,.06); box-shadow:var(--shadow); display:flex; flex-direction:column; justify-content:center; align-items:center; overflow:auto; }
  .brand{ text-align:center; margin-bottom:18px; margin-top:-16px; }
        .brand img{ height:44px; width:auto; margin:0 auto 8px; display:block; }
        .brand .title{ margin:0; color:var(--brand-blue); font-size:24px; font-weight:800; }
        .brand .subtitle{ margin:6px 0 0; color:var(--brand-blue); font-size:18px; font-weight:700; }
  .brand .desc{ margin:4px 0 0; color:var(--brand-blue); font-size:15px; }
  form{ display:flex; flex-direction:column; gap:16px; width:min(320px, 100%); margin:0 auto; }
  .field label{ display:block; font-size:14px; color:#154295; font-weight:700; margin-bottom:8px; }
        .input{ width:100%; padding:12px 14px; border-radius:14px; border:1px solid var(--input-border); background:var(--input-bg); outline:none; font-size:14px; color:#0f172a; }
        .input:focus{ border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.25); }
  .check{ display:flex; align-items:center; justify-content:center; gap:10px; font-size:14px; color:#154295; }
        .check input{
          width:14px; height:14px;
          -webkit-appearance:none; appearance:none;
          border:1px solid #154295; border-radius:6px;
          background:#fff; display:inline-block;
          position:relative; cursor:pointer;
        }
  .check input:checked{ background:#154295; border-color:#154295; }
        .check input:focus{ outline:none; box-shadow:0 0 0 3px rgba(21,66,149,.25); }
        .check input::before{
          content:""; position:absolute; left:50%; top:50%;
          width:8px; height:5px;
          border-left:2px solid #FFCC00; border-bottom:2px solid #FFCC00;
          transform: translate(-50%, -52%) rotate(-45deg) scale(0);
          transform-origin:center; transition:transform 120ms ease-in-out;
        }
        .check input:checked::before{ transform: translate(-50%, -52%) rotate(-45deg) scale(1); }
  .btn{ width:var(--btn-w); height:var(--btn-h); align-self:center; border:0; border-radius:16px; background:var(--brand-yellow); color:var(--brand-blue); font-weight:800; font-size:15px; letter-spacing:.2px; cursor:pointer; box-shadow:0 10px 30px rgba(255,210,0,.35); }
        .btn:hover{ filter:brightness(1.03); }
        .btn:focus{ outline:3px solid #3b82f6; outline-offset:2px; }
        .btn:disabled{ opacity:.75; cursor:not-allowed; }
      `}</style>

      <div className="bg">
        <div className="bg-img" aria-hidden="true" />
        <div className="overlay" aria-hidden="true" />

        <main className="center">
          <section className="card">
            <header className="brand">
              <img
                src="/LogoEGAT-TH 1.png"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                alt="โลโก้ กฟผ."
              />
              <p className="subtitle">เข้าสู่ระบบ</p>
              <p className="desc">การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย</p>
            </header>

            <form onSubmit={onSubmit} noValidate>
              <div className="field">
                <label>Password</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="กรอกรหัสผ่าน"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-xs text-red-600">{error}</p>
              )}

              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                จำรหัสผ่าน
              </label>

              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
