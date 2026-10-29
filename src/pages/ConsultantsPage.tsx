import React, { useState } from 'react';
import { 
  Search, 
  Award, 
  Star, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Building2,
  ShieldCheck
} from 'lucide-react';
import { Consultant } from '../types';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

interface ConsultantsPageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenReview: (consultant: Consultant) => void;
}

export const ConsultantsPage: React.FC<ConsultantsPageProps> = ({
  onNavigate,
  onOpenReview
}) => {
  const { consultants } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConsultants = consultants.filter((c) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.agencyName.toLowerCase().includes(q) ||
      c.specialtyAreas.some((a) => a.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-teal-200">
            <Award className="w-4 h-4 text-amber-400" />
            <span>فهرست مشاورین رسمی دارای پروانه کسب</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            بانک مشاورین برتر و کارشناسان املاک
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            مشاوران این بخش دارای پروانه معتبر تخصصی از اتحادیه صنف مشاورین املاک بوده و عملکرد آنان توسط کاربران ارزیابی شده است.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی نام مشاور یا محله..."
              className="w-full pr-10 pl-4 py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-lg"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* Consultants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsultants.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 shrink-0">
                  <img 
                    src={c.avatar} 
                    alt={c.name} 
                    className="w-full h-full rounded-2xl object-cover ring-2 ring-emerald-600/30"
                  />
                  {c.verifiedBadge && (
                    <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-700 text-white rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-base text-slate-900 mb-0.5">{c.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{c.agencyName}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    پروانه کسب: <span className="font-mono font-bold text-slate-700">{toPersianDigits(c.licenseCode)}</span>
                  </p>
                </div>
              </div>

              {/* Rating snippet */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs mb-4">
                <div className="flex items-center gap-1 text-amber-600 font-black">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{toPersianDigits(c.rating)} از ۵</span>
                </div>
                <span className="text-slate-500">{toPersianDigits(c.reviewCount)} نظر مشتریان</span>
                <span className="text-slate-400">|</span>
                <span className="text-emerald-800 font-bold">{toPersianDigits(c.experienceYears)} سال سابقه</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                {c.bio}
              </p>

              {/* Specialty tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {c.specialtyAreas.map((area) => (
                  <span key={area} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onOpenReview(c)}
                className="text-xs text-slate-600 hover:text-emerald-800 font-bold p-2"
              >
                ثبت نظر
              </button>

              <button
                type="button"
                onClick={() => onNavigate('consultant-profile', { id: c.id })}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                مشاهده پروفایل و املاک
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
