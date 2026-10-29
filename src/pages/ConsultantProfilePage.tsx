import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Award, 
  Phone, 
  MessageSquare, 
  Building2, 
  ThumbsUp, 
  Calendar, 
  ShieldCheck, 
  Plus
} from 'lucide-react';
import { Consultant, Property } from '../types';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';
import { PropertyCard } from '../components/PropertyCard';

interface ConsultantProfilePageProps {
  consultantId: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenReview: (consultant: Consultant) => void;
  onOpenBooking: (property: Property) => void;
  onOpenReport: (property: Property) => void;
}

export const ConsultantProfilePage: React.FC<ConsultantProfilePageProps> = ({
  consultantId,
  onNavigate,
  onOpenReview,
  onOpenBooking,
  onOpenReport
}) => {
  const { consultants, reviews, properties } = useApp();

  const consultant = consultants.find((c) => c.id === consultantId) || consultants[0];
  const consultantReviews = reviews.filter((r) => r.consultantId === consultant.id);
  const consultantListings = properties.filter((p) => p.consultantId === consultant.id);

  const [activeTab, setActiveTab] = useState<'reviews' | 'listings'>('reviews');

  useEffect(() => {
    if (consultant) {
      document.title = `${consultant.name} - مشاور رسمی املاک | ملک‌یاب`;
    }
  }, [consultant]);

  if (!consultant) return null;

  // Calculate average category ratings
  const avgCategories = consultantReviews.reduce(
    (acc, curr) => {
      acc.knowledge += curr.ratingCategories.knowledge;
      acc.punctuality += curr.ratingCategories.punctuality;
      acc.negotiation += curr.ratingCategories.negotiation;
      acc.honesty += curr.ratingCategories.honesty;
      return acc;
    },
    { knowledge: 0, punctuality: 0, negotiation: 0, honesty: 0 }
  );

  const totalReviews = consultantReviews.length || 1;
  const knowledgeScore = Number((avgCategories.knowledge / totalReviews).toFixed(1));
  const punctualityScore = Number((avgCategories.punctuality / totalReviews).toFixed(1));
  const negotiationScore = Number((avgCategories.negotiation / totalReviews).toFixed(1));
  const honestyScore = Number((avgCategories.honesty / totalReviews).toFixed(1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-right">
      
      {/* Top back button */}
      <button
        onClick={() => onNavigate('consultants')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs"
      >
        <ArrowRight className="w-3.5 h-3.5" />
        <span>بازگشت به فهرست مشاوران</span>
      </button>

      {/* Consultant Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Avatar with verified icon */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0">
            <img 
              src={consultant.avatar} 
              alt={consultant.name} 
              className="w-full h-full rounded-3xl object-cover ring-4 ring-emerald-100 shadow-md"
            />
            {consultant.verifiedBadge && (
              <span className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-700 text-white rounded-xl shadow-md flex items-center gap-1 text-[11px] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>رسمی</span>
              </span>
            )}
          </div>

          {/* Bio & Details */}
          <div className="flex-1 text-center md:text-right space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{consultant.name}</h1>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">{consultant.agencyName}</p>
              </div>

              {/* Add Review Button */}
              <button
                type="button"
                id="btn-open-add-review"
                onClick={() => onOpenReview(consultant)}
                className="px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>ثبت نظر و امتیاز شما</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {consultant.bio}
            </p>

            {/* Specialties & Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="text-xs font-bold text-slate-500">حوزه‌های تخصصی:</span>
              {consultant.specialtyAreas.map((area) => (
                <span key={area} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                  {area}
                </span>
              ))}
            </div>

            {/* Technical credentials */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 ml-1">شماره پروانه تخصصی:</span>
                <span className="font-mono font-bold text-slate-800">{toPersianDigits(consultant.licenseCode)}</span>
              </div>
              <div>
                <span className="text-slate-400 ml-1">سابقه کار:</span>
                <span className="font-bold text-slate-800">{toPersianDigits(consultant.experienceYears)} سال</span>
              </div>
              <div>
                <span className="text-slate-400 ml-1">آگهی‌های فعال:</span>
                <span className="font-bold text-slate-800">{toPersianDigits(consultantListings.length)} فایل</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Criteria Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">تسلط و اطلاعات منطقه</span>
          <div className="text-2xl font-black text-amber-600">★ {toPersianDigits(knowledgeScore)}</div>
          <span className="text-[10px] text-slate-400">از ۵ امتیاز</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">وقت‌شناسی و پیگیری</span>
          <div className="text-2xl font-black text-amber-600">★ {toPersianDigits(punctualityScore)}</div>
          <span className="text-[10px] text-slate-400">از ۵ امتیاز</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">مهارت در مذاکره و قیمت</span>
          <div className="text-2xl font-black text-amber-600">★ {toPersianDigits(negotiationScore)}</div>
          <span className="text-[10px] text-slate-400">از ۵ امتیاز</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">صداقت و استعلام اسناد</span>
          <div className="text-2xl font-black text-amber-600">★ {toPersianDigits(honestyScore)}</div>
          <span className="text-[10px] text-slate-400">از ۵ امتیاز</span>
        </div>
      </div>

      {/* Tabs Switcher: Reviews vs Active Listings */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'reviews'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          نظرات و تجربیات کاربران ({toPersianDigits(consultantReviews.length)})
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'listings'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          آگهی‌های فعال این مشاور ({toPersianDigits(consultantListings.length)})
        </button>
      </div>

      {/* Tab Content: Reviews List */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {consultantReviews.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-xs">
              هنوز نظری برای این مشاور ثبت نشده است. اولین نفری باشید که نظر ثبت می‌کنید!
            </div>
          ) : (
            <div className="space-y-4">
              {consultantReviews.map((rev) => (
                <div key={rev.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {rev.authorName.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">{rev.authorName}</h5>
                        <p className="text-[10px] text-slate-400">{rev.authorPhoneMasked} - {rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{toPersianDigits(rev.overallRating)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {rev.comment}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    {rev.verifiedDeal && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>معامله تایید شده از طریق سامانه</span>
                      </span>
                    )}

                    <button className="flex items-center gap-1 hover:text-slate-800">
                      <ThumbsUp className="w-3 h-3" />
                      <span>مفید بود ({toPersianDigits(rev.helpfulCount)})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Active Listings */}
      {activeTab === 'listings' && (
        <div>
          {consultantListings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-500 text-xs">
              در حال حاضر آگهی فعالی برای این مشاور ثبت نشده است.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultantListings.map((prop) => (
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

    </div>
  );
};
