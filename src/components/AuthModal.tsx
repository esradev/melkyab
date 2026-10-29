import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  KeyRound, 
  ShieldCheck, 
  Building, 
  User, 
  ArrowRight, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithPhone, showToast } = useApp();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'consultant'>('user');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [simulatedGeneratedCode, setSimulatedGeneratedCode] = useState('۴۲۸۱');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer: any;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Clean phone number
    const cleanPhone = phone.trim().replace(/[۰-۹]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
    const phoneRegex = /^09[0-9]{9}$/;

    if (!phoneRegex.test(cleanPhone)) {
      setError('شماره موبایل وارد شده معتبر نیست. لطفاً یک شماره ۱۱ رقمی معتبر با پیش‌شماره ۰۹ وارد کنید.');
      return;
    }

    // Generate random 4 digit code
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedGeneratedCode(toPersianDigits(generated));
    setCountdown(60);
    setCanResend(false);
    setStep('otp');
    
    // Simulate SMS notification
    showToast(`پیامک تایید حاوی کد [ ${toPersianDigits(generated)} ] به شماره ${toPersianDigits(cleanPhone)} ارسال شد.`);
  };

  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = cleanVal;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (cleanVal && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const entered = otpCode.join('');
    if (entered.length < 4) {
      setError('لطفاً کد تایید ۴ رقمی ارسال شده را کامل وارد نمایید.');
      return;
    }

    // Success
    loginWithPhone(phone, name || (role === 'consultant' ? 'مشاور املاک تخصصی' : 'کاربر گرامی'), role);
    handleClose();
  };

  const handleResend = () => {
    if (!canResend) return;
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedGeneratedCode(toPersianDigits(generated));
    setCountdown(60);
    setCanResend(false);
    showToast(`کد تایید جدید: [ ${toPersianDigits(generated)} ]`);
  };

  const handleClose = () => {
    setStep('phone');
    setPhone('');
    setOtpCode(['', '', '', '']);
    setError('');
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="auth-modal-card"
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-right relative overflow-hidden"
      >
        {/* Background accent */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-700 to-amber-600" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'phone' ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              ورود و احراز هویت با شماره همراه
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              جهت امنیت بیشتر معاملات و جلوگیری از آگهی‌های فیک، ورود به سامانه با پیامک یک‌بارمصرف (OTP) انجام می‌شود.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نام و نام خانوادگی (اختیاری)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: امیرحسین رضایی"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شماره تلفن همراه <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09121234567"
                    maxLength={11}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent text-sm font-medium tracking-wider"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  کد تایید ۴ رقمی از طریق پیامک به این شماره ارسال خواهد شد.
                </span>
              </div>

              {/* Account Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نوع فعالیت در ملک‌یاب
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      role === 'user'
                        ? 'border-emerald-700 bg-emerald-50/70 text-emerald-900 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-5 h-5 text-emerald-700" />
                    <span>متقاضی (خرید / رهن)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('consultant')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      role === 'consultant'
                        ? 'border-emerald-700 bg-emerald-50/70 text-emerald-900 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-5 h-5 text-emerald-700" />
                    <span>مشاور املاک رسمی</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="btn-send-otp"
                className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-900/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>دریافت کد تایید پیامکی</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              ورود کد تایید پیامکی
            </h3>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              کد ۴ رقمی ارسال شده به شماره <span className="font-bold text-slate-800 dir-ltr inline-block">{toPersianDigits(phone)}</span> را وارد کنید:
            </p>

            {/* Quick Helper Badge showing the simulated code */}
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>کد شبیه‌سازی پیامک شما:</span>
              </div>
              <span className="font-black text-base tracking-widest text-emerald-800 bg-white px-2.5 py-0.5 rounded-lg shadow-xs">
                {simulatedGeneratedCode}
              </span>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* 4 Inputs */}
              <div className="flex items-center justify-center gap-3 dir-ltr">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otpCode[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-black rounded-xl border border-slate-300 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-slate-50"
                  />
                ))}
              </div>

              {/* Fast fill button */}
              <button
                type="button"
                onClick={() => {
                  const raw = simulatedGeneratedCode.replace(/[۰-۹]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
                  setOtpCode(raw.split('').slice(0, 4));
                }}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold block mx-auto underline decoration-dotted"
              >
                درج خودکار کد دریافتی
              </button>

              {/* Resend timer */}
              <div className="text-center text-xs text-slate-500">
                {!canResend ? (
                  <span>ارسال مجدد کد تا {toPersianDigits(countdown)} ثانیه دیگر</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    ارسال مجدد پیامک تایید
                  </button>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  ویرایش شماره
                </button>
                <button
                  type="submit"
                  id="btn-confirm-otp"
                  className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-900/20 active:scale-98 transition-all"
                >
                  تایید و ورود به حساب
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
