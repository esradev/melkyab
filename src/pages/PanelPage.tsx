import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  Heart, 
  MessageSquare, 
  PlusCircle, 
  Trash2, 
  TrendingUp, 
  UserCheck, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Flame, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Property, BookingVisit } from '../types';
import { useApp } from '../context/AppContext';
import { toPersianDigits, formatPrice } from '../utils/formatters';
import { ChatMessenger } from '../components/ChatMessenger';
import { PropertyCard } from '../components/PropertyCard';

interface PanelPageProps {
  initialTab?: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenBooking: (property: Property) => void;
  onOpenReport: (property: Property) => void;
}

export const PanelPage: React.FC<PanelPageProps> = ({
  initialTab = 'overview',
  onNavigate,
  onOpenBooking,
  onOpenReport
}) => {
  const { 
    currentUser, 
    toggleUserRole, 
    properties, 
    bookings, 
    updateBookingStatus, 
    deleteProperty, 
    updateProperty, 
    reports, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const isConsultant = currentUser?.role === 'consultant';

  // Consultant files vs User files
  const myListings = isConsultant 
    ? properties.filter((p) => p.consultantId === 'c1' || p.consultantId === 'c2' || p.id.startsWith('p_'))
    : properties.slice(0, 2);

  const savedProperties = properties.filter((p) => currentUser?.savedPropertyIds.includes(p.id));

  const myBookings = bookings;

  const handleLadder = (propertyId: string) => {
    updateProperty(propertyId, { createdAt: 'هم‌اکنون (نردبان شده)' });
    showToast('آگهی نردبان شد و به صدر نتایج جستجو منتقل گردید.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      
      {/* Profile & Mode Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <img 
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
            alt={currentUser?.name || "کاربر"}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-600/30 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentUser?.name || 'کاربر گرامی'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>احراز هویت شده با پیامک</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              شماره همراه: <span className="dir-ltr inline-block font-mono font-bold text-slate-700">{toPersianDigits(currentUser?.phone || '۰۹۱۲۰۰۰۰۰۰۰')}</span>
              {isConsultant && currentUser?.licenseCode && (
                <span className="mr-3 text-emerald-800 font-semibold">| پروانه کسب: {toPersianDigits(currentUser.licenseCode)}</span>
              )}
            </p>
          </div>
        </div>

        {/* Action button & Role Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleUserRole}
            className="px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>تغییر به {isConsultant ? 'پنل متقاضی خرید' : 'پنل اختصاصی مشاور املاک'}</span>
          </button>

          <button
            onClick={() => onNavigate('new-listing')}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>بارگذاری آگهی جدید</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'overview' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          خلاصه آمار و وضعیت
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'listings' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          مدیریت آگهی‌های من ({toPersianDigits(myListings.length)})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'bookings' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          نوبت‌های رزرو بازدید ({toPersianDigits(myBookings.length)})
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'messages' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          پیام‌ها و چت آنلاین
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'saved' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          نشان‌شده‌ها ({toPersianDigits(savedProperties.length)})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'reports' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          پیگیری گزارش‌های تخلف ({toPersianDigits(reports.length)})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">
                {isConsultant ? 'آگهی‌های فعال در سامانه' : 'آگهی‌های من'}
              </span>
              <div className="text-2xl font-black text-slate-900">{toPersianDigits(myListings.length)} ملک</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">کل بازدیدهای ثبت شده</span>
              <div className="text-2xl font-black text-emerald-800">۲,۸۴۰ بازدید</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">درخواست‌های بازدید ملک</span>
              <div className="text-2xl font-black text-amber-600">{toPersianDigits(myBookings.length)} رزرو</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">
                {isConsultant ? 'امتیاز کیفی مشاور' : 'املاک نشان‌شده'}
              </span>
              <div className="text-2xl font-black text-slate-900">
                {isConsultant ? '★ ۴.۹ از ۵' : `${toPersianDigits(savedProperties.length)} مورد`}
              </div>
            </div>
          </div>

          {/* Quick Notice for Realtors */}
          {isConsultant && (
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base">قوانین ارتقای آگهی و نردبان ویژه مشاورین رسمی</h4>
                <p className="text-xs text-slate-300">
                  آگهی‌هایی که دارای عکس‌های باکیفیت و سند تک‌برگ استعلام شده باشند به صورت خودکار در بخش پیشنهادات ویژه و نقشه اصلی برجسته می‌شوند.
                </p>
              </div>
              <button
                onClick={() => onNavigate('new-listing')}
                className="px-5 py-3 bg-white text-emerald-950 font-black text-xs rounded-xl shadow-lg shrink-0"
              >
                ثبت فایل جدید
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-lg text-slate-900">آگهی‌های ثبت شده</h3>
            <button
              onClick={() => onNavigate('new-listing')}
              className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>افزودن آگهی جدید</span>
            </button>
          </div>

          <div className="space-y-3">
            {myListings.map((prop) => (
              <div 
                key={prop.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img 
                    src={prop.images[0]} 
                    alt={prop.title} 
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{prop.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {prop.dealType === 'buy' ? 'فروش' : 'اجاره'} | {prop.neighborhood} - {toPersianDigits(prop.area)} متر
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>ثبت: {prop.createdAt}</span>
                      <span>بازدید: {toPersianDigits(prop.viewsCount)}</span>
                      <span>نشان‌شده: {toPersianDigits(prop.savesCount)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => handleLadder(prop.id)}
                    className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1 border border-amber-200"
                    title="ارتقا به صدر نتایج"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>نردبان</span>
                  </button>

                  <button
                    onClick={() => onNavigate('property-detail', { id: prop.id })}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                  >
                    مشاهده آگهی
                  </button>

                  <button
                    onClick={() => deleteProperty(prop.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="حذف آگهی"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Booked Visits */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h3 className="font-black text-lg text-slate-900">نوبت‌های رزرو بازدید ملک</h3>
          
          {myBookings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-xs">
              هیچ نوبت بازدیدی ثبت نشده است.
            </div>
          ) : (
            <div className="space-y-3">
              {myBookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img 
                      src={b.propertyImage} 
                      alt="ملک" 
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{b.propertyTitle}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        📅 تاریخ: <span className="font-bold">{b.date}</span> ({b.timeSlot})
                      </p>
                      <p className="text-[11px] text-slate-500">
                        متقاضی: {b.applicantName} ({toPersianDigits(b.applicantPhone)}) | شیوه: {b.visitType === 'in_person' ? 'حضوری' : 'آنلاین تصویری'}
                      </p>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === 'confirmed' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : b.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status === 'confirmed' ? 'تایید شده' : b.status === 'cancelled' ? 'لغو شده' : 'در انتظار تایید مشاور'}
                    </span>

                    {b.status === 'pending' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateBookingStatus(b.id, 'confirmed')}
                          className="p-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 text-xs"
                          title="تایید نوبت"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateBookingStatus(b.id, 'cancelled')}
                          className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs"
                          title="لغو نوبت"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Messages */}
      {activeTab === 'messages' && (
        <div>
          <ChatMessenger onSelectProperty={(pid) => onNavigate('property-detail', { id: pid })} />
        </div>
      )}

      {/* Tab 5: Saved Properties */}
      {activeTab === 'saved' && (
        <div>
          <h3 className="font-black text-lg text-slate-900 mb-4">املاک نشان‌شده و مورد علاقه</h3>
          {savedProperties.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-xs">
              هنوز ملکی را نشان نکرده‌اید. با کلیک بر روی آیکون قلب روی هر کارت، می‌توانید ملک‌های مد نظرتان را در اینجا ذخیره کنید.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onSelect={(p) => onNavigate('property-detail', { id: p.id })}
                  onOpenBooking={onOpenBooking}
                  onOpenReport={onOpenReport}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Violation Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <h3 className="font-black text-lg text-slate-900">گزارش‌های تخلف ثبت شده توسط شما</h3>
          {reports.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-xs">
              هیچ گزارش تخلفی از حساب کاربری شما ثبت نشده است.
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((rep) => (
                <div key={rep.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{rep.targetTitle}</span>
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded dir-ltr font-bold text-slate-700">
                      {rep.trackingCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">علت: {rep.reasonCategory}</p>
                  <p className="text-[11px] text-slate-500">{rep.description}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">تاریخ: {rep.createdAt}</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                      در حال بررسی کارشناسان حقوقی
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
