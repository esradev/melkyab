import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Award, 
  CheckCircle2, 
  MessageSquareQuote
} from 'lucide-react';
import { Consultant } from '../types';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

interface ReviewModalProps {
  consultant: Consultant | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  consultant,
  isOpen,
  onClose
}) => {
  const { currentUser, addReview } = useApp();

  const [authorName, setAuthorName] = useState(currentUser?.name || '');
  const [authorPhone, setAuthorPhone] = useState(currentUser?.phone || '');
  const [comment, setComment] = useState('');
  const [verifiedDeal, setVerifiedDeal] = useState(true);

  // Criteria ratings (1-5)
  const [knowledge, setKnowledge] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [negotiation, setNegotiation] = useState(5);
  const [honesty, setHonesty] = useState(5);

  if (!isOpen || !consultant) return null;

  const overallRating = Number(
    ((knowledge + punctuality + negotiation + honesty) / 4).toFixed(1)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // Mask phone e.g. 0912***3456
    const phone = authorPhone || '۰۹۱۲۰۰۰۱۲۳۴';
    const masked = phone.length >= 7 
      ? phone.slice(0, 4) + '***' + phone.slice(-4) 
      : '۰۹۱۲***' + Math.floor(1000 + Math.random() * 9000);

    addReview({
      consultantId: consultant.id,
      authorName: authorName.trim() || 'مشتری ملک‌یاب',
      authorPhoneMasked: toPersianDigits(masked),
      ratingCategories: {
        knowledge,
        punctuality,
        negotiation,
        honesty
      },
      overallRating,
      comment: comment.trim(),
      verifiedDeal
    });

    onClose();
  };

  const renderStars = (currentVal: number, setVal: (n: number) => void) => {
    return (
      <div className="flex items-center gap-1 dir-ltr">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setVal(star)}
            className="p-1 focus:outline-none transition-transform hover:scale-125"
          >
            <Star
              className={`w-5 h-5 ${
                star <= currentVal
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="review-modal-card"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-right relative overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <img 
            src={consultant.avatar} 
            alt={consultant.name} 
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-600/30"
          />
          <div>
            <h3 className="text-base font-black text-slate-900">
              ثبت نظر و امتیازدهی به {consultant.name}
            </h3>
            <p className="text-xs text-slate-500">{consultant.agencyName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Criteria Ratings */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">اطلاعات و تسلط بر منطقه:</span>
              {renderStars(knowledge, setKnowledge)}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">خوش‌قولی، پیگیری و وقت‌شناسی:</span>
              {renderStars(punctuality, setPunctuality)}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">مهارت در مذاکره و قیمت‌گذاری:</span>
              {renderStars(negotiation, setNegotiation)}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">صداقت و شفافیت در مدارک ملک:</span>
              {renderStars(honesty, setHonesty)}
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-black text-slate-800">میانگین امتیاز محاسبه شده:</span>
              <span className="text-base font-black text-amber-600 flex items-center gap-1">
                ★ {toPersianDigits(overallRating)} از ۵
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              متن نظر و تجربه شما <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="نظرتان درباره نحوه پاسخگویی، معرفی فایل، بازدیدها و جلسه نشست را بنویسید..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                نام نمایشی شما
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="مثلا: حمید شمس"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شماره تماس (محرمانه)
              </label>
              <input
                type="tel"
                dir="ltr"
                value={authorPhone}
                onChange={(e) => setAuthorPhone(e.target.value)}
                placeholder="09121234567"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-2 rounded-xl hover:bg-slate-50">
            <input
              type="checkbox"
              checked={verifiedDeal}
              onChange={(e) => setVerifiedDeal(e.target.checked)}
              className="w-4 h-4 text-emerald-700 rounded-sm focus:ring-emerald-700"
            />
            <span className="font-semibold">تایید می‌کنم که از طریق این مشاور بازدید یا معامله رسمی داشته‌ام</span>
          </label>

          <button
            type="submit"
            id="btn-submit-review"
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-900/15 transition-all"
          >
            ثبت نظر و انتشار در پروفایل مشاور
          </button>
        </form>
      </div>
    </div>
  );
};
