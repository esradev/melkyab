import React, { useState } from 'react';
import { 
  ArrowRight, 
  Building2, 
  Upload, 
  Check, 
  DollarSign, 
  MapPin, 
  Layers, 
  Sparkles,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { Property, DealType, PropertyType } from '../types';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

interface NewListingPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const NewListingPage: React.FC<NewListingPageProps> = ({ onNavigate }) => {
  const { addProperty, currentUser, consultants } = useApp();

  const [title, setTitle] = useState('');
  const [dealType, setDealType] = useState<DealType>('buy');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [city, setCity] = useState('تهران');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [floor, setFloor] = useState<number>(3);
  const [totalFloors, setTotalFloors] = useState<number>(5);
  const [yearBuilt, setYearBuilt] = useState<number>(1402);
  const [documentType, setDocumentType] = useState<Property['documentType']>('سند تک‌برگ');

  // Pricing
  const [totalPrice, setTotalPrice] = useState<number | ''>('');
  const [mortgage, setMortgage] = useState<number | ''>('');
  const [rent, setRent] = useState<number | ''>('');
  const [isConvertible, setIsConvertible] = useState(true);

  // Amenities
  const availableAmenities = [
    'آسانسور',
    'پارکینگ سندی',
    'انباری اختصاصی',
    'بالکن / تراس',
    'استخر، سونا، جکوزی',
    'لابی مجلل و لابی‌من',
    'سیستم خانه هوشمند KNX',
    'روف‌گاردن ۴ فصل',
    'نگهبانی ۲۴ ساعته',
    'آشپزخانه فول فرنیش',
    'ژنراتور برق اضطراری'
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'آسانسور',
    'پارکینگ سندی',
    'انباری اختصاصی'
  ]);

  // Images
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [description, setDescription] = useState('');

  const toggleAmenity = (item: string) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pricePerMeter = (dealType === 'buy' && totalPrice && area) 
      ? Math.round(Number(totalPrice) / Number(area))
      : undefined;

    const newId = addProperty({
      title: title.trim() || 'آپارتمان مسکونی در ' + neighborhood,
      slug: 'prop-' + Date.now(),
      dealType,
      propertyType,
      price: {
        totalPrice: dealType === 'buy' ? Number(totalPrice) : undefined,
        pricePerMeter,
        mortgage: dealType === 'rent' ? Number(mortgage) : undefined,
        rent: dealType === 'rent' ? Number(rent) : undefined,
        isConvertible
      },
      area: Number(area) || 120,
      bedrooms,
      floor,
      totalFloors,
      yearBuilt,
      city,
      neighborhood: neighborhood.trim() || 'سعادت‌آباد',
      address: address.trim() || `${city}، ${neighborhood}`,
      coordinates: {
        lat: 35.78 + (Math.random() - 0.5) * 0.05,
        lng: 51.41 + (Math.random() - 0.5) * 0.05
      },
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      amenities: selectedAmenities,
      description: description.trim() || 'ملک با موقعیت عالی و نقشه مهندسی، نورگیر بسیار عالی و مدارک آماده انتقال.',
      documentType,
      consultantId: currentUser?.role === 'consultant' ? 'c1' : 'c2'
    });

    onNavigate('property-detail', { id: newId });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      
      {/* Top back button */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs"
      >
        <ArrowRight className="w-3.5 h-3.5" />
        <span>انصراف و بازگشت</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              ثبت و انتشار رایگان آگهی ملک
            </h1>
            <p className="text-xs text-slate-500">
              نمایش فوری در نقشه تعاملی و دسترسی به بیش از ۱۰ هزار متقاضی فعال
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Deal & Basics */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            ۱. مشخصات پایه معامله و کاربری
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                نوع معامله <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDealType('buy')}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                    dealType === 'buy'
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  فروش نقدی
                </button>
                <button
                  type="button"
                  onClick={() => setDealType('rent')}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                    dealType === 'rent'
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  رهن و اجاره
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                نوع کاربری ملک
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as any)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-700 bg-white"
              >
                <option value="apartment">آپارتمان مسکونی</option>
                <option value="penthouse">پنت‌هاوس لوکس</option>
                <option value="villa">ویلایی و عمارت</option>
                <option value="office">موقعیت اداری</option>
                <option value="commercial">تجاری و مغازه</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              عنوان آگهی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: آپارتمان ۱۶۰ متری سعادت‌آباد ۳ خوابه نوساز کلید نخورده"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">شهر</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                محله <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="مثال: نیاوران، فرمانیه"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">آدرس دقیق / خیابان</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="خیابان یا فرعی اصلی"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            ۲. قیمت و شرایط مالی
          </h3>

          {dealType === 'buy' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                قیمت کل فروش (تومان) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value ? Number(e.target.value) : '')}
                placeholder="مثال: 25000000000 (۲۵ میلیارد)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 dir-ltr"
                required
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    مبلغ ودیعه (تومان) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={mortgage}
                    onChange={(e) => setMortgage(e.target.value ? Number(e.target.value) : '')}
                    placeholder="مثال: 1500000000 (۱.۵ میلیارد)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 dir-ltr"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    اجاره ماهانه (تومان)
                  </label>
                  <input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(e.target.value ? Number(e.target.value) : '')}
                    placeholder="برای رهن کامل ۰ بگذارید"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 dir-ltr"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isConvertible}
                  onChange={(e) => setIsConvertible(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded-sm"
                />
                <span className="font-semibold">امکان تبدیل ودیعه و اجاره بر اساس عرف بازار</span>
              </label>
            </div>
          )}
        </div>

        {/* Section 3: Specs */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            ۳. مشخصات فیزیکی و سند
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                متراژ (متر مربع) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value ? Number(e.target.value) : '')}
                placeholder="مثال: 140"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs dir-ltr"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">تعداد خواب</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {toPersianDigits(n)} خواب
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">سال ساخت (شمسی)</label>
              <input
                type="number"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs dir-ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نوع سند</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="سند تک‌برگ">سند تک‌برگ</option>
                <option value="سند منگوله‌دار">سند منگوله‌دار</option>
                <option value="وکالتی">وکالتی</option>
                <option value="قولنامه‌ای">قولنامه‌ای</option>
                <option value="سرقفلی">سرقفلی</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              امکانات رفاهی موجود
            </label>
            <div className="flex flex-wrap gap-2">
              {availableAmenities.map((amenity) => {
                const selected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selected
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 4: Images & Description */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            ۴. تصاویر و توضیحات تکمیلی
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              افزودن لینک تصویر ملک
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-xs dir-ltr"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن عکس</span>
              </button>
            </div>
          </div>

          {/* Image Previews */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 group">
                <img src={img} alt="پیش‌نمایش" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  className="absolute top-1 left-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              توضیحات تکمیلی
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="نکات برجسته ملک مانند بازسازی، ویو، نورگیر، دسترسی به مراکز خرید و شرایط پرداخت را بنویسید..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="btn-publish-listing"
          className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-900/20 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>انتشار نهایی آگهی در سامانه ملک‌یاب</span>
        </button>

      </form>

    </div>
  );
};
