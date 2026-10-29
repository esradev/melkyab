import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  AlertOctagon, 
  UserCheck, 
  ArrowRight,
  Scale,
  Building,
  CheckCircle2
} from 'lucide-react';

interface TrustPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const TrustPage: React.FC<TrustPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-right">
      
      {/* Top back */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs"
      >
        <ArrowRight className="w-3.5 h-3.5" />
        <span>بازگشت به صفحه اصلی</span>
      </button>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>مرکز امنیت معاملات و اصالت اسناد ملک‌یاب</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            تضمین سلامت معامله و صیانت از اعتماد عمومی
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            ما در پلتفرم ملک‌یاب با تلفیق احراز هویت دوطرفه با تلفن همراه، اعتبارسنجی پروانه‌های نظام صنفی و سامانه گزارش‌دهی تخلفات، محیطی شفاف و پاک برای معاملات ملکی خلق کرده‌ایم.
          </p>
        </div>
      </div>

      {/* Core Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900">۱. احراز هویت پیامکی سراسری</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            هیچ کاربر یا مشاور ناشناسی امکان انتشار آگهی یا ارتباط در چت را ندارد. تطبیق شماره همراه با کد ملی و رمز یک‌بارمصرف OTP مانع از ایجاد آگهی‌های کاذب و دلال‌بازی‌های ناشناس می‌شود.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900">۲. پروانه تخصصی و اتحادیه املاک</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            مشاوران املاک دارای نشان ویژه، پروانه کسب معتبر از اتحادیه صنف مشاورین املاک و سازمان ثبت اسناد دارند. شماره پروانه به صورت شفاف در پروفایل هر مشاور قابل استعلام است.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900">۳. خط تلفن و سامانه گزارش تخلف</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            چنانچه قیمت ملکی خلاف واقع باشد، سند دارای معارض باشد یا عکس‌ها متعلق به ملک نباشند، گزارش‌های ارسالی حداکثر ظرف ۴ ساعت توسط تیم بازرسی حقوقی بررسی و آگهی مسدود می‌گردد.
          </p>
        </div>

      </div>

      {/* Legal & Document Verification Guide */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-slate-900">
          <Scale className="w-6 h-6 text-emerald-800" />
          <h2 className="font-black text-xl">نکات کلیدی حقوقی پیش از واریز هرگونه وجه بیعانه</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">عدم پرداخت بیعانه پیش از بازدید</h4>
              <p className="text-slate-600 leading-relaxed">
                هرگز پیش از بازدید حضوری، رویت اصل مدارک مالکیت و بررسی اصالت سند، هیچ مبلغی تحت عنوان بیعانه یا حق رزرو واریز ننمایید.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">ثبت در سامانه‌های رسمی کشور</h4>
              <p className="text-slate-600 leading-relaxed">
                کلیه قراردادهای اجاره و مبایعه‌نامه باید دارای کد رهگیری معتبر از سامانه ثبت معاملات املاک و مستغلات کشور باشند.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">استعلام اسناد تک‌برگ از سازمان ثبت</h4>
              <p className="text-slate-600 leading-relaxed">
                با اسکن بارکد سند تک‌برگ و دریافت شناسه یکتا، از آزاد بودن سند و عدم رهن بانکی یا بازداشت قضایی اطمینان حاصل فرمایید.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">احراز وکالت‌نامه رسمی</h4>
              <p className="text-slate-600 leading-relaxed">
                در صورتی که فروشنده وکیل مالک است، اصالت و تاریخ اعتبار وکالت‌نامه باید از دفترخانه صادرکننده استعلام قطعی شود.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
