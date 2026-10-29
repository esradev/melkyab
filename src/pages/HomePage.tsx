import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  Calendar,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { Property, Consultant } from '../types';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { toPersianDigits } from '../utils/formatters';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenBooking: (property: Property) => void;
  onOpenReport: (property: Property) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenBooking,
  onOpenReport
}) => {
  const { properties, consultants, filters, setFilters } = useApp();
  
  const [dealTab, setDealTab] = useState<'all' | 'buy' | 'rent'>('buy');
  const [searchNeighborhood, setSearchNeighborhood] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 4);
  const urgentProperties = properties.filter((p) => p.isUrgent).slice(0, 3);
  const topConsultants = consultants.slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      dealType: dealTab,
      neighborhood: searchNeighborhood.trim(),
      propertyType: propertyType as any
    }));
    onNavigate('search');
  };

  const neighborhoods = [
    { name: 'نیاوران', count: '۳۴۰ ملک', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80', area: 'منطقه ۱ تهران' },
    { name: 'سعادت‌آباد', count: '۵۱۰ ملک', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80', area: 'منطقه ۲ تهران' },
    { name: 'الهیه و فرشته', count: '۲۸۰ ملک', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80', area: 'منطقه ۱ تهران' },
    { name: 'شهرک غرب', count: '۴۲۰ ملک', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80', area: 'منطقه ۲ تهران' },
    { name: 'پاسداران', count: '۳۱۰ ملک', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=500&q=80', area: 'منطقه ۳ و ۴ تهران' }
  ];

  return (
    <div className="space-y-16 pb-16 text-right">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white rounded-b-[2.5rem] shadow-2xl">
        {/* Subtle grid and glowing radial decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>سامانه احراز هویت پیامکی و کارشناسی اسناد ملکی</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-snug mb-4 max-w-4xl mx-auto">
            خانه‌ای مطمئن در شأن شما، <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 via-teal-200 to-amber-300">
              با شفاف‌ترین قیمت و برترین مشاوران
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            جستجوی پیشرفته روی نقشه آنلاین، گفتگوی مستقیم با مشاورین تاییدشده، رزرو اینترنتی سانس بازدید و ارزیابی موشکافانه اسناد ثبتی در یک پلتفرم هوشمند.
          </p>

          {/* Interactive Search Box */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-5 shadow-2xl border border-white/20 text-slate-900 text-right">
            
            {/* Tabs (خرید، رهن و اجاره، همه) */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setDealTab('buy')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  dealTab === 'buy'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                خرید آپارتمان و ویلا
              </button>
              <button
                type="button"
                onClick={() => setDealTab('rent')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  dealTab === 'rent'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                رهن و اجاره خانه
              </button>
              <button
                type="button"
                onClick={() => setDealTab('all')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  dealTab === 'all'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                همه آگهی‌ها
              </button>
            </div>

            {/* Inputs Grid */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* City & Neighborhood */}
              <div className="sm:col-span-5 relative">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  شهر و محله مدنظر
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchNeighborhood}
                    onChange={(e) => setSearchNeighborhood(e.target.value)}
                    placeholder="مثال: نیاوران، سعادت‌آباد، فرشته..."
                    className="w-full pr-10 pl-3 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-slate-50/50"
                  />
                  <MapPin className="w-4 h-4 text-emerald-700 absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Property Type */}
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  نوع کاربری ملک
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-slate-50/50 font-medium"
                >
                  <option value="all">همه انواع ملک</option>
                  <option value="apartment">آپارتمان مسکونی</option>
                  <option value="penthouse">پنت‌هاوس لوکس</option>
                  <option value="villa">ویلایی و باغ</option>
                  <option value="office">موقعیت اداری</option>
                  <option value="commercial">مغازه و تجاری</option>
                </select>
              </div>

              {/* Submit Action */}
              <div className="sm:col-span-3 sm:self-end">
                <button
                  type="submit"
                  id="hero-search-submit"
                  className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-900/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>جستجو در املاک</span>
                </button>
              </div>
            </form>

            {/* Fast Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">جستجوهای داغ:</span>
              {['نیاوران سند تک‌برگ', 'سعادت‌آباد نوساز', 'پنت‌هاوس الهیه', 'ویلای لواسان', 'رهن کامل پاسداران'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchNeighborhood(tag.split(' ')[0]);
                    setFilters((prev) => ({ ...prev, neighborhood: tag.split(' ')[0] }));
                    onNavigate('search');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-center">
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">۱۰,۲۰۰+</div>
              <div className="text-xs text-slate-300 mt-1">آگهی فعال کارشناسی شده</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">۵۲۰+</div>
              <div className="text-xs text-slate-300 mt-1">مشاور دارای پروانه رسمی</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-teal-300">۱۰۰٪</div>
              <div className="text-xs text-slate-300 mt-1">احراز هویت پیامکی متقاضیان</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white">۴.۸ ★</div>
              <div className="text-xs text-slate-300 mt-1">میانگین رضایت از مشاورین</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>فایل‌های کارشناسی شده ویژه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              املاک برگزیده و پیشنهادی هفته
            </h2>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>مشاهده همه روی نقشه هوشمند</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={(p) => onNavigate('property-detail', { id: p.id })}
              onOpenBooking={onOpenBooking}
              onOpenReport={onOpenReport}
            />
          ))}
        </div>
      </section>

      {/* Interactive Map Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-right">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-teal-200 border border-white/10 inline-block">
              جستجوی گرافیکی و مکانی
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-snug">
              جستجوی هوشمند املاک بر روی نقشه تعاملی
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              با مشاهده قیمت و مشخصات هر ملک مستقیماً بر روی نقشه شهر، ترافیک منطقه، دسترسی به اتوبان‌ها و مراکز رفاهی را بررسی کرده و بهترین تصمیم را برای سکونت یا سرمایه‌گذاری اتخاذ کنید.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('search')}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>ورود به نقشه آنلاین املاک</span>
              </button>
              <button
                onClick={() => onNavigate('trust')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all border border-white/20"
              >
                امنیت معاملات و اصالت اسناد
              </button>
            </div>
          </div>

          {/* Graphical Map preview mock */}
          <div className="w-full md:w-80 h-56 rounded-2xl bg-white/10 backdrop-blur-md p-3 border border-white/20 relative shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2">
              <span className="font-bold">پیش‌نمایش زنده پین‌های قیمت</span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full">فعال</span>
            </div>
            <div className="space-y-2 py-2">
              <div className="bg-emerald-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow flex items-center justify-between">
                <span>نیاوران (پنت‌هاوس)</span>
                <span>۵۶ م.ت</span>
              </div>
              <div className="bg-teal-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow flex items-center justify-between">
                <span>سعادت‌آباد (۳ خواب)</span>
                <span>۲.۵ م ودیعه</span>
              </div>
              <div className="bg-amber-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow flex items-center justify-between">
                <span>الهیه برج‌باغ</span>
                <span>۴۶ م.ت</span>
              </div>
            </div>
            <div className="text-[10px] text-center text-slate-400">
              کلیک روی هر پین اطلاعات کامل و رزرو بازدید را فعال می‌سازد.
            </div>
          </div>
        </div>
      </section>

      {/* Popular Neighborhoods Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>مناطق پرتقاضای پایتخت</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            محبوب‌ترین محله‌ها برای خرید و اجاره
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {neighborhoods.map((n, idx) => (
            <div
              key={n.name}
              onClick={() => {
                setFilters((prev) => ({ ...prev, neighborhood: n.name }));
                onNavigate('search');
              }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 h-64' : 'h-64'
              }`}
            >
              <img 
                src={n.image} 
                alt={n.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] text-teal-300 font-semibold">{n.area}</span>
                  <h4 className="text-xl font-black group-hover:text-amber-300 transition-colors">{n.name}</h4>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-xs font-bold">
                  {toPersianDigits(n.count)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Verified Consultants Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>نظام صنفی و کارشناسان دارای پروانه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              مشاورین برتر و رتبه‌بندی شده
            </h2>
          </div>
          <button
            onClick={() => onNavigate('consultants')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>مشاهده فهرست تمام مشاوران</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topConsultants.map((c) => (
            <div
              key={c.id}
              onClick={() => onNavigate('consultant-profile', { id: c.id })}
              className="group bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img 
                    src={c.avatar} 
                    alt={c.name} 
                    className="w-full h-full rounded-2xl object-cover ring-4 ring-emerald-50 group-hover:scale-105 transition-transform"
                  />
                  {c.verifiedBadge && (
                    <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-700 text-white rounded-full shadow-sm" title="مشاور رسمی تایید شده">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="text-center mb-3">
                  <h4 className="font-black text-sm text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
                    {c.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{c.agencyName}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">پروانه: {toPersianDigits(c.licenseCode)}</p>
                </div>

                {/* Score badge */}
                <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-50 text-xs mb-3">
                  <span className="font-black text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {toPersianDigits(c.rating)}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600 text-[11px]">{toPersianDigits(c.reviewCount)} نظر تایید شده</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {c.specialtyAreas.slice(0, 3).map((area) => (
                    <span key={area} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">سابقه: {toPersianDigits(c.experienceYears)} سال</span>
                <span className="font-bold text-emerald-800 group-hover:underline">پروفایل و املاک ←</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why MelkYab Trust & Safety Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 text-right">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              استانداردهای نوین اعتماد و اطمینان
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              چرا ملک‌یاب امن‌ترین بستر معاملات ملکی است؟
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900 mb-2">احراز هویت پیامکی دوطرفه</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                تمام آگهی‌دهندگان و متقاضیان ملزم به احراز هویت با شماره همراه خود هستند تا آگهی‌های فیک، قیمت‌سازی‌های نامتعارف و واسطه‌های نامشخص حذف شوند.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900 mb-2">سامانه رزرو آنلاین بازدید</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                هماهنگی بازدید از ملک به صورت تقویمی با انتخاب سانس‌های زمانی دقیق انجام می‌شود تا از هدررفت وقت خریدار، فروشنده و مشاور جلوگیری شود.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900 mb-2">امتیاز و رتبه‌بندی شفاف مشاوران</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                نظرات و امتیازات کاربران بر اساس ۴ معیار صداقت، وقت‌شناسی، مهارت در مذاکره و تسلط منطقه‌ای ثبت و به صورت زنده نمایش داده می‌شوند.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
