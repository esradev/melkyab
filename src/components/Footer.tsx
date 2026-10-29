import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Heart,
  Award
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">مـلک‌یـاب</span>
                <span className="block text-[10px] text-emerald-400 font-semibold">سامانه جامع معاملات املاک</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              پلتفرم نوین خرید، فروش و رهن و اجاره املاک لوکس و استاندارد با قابلیت جستجوی هوشمند بر روی نقشه، چت آنلاین، نوبت‌دهی بازدید و نظارت بر پروانه رسمی مشاورین.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>مجهز به احراز هویت پیامکی سراسری</span>
            </div>
          </div>

          {/* Fast Navigation */}
          <div>
            <h4 className="text-white font-black text-sm mb-4">دسترسی سریع</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  صفحه نخست
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">
                  جستجو روی نقشه آنلاین
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('consultants')} className="hover:text-white transition-colors">
                  فهرست مشاورین رسمی املاک
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('new-listing')} className="hover:text-white transition-colors">
                  ثبت رایگان آگهی ملک
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trust')} className="hover:text-white transition-colors">
                  اصالت اسناد و امنیت معاملات
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Neighborhoods */}
          <div>
            <h4 className="text-white font-black text-sm mb-4">مناطق پرتقاضای تهران</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">
                  املاک و آپارتمان‌های نیاوران
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">
                  خرید و رهن سعادت‌آباد
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">
                  برج‌باغ‌های الهیه و فرشته
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">
                  ویلایی و پنت‌هاوس شهرک غرب
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">
                  آپارتمان‌های نوساز پاسداران
                </button>
              </li>
            </ul>
          </div>

          {/* Trust Certifications & Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-black text-sm mb-2">مجوزها و ارتباط با ما</h4>
            
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="dir-ltr font-mono">{toPersianDigits('۰۲۱-۸۸۹۹۰۰۱۱')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@melkyab.ir</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>تهران، بلوار سعادت‌آباد، تقاطع سرو، ساختمان پردیس، واحد ۱۲</span>
              </div>
            </div>

            {/* Official trust badges */}
            <div className="flex items-center gap-2 pt-2">
              <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 text-[10px] text-center w-24">
                <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="block text-slate-300 font-semibold">پروانه کسب</span>
                <span className="text-[9px] text-slate-500">اتحادیه صنف</span>
              </div>
              <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 text-[10px] text-center w-24">
                <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                <span className="block text-slate-300 font-semibold">سامانه کاتب</span>
                <span className="text-[9px] text-slate-500">ثبت اسناد</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© تمامی حقوق مادی و معنوی برای پلتفرم املاک «ملک‌یاب» محفوظ است.</p>
          <p className="flex items-center gap-1">
            طراحی شده با استانداردهای نوین معاملاتی و فناوری هوشمند
          </p>
        </div>

      </div>
    </footer>
  );
};
