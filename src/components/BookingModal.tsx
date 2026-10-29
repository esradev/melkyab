import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  UserCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  Phone
} from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  property,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { currentUser, consultants, addBooking, openAuthModal } = useApp();

  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [applicantPhone, setApplicantPhone] = useState(currentUser?.phone || '');
  const [visitType, setVisitType] = useState<'in_person' | 'video_call'>('in_person');
  const [selectedDate, setSelectedDate] = useState('شنبه ۲۴ شهریور');
  const [selectedSlot, setSelectedSlot] = useState('۱۶:۰۰ الی ۱۸:۰۰');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!isOpen || !property) return null;

  const consultant = consultants.find((c) => c.id === property.consultantId);

  const availableDates = [
    { label: 'شنبه ۲۴ شهریور', day: 'شنبه', date: '۲۴ شهریور' },
    { label: 'یکشنبه ۲۵ شهریور', day: 'یکشنبه', date: '۲۵ شهریور' },
    { label: 'دوشنبه ۲۶ شهریور', day: 'دوشنبه', date: '۲۶ شهریور' },
    { label: 'سه‌شنبه ۲۷ شهریور', day: 'سه‌شنبه', date: '۲۷ شهریور' },
    { label: 'چهارشنبه ۲۸ شهریور', day: 'چهارشنبه', date: '۲۸ شهریور' },
    { label: 'پنجشنبه ۲۹ شهریور', day: 'پنجشنبه', date: '۲۹ شهریور' }
  ];

  const availableSlots = [
    '۱۰:۰۰ الی ۱۲:۰۰ (صبح)',
    '۱۲:۰۰ الی ۱۴:۰۰ (ظهر)',
    '۱۴:۰۰ الی ۱۶:۰۰ (عصر)',
    '۱۶:۰۰ الی ۱۸:۰۰ (عصر)',
    '۱۸:۰۰ الی ۲۰:۰۰ (غروب)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser && !applicantPhone) {
      openAuthModal();
      return;
    }

    const id = addBooking({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      consultantId: property.consultantId,
      consultantName: consultant?.name || 'مشاور املاک',
      applicantName: applicantName.trim() || 'متقاضی محترم',
      applicantPhone: applicantPhone.trim() || (currentUser?.phone || '۰۹۱۲۰۰۰۰۰۰۰'),
      date: selectedDate,
      timeSlot: selectedSlot,
      visitType,
      notes: notes.trim()
    });

    setBookingId(id);
    setIsSuccess(true);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="booking-modal-card"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-right relative overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-black text-slate-900">
              درخواست بازدید شما با موفقیت ثبت شد!
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              پیامک تایید حاوی اطلاعات هماهنگی برای مشاور محترم <span className="font-bold text-slate-900">({consultant?.name})</span> ارسال گردید. مشاور جهت هماهنگی نهایی ظرف ۳۰ دقیقه آینده با شما تماس خواهد گرفت.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-right">
              <div className="flex justify-between">
                <span className="text-slate-500">کد رزرو:</span>
                <span className="font-bold text-slate-800 dir-ltr">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">تاریخ و زمان:</span>
                <span className="font-bold text-slate-800">{selectedDate} - {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">نوع بازدید:</span>
                <span className="font-bold text-emerald-800">
                  {visitType === 'in_person' ? 'حضوری در محل ملک' : 'بازدید آنلاین تصویری'}
                </span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              مشاهده نوبت در پنل کاربری من
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  رزرو آنلاین بازدید ملک
                </h3>
                <p className="text-xs text-slate-500">
                  انتخاب سانس زمانی برای بازدید حضوری یا مشاوره تصویری
                </p>
              </div>
            </div>

            {/* Selected Property Brief */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 mb-5">
              <img 
                src={property.images[0]} 
                alt={property.title} 
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="font-bold text-xs text-slate-900 truncate mb-1">{property.title}</h4>
                <p className="text-[11px] text-slate-500">📍 {property.neighborhood} | {toPersianDigits(property.area)} متر</p>
                {consultant && (
                  <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">مشاور: {consultant.name}</p>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Visit Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  شیوه بازدید مد نظر شما
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVisitType('in_person')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      visitType === 'in_person'
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <span>بازدید حضوری در محل</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('video_call')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      visitType === 'video_call'
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-4 h-4 text-emerald-700" />
                    <span>تور آنلاین تصویری</span>
                  </button>
                </div>
              </div>

              {/* Day Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  انتخاب روز بازدید
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setSelectedDate(d.label)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedDate === d.label
                          ? 'border-emerald-700 bg-emerald-800 text-white font-bold shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <span className="block text-[11px] opacity-80">{d.day}</span>
                      <span className="block text-xs font-semibold mt-0.5">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  انتخاب سانس ساعتی
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl border text-right text-xs transition-all flex items-center justify-between ${
                        selectedSlot === slot
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{slot}</span>
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="مثال: امیر رضایی"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    شماره همراه جهت هماهنگی
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="09123456789"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  توضیحات تکمیلی یا درخواست ویژه (اختیاری)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثلا: تمایل دارم مشاعات و پارکینگ حتما بازدید شود..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  رزرو بازدید کاملاً رایگان است. حضور به موقع در سانس انتخابی احترام به وقت مشاور و مالک محترم است.
                </span>
              </div>

              <button
                type="submit"
                id="btn-submit-booking"
                className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-900/15 transition-all"
              >
                ثبت نهایی رزرو نوبت بازدید
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
