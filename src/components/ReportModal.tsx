import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  FileText,
  Phone
} from 'lucide-react';
import { Property, Consultant } from '../types';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

interface ReportModalProps {
  target: {
    property?: Property;
    consultant?: Consultant;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  target,
  isOpen,
  onClose
}) => {
  const { currentUser, addReport, showToast } = useApp();

  const [category, setCategory] = useState('قیمت غیرواقعی یا گمراه‌کننده');
  const [description, setDescription] = useState('');
  const [reporterPhone, setReporterPhone] = useState(currentUser?.phone || '');
  const [trackingCode, setTrackingCode] = useState<string | null>(null);

  if (!isOpen || !target) return null;

  const title = target.property 
    ? `آگهی: ${target.property.title}` 
    : target.consultant 
    ? `مشاور: ${target.consultant.name}` 
    : 'مورد گزارش';

  const categories = [
    'قیمت غیرواقعی یا گمراه‌کننده (زیر قیمت کاذب یا چندنرخی)',
    'عدم تطابق عکس‌ها یا اطلاعات با واقعیت ملک',
    'ملک قبلاً واگذار / معامله شده است',
    'عدم پاسخگویی یا رفتار غیرحرفه‌ای مشاور',
    'شبهه کلاهبرداری، سند مشکل‌دار یا پیش‌فروش بدون مجوز',
    'سایر تخلفات'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const code = addReport({
      propertyId: target.property?.id,
      consultantId: target.consultant?.id,
      targetTitle: title,
      reasonCategory: category,
      description: description.trim(),
      reporterPhone: reporterPhone.trim() || 'ثبت شده محرمانه'
    });

    setTrackingCode(code);
  };

  const handleDone = () => {
    setTrackingCode(null);
    setDescription('');
    onClose();
  };

  const copyCode = () => {
    if (!trackingCode) return;
    navigator.clipboard?.writeText(trackingCode);
    showToast('کد پیگیری کپی شد.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="report-violation-modal"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-right relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {trackingCode ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-black text-slate-900">
              گزارش تخلف با موفقیت ثبت شد
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              از همکاری شما در ارتقای امنیت سامانه و شفافیت بازار مسکن سپاسگزاریم. گزارش شما توسط کارشناسان حقوقی و بازرسی ظرف ۲۴ ساعت بررسی خواهد شد.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-right">کد پیگیری تخلف:</span>
                <span className="font-mono font-black text-base text-slate-900 dir-ltr">{trackingCode}</span>
              </div>
              <button
                onClick={copyCode}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1 font-bold text-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                کپی
              </button>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all"
            >
              بستن پنجره
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  سامانه گزارش تخلف و صیانت از اعتماد
                </h3>
                <p className="text-xs text-slate-500">
                  بررسی فوری توسط دایره بازرسی و نظارت بر مشاورین
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mb-4">
              <span className="text-slate-400 block text-[11px] mb-0.5">مورد گزارش:</span>
              <span className="font-bold line-clamp-1">{title}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  علت گزارش تخلف
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شرح دقیق تخلف یا مستندات <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="لطفا مشاهدات عینی، مغایرت‌ها یا گفتگوی خود با مشاور را با جزییات توضیح دهید..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شماره همراه شما (جهت گزارش نتیجه بازرسی)
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="09121234567"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                id="btn-submit-violation"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>ارسال گزارش تخلف به بازرسی</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
