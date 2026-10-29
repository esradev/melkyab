import React from 'react';
import { 
  Heart, 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle,
  Eye,
  Flame
} from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { formatPrice, formatRentDisplay, toPersianDigits } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
  onOpenBooking?: (property: Property) => void;
  onOpenReport?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onSelect,
  onOpenBooking,
  onOpenReport
}) => {
  const { 
    isPropertySaved, 
    toggleSaveProperty, 
    consultants, 
    startOrOpenConversation, 
    currentUser, 
    openAuthModal 
  } = useApp();

  const isSaved = isPropertySaved(property.id);
  const consultant = consultants.find((c) => c.id === property.consultantId);

  const dealTypeLabel = property.dealType === 'buy' ? 'فروش نقدی' : 'رهن و اجاره';
  const propertyTypeLabel: Record<string, string> = {
    apartment: 'آپارتمان',
    villa: 'ویلایی / باغ',
    penthouse: 'پنت‌هاوس',
    office: 'موقعیت اداری',
    commercial: 'تجاری'
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      openAuthModal();
      return;
    }
    startOrOpenConversation(property.id, property.consultantId);
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenBooking) {
      onOpenBooking(property);
    }
  };

  return (
    <div 
      id={`property-card-${property.id}`}
      onClick={() => onSelect && onSelect(property)}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300/80 transition-all duration-300 flex flex-col cursor-pointer text-right"
    >
      {/* Image container */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
        <img 
          src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-sm ${
            property.dealType === 'buy' ? 'bg-emerald-800' : 'bg-teal-700'
          }`}>
            {dealTypeLabel}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 backdrop-blur-md text-white">
            {propertyTypeLabel[property.propertyType] || 'ملک'}
          </span>
          {property.isUrgent && (
            <span className="px-2 py-1 rounded-lg text-[11px] font-bold bg-amber-600 text-white flex items-center gap-1 shadow-sm animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              فوری
            </span>
          )}
        </div>

        {/* Top Left Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveProperty(property.id);
          }}
          className={`absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-md z-10 ${
            isSaved 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          title={isSaved ? 'حذف از نشان‌شده‌ها' : 'نشان کردن ملک'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom image stats */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold text-white drop-shadow-sm">{property.city}، {property.neighborhood}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-300 text-[11px] bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
            <Eye className="w-3 h-3" />
            <span>{toPersianDigits(property.viewsCount)} بازدید</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          {/* Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl mb-3 text-slate-600 text-xs">
            <div className="flex items-center gap-1.5 justify-center">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{toPersianDigits(property.area)} متر</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center border-x border-slate-200">
              <BedDouble className="w-3.5 h-3.5 text-emerald-700" />
              <span>{toPersianDigits(property.bedrooms)} خواب</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>طبقه {toPersianDigits(property.floor)}</span>
            </div>
          </div>

          {/* Price display */}
          <div className="mb-4">
            {property.dealType === 'buy' ? (
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">قیمت کل:</span>
                  <span className="text-lg font-black text-slate-900">
                    {formatPrice(property.price.totalPrice)}
                  </span>
                </div>
                {property.price.pricePerMeter && (
                  <div className="text-left">
                    <span className="text-[11px] text-slate-400 block">قیمت هر متر:</span>
                    <span className="text-xs font-semibold text-slate-600">
                      {formatPrice(property.price.pricePerMeter)}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-baseline justify-between mb-0.5">
                  <span className="text-xs text-slate-500">ودیعه:</span>
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(property.price.mortgage)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">اجاره ماهانه:</span>
                  <span className="text-sm font-black text-emerald-800">
                    {property.price.rent && property.price.rent > 0 
                      ? `${formatPrice(property.price.rent)}` 
                      : 'رهن کامل'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions: Consultant info & Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Consultant Mini Profile */}
          {consultant && (
            <div className="flex items-center gap-2 overflow-hidden">
              <img 
                src={consultant.avatar} 
                alt={consultant.name} 
                className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
              />
              <div className="text-[11px] truncate">
                <span className="font-semibold text-slate-800 block truncate">{consultant.name}</span>
                <span className="text-[10px] text-amber-600 font-bold">★ {toPersianDigits(consultant.rating)}</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleBookingClick}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1"
              title="رزرو نوبت بازدید ملک"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>رزرو بازدید</span>
            </button>

            <button
              type="button"
              onClick={handleChatClick}
              className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-600 hover:text-emerald-700 text-slate-600 transition-colors"
              title="گفتگوی آنلاین با مشاور"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
