import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Heart, 
  Share2, 
  Calendar, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Building2, 
  Maximize2, 
  BedDouble, 
  FileCheck, 
  Calculator, 
  AlertTriangle, 
  Star, 
  Check, 
  Layers,
  ChevronLeft
} from 'lucide-react';
import { Property, Consultant } from '../types';
import { useApp } from '../context/AppContext';
import { formatPrice, toPersianDigits, calculateMortgageToRent } from '../utils/formatters';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';

interface PropertyDetailPageProps {
  propertyId: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenBooking: (property: Property) => void;
  onOpenReport: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  propertyId,
  onNavigate,
  onOpenBooking,
  onOpenReport
}) => {
  const { 
    properties, 
    consultants, 
    isPropertySaved, 
    toggleSaveProperty, 
    startOrOpenConversation, 
    currentUser, 
    openAuthModal, 
    showToast 
  } = useApp();

  const property = properties.find((p) => p.id === propertyId) || properties[0];
  const consultant = consultants.find((c) => c.id === property.consultantId) || consultants[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Mortgage/Rent converter states
  const [customMortgage, setCustomMortgage] = useState<number>(property.price.mortgage || 1_000_000_000);

  // Update page title dynamically for SEO
  useEffect(() => {
    if (property) {
      document.title = `${property.title} | ملک‌یاب`;
    }
  }, [property]);

  if (!property) return null;

  const isSaved = isPropertySaved(property.id);
  const similarProperties = properties.filter((p) => p.id !== property.id && p.dealType === property.dealType).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('لینک آگهی در کلیپ‌بورد کپی شد.');
  };

  const handleChat = () => {
    if (!currentUser) {
      openAuthModal();
      return;
    }
    startOrOpenConversation(property.id, consultant.id);
    onNavigate('panel', { tab: 'messages' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-right">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">صفحه اصلی</button>
          <span>/</span>
          <button onClick={() => onNavigate('search')} className="hover:text-emerald-800">املاک {property.city}</button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-xs">{property.neighborhood}</span>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>بازگشت به جستجو</span>
        </button>
      </div>

      {/* Main Property Title & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white ${
              property.dealType === 'buy' ? 'bg-emerald-800' : 'bg-teal-700'
            }`}>
              {property.dealType === 'buy' ? 'فروش نقدی' : 'رهن و اجاره'}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
              {property.documentType}
            </span>
            <span className="text-xs text-slate-400">کد آگهی: {toPersianDigits(property.id)}</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
            {property.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{property.address}</span>
          </p>
        </div>

        {/* Share & Save Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 text-xs font-semibold"
            title="اشتراک‌گذاری آگهی"
          >
            <Share2 className="w-4 h-4" />
            <span>اشتراک</span>
          </button>

          <button
            onClick={() => toggleSaveProperty(property.id)}
            className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
              isSaved
                ? 'border-rose-300 bg-rose-50 text-rose-600'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'نشان شده' : 'نشان کردن'}</span>
          </button>
        </div>
      </div>

      {/* Media Gallery Section */}
      <div className="space-y-3">
        {/* Main large display image */}
        <div className="relative h-80 sm:h-[480px] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-lg">
          <img 
            src={property.images[activeImageIndex] || property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
            عکس {toPersianDigits(activeImageIndex + 1)} از {toPersianDigits(property.images.length)}
          </div>
        </div>

        {/* Thumbnails row */}
        {property.images.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-emerald-700 scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="تصویر بندانگشتی" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Details & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Details (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Key Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block mb-1">متراژ زیربنا</span>
              <span className="text-base font-black text-slate-900">{toPersianDigits(property.area)} متر</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block mb-1">تعداد اتاق خواب</span>
              <span className="text-base font-black text-slate-900">{toPersianDigits(property.bedrooms)} خواب مستر</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block mb-1">سال ساخت</span>
              <span className="text-base font-black text-slate-900">{toPersianDigits(property.yearBuilt)}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block mb-1">طبقه واحد</span>
              <span className="text-base font-black text-slate-900">
                {toPersianDigits(property.floor)} از {toPersianDigits(property.totalFloors)}
              </span>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-800" />
              <span>توضیحات و مشخصات تکمیلی ملک</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-800" />
              <span>امکانات رفاهی و تجهیزات اختصاصی</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Online Mortgage-to-Rent Calculator (for rent properties) */}
          {property.dealType === 'rent' && property.price.isConvertible && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 rounded-3xl border border-emerald-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-black text-base text-emerald-950">
                    محاسبه‌گر آنلاین تبدیل رهن و اجاره
                  </h3>
                </div>
                <span className="text-[11px] bg-emerald-200/60 text-emerald-900 font-bold px-2.5 py-1 rounded-full">
                  فرمول استاندارد ۳ درصد
                </span>
              </div>

              <p className="text-xs text-slate-600">
                این ملک قابلیت تبدیل ودیعه به اجاره را دارد. با تغییر اسلایدر زیر، شرایط پرداخت دلخواه خود را مشاهده نمایید:
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ودیعه پیشنهادی شما: {formatPrice(customMortgage)}
                </label>
                <input
                  type="range"
                  min="500000000"
                  max={property.price.mortgage ? property.price.mortgage * 1.5 : 3_000_000_000}
                  step="50000000"
                  value={customMortgage}
                  onChange={(e) => setCustomMortgage(Number(e.target.value))}
                  className="w-full accent-emerald-800"
                />
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">اجاره ماهانه محاسبه‌شده:</span>
                <span className="text-base font-black text-emerald-800">
                  {formatPrice(
                    Math.max(0, (property.price.rent || 0) + calculateMortgageToRent((property.price.mortgage || 0) - customMortgage))
                  )} / ماه
                </span>
              </div>
            </div>
          )}

          {/* Exact Location on Interactive Leaflet Map */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-800" />
              <span>موقعیت مکانی روی نقشه</span>
            </h3>
            <div className="h-72 w-full rounded-2xl overflow-hidden border border-slate-200">
              <PropertyMap
                properties={[property]}
                selectedPropertyId={property.id}
                zoom={14}
                center={[property.coordinates.lat, property.coordinates.lng]}
              />
            </div>
          </div>

          {/* Violation Reporting trigger */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>آیا این آگهی مشکوک است یا اطلاعات خلاف واقع دارد؟</span>
            </div>
            <button
              onClick={() => onOpenReport(property)}
              className="text-red-600 font-bold hover:underline shrink-0"
            >
              ثبت گزارش تخلف این آگهی
            </button>
          </div>

        </div>

        {/* Sidebar: Pricing, Consultant Card & Booking Actions (4 columns) */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Price & Action Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-5">
            
            {/* Price Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {property.dealType === 'buy' ? (
                <div>
                  <span className="text-xs text-slate-500 block mb-1">قیمت کل فروش:</span>
                  <span className="text-2xl font-black text-slate-900 block mb-2">
                    {formatPrice(property.price.totalPrice)}
                  </span>
                  {property.price.pricePerMeter && (
                    <div className="flex justify-between text-xs text-slate-600 border-t border-slate-200/80 pt-2">
                      <span>قیمت هر متر مربع:</span>
                      <span className="font-bold">{formatPrice(property.price.pricePerMeter)}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500">ودیعه:</span>
                    <span className="text-lg font-bold text-slate-900">{formatPrice(property.price.mortgage)}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-slate-200 pt-2">
                    <span className="text-xs text-slate-500">اجاره ماهانه:</span>
                    <span className="text-xl font-black text-emerald-800">
                      {property.price.rent && property.price.rent > 0 ? formatPrice(property.price.rent) : 'رهن کامل'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Schedule Booking Visit Button */}
            <button
              type="button"
              id="btn-detail-book-visit"
              onClick={() => onOpenBooking(property)}
              className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-900/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>رزرو آنلاین نوبت بازدید ملک</span>
            </button>

            {/* Direct Chat Button */}
            <button
              type="button"
              id="btn-detail-chat-agent"
              onClick={handleChat}
              className="w-full py-3.5 border-2 border-emerald-800 hover:bg-emerald-50 text-emerald-800 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>چت آنلاین با مشاور ملک</span>
            </button>

            <div className="text-center text-[11px] text-slate-400">
              رزرو بازدید بدون کمیسیون و کاملاً رایگان است.
            </div>
          </div>

          {/* Consultant Profile Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-slate-400 block">مشاور کارشناس این آگهی</span>
            
            <div className="flex items-center gap-3">
              <img 
                src={consultant.avatar} 
                alt={consultant.name} 
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-600/30"
              />
              <div>
                <h4 className="font-black text-sm text-slate-900">{consultant.name}</h4>
                <p className="text-xs text-slate-500">{consultant.agencyName}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{toPersianDigits(consultant.rating)}</span>
                  <span className="text-slate-400 text-[10px]">({toPersianDigits(consultant.reviewCount)} نظر)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>شماره پروانه تخصصی:</span>
                <span className="font-mono font-bold">{toPersianDigits(consultant.licenseCode)}</span>
              </div>
              <div className="flex justify-between">
                <span>سابقه فعالیت:</span>
                <span className="font-bold">{toPersianDigits(consultant.experienceYears)} سال در منطقه ۱ و ۲</span>
              </div>
            </div>

            <a
              href={`tel:${consultant.phone}`}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>تماس مستقیم: {toPersianDigits(consultant.phone)}</span>
            </a>

            <button
              onClick={() => onNavigate('consultant-profile', { id: consultant.id })}
              className="w-full text-center text-xs text-emerald-800 font-bold hover:underline"
            >
              مشاهده سوابق و نظرات کاربران درباره مشاور ←
            </button>
          </div>

        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-10 border-t border-slate-200">
          <h3 className="text-xl font-black text-slate-900 mb-6">
            آگهی‌های مشابه در همین محدوده قیمت
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(p) => onNavigate('property-detail', { id: p.id })}
                onOpenBooking={onOpenBooking}
                onOpenReport={onOpenReport}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
