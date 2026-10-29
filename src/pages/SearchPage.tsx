import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Map as MapIcon, 
  List, 
  RotateCcw, 
  Check, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MapPin, 
  Layers
} from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { toPersianDigits, formatPrice } from '../utils/formatters';

interface SearchPageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenBooking: (property: Property) => void;
  onOpenReport: (property: Property) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenReport
}) => {
  const { properties, filters, setFilters, resetFilters } = useApp();

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'split' | 'list' | 'map'>('split');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Available amenities for filtering
  const allAmenities = [
    'آسانسور',
    'پارکینگ',
    'انباری',
    'بالکن',
    'استخر',
    'سونا',
    'جکوزی',
    'روف‌گاردن',
    'لابی‌من',
    'سیستم خانه هوشمند KNX',
    'موقعیت اداری'
  ];

  // Filter properties according to smart criteria
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Deal type
      if (filters.dealType !== 'all' && p.dealType !== filters.dealType) {
        return false;
      }
      // Property type
      if (filters.propertyType !== 'all' && p.propertyType !== filters.propertyType) {
        return false;
      }
      // Neighborhood search
      if (filters.neighborhood.trim()) {
        const query = filters.neighborhood.trim().toLowerCase();
        const inNeighborhood = p.neighborhood.toLowerCase().includes(query);
        const inTitle = p.title.toLowerCase().includes(query);
        const inCity = p.city.toLowerCase().includes(query);
        if (!inNeighborhood && !inTitle && !inCity) return false;
      }
      // Bedrooms
      if (filters.bedrooms !== 'all' && p.bedrooms < Number(filters.bedrooms)) {
        return false;
      }
      // Area
      if (p.area < filters.minArea || p.area > filters.maxArea) {
        return false;
      }
      // Buy price
      if (p.dealType === 'buy' && p.price.totalPrice) {
        if (p.price.totalPrice < filters.minPrice || p.price.totalPrice > filters.maxPrice) {
          return false;
        }
      }
      // Rent price
      if (p.dealType === 'rent') {
        if (p.price.mortgage && (p.price.mortgage < filters.minMortgage || p.price.mortgage > filters.maxMortgage)) {
          return false;
        }
      }
      // Amenities
      if (filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((a) =>
          p.amenities.some((pa) => pa.includes(a))
        );
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sort === 'newest') return 0; // Already in order
      if (filters.sort === 'cheapest') {
        const priceA = a.dealType === 'buy' ? a.price.totalPrice || 0 : a.price.mortgage || 0;
        const priceB = b.dealType === 'buy' ? b.price.totalPrice || 0 : b.price.mortgage || 0;
        return priceA - priceB;
      }
      if (filters.sort === 'expensive') {
        const priceA = a.dealType === 'buy' ? a.price.totalPrice || 0 : a.price.mortgage || 0;
        const priceB = b.dealType === 'buy' ? b.price.totalPrice || 0 : b.price.mortgage || 0;
        return priceB - priceA;
      }
      if (filters.sort === 'largest') {
        return b.area - a.area;
      }
      return 0;
    });
  }, [properties, filters]);

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-right">
      
      {/* Top Filter Bar Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Main quick filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            
            {/* Deal Type Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, dealType: 'all' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filters.dealType === 'all' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                همه
              </button>
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, dealType: 'buy' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filters.dealType === 'buy' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                خرید
              </button>
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, dealType: 'rent' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filters.dealType === 'rent' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                رهن و اجاره
              </button>
            </div>

            {/* Neighborhood quick input */}
            <div className="relative flex-1 sm:w-60 min-w-[180px]">
              <input
                type="text"
                value={filters.neighborhood}
                onChange={(e) => setFilters((prev) => ({ ...prev, neighborhood: e.target.value }))}
                placeholder="جستجوی محله یا عنوان..."
                className="w-full pr-8 pl-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>

            {/* Property Type Selector */}
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value as any }))}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-700 bg-white"
            >
              <option value="all">همه کاربری‌ها</option>
              <option value="apartment">آپارتمان</option>
              <option value="penthouse">پنت‌هاوس</option>
              <option value="villa">ویلایی</option>
              <option value="office">اداری</option>
              <option value="commercial">تجاری</option>
            </select>

            {/* Toggle Advanced Filters Button */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                showAdvancedFilters || filters.amenities.length > 0
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>فیلترهای هوشمند</span>
              {filters.amenities.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[9px] flex items-center justify-center font-bold">
                  {toPersianDigits(filters.amenities.length)}
                </span>
              )}
              {showAdvancedFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={resetFilters}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              title="حذف فیلترها"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Results Count & Sort */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-4 text-xs">
            <span className="font-bold text-slate-700">
              {toPersianDigits(filteredProperties.length)} ملک یافت شد
            </span>

            {/* Sorting */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">مرتب‌سازی:</span>
              <select
                value={filters.sort}
                onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value as any }))}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium text-slate-800 bg-white"
              >
                <option value="newest">جدیدترین</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
                <option value="largest">بزرگ‌ترین متراژ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expandable Advanced Filters (Amenities, Bedrooms, Area) */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            
            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                حداقل تعداد خواب
              </label>
              <div className="flex items-center gap-1.5">
                {(['all', 1, 2, 3, 4] as const).map((bed) => (
                  <button
                    key={bed}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, bedrooms: bed }))}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      filters.bedrooms === bed
                        ? 'border-emerald-700 bg-emerald-800 text-white shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {bed === 'all' ? 'همه' : `${toPersianDigits(bed)}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Range */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                متراژ (متر مربع): از {toPersianDigits(filters.minArea)} تا {toPersianDigits(filters.maxArea)} متر
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="40"
                  max="600"
                  step="10"
                  value={filters.maxArea}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxArea: Number(e.target.value) }))}
                  className="w-full accent-emerald-700"
                />
              </div>
            </div>

            {/* Amenities Checklist */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                امکانات و ویژگی‌های اختصاصی
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allAmenities.map((a) => {
                  const isChecked = filters.amenities.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAmenity(a)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isChecked
                          ? 'border-emerald-700 bg-emerald-800 text-white font-bold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                      <span>{a}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Switcher (Map vs List) */}
      <div className="lg:hidden flex items-center justify-center p-1 bg-slate-100 rounded-2xl mb-4">
        <button
          onClick={() => setMobileView('list')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileView === 'list' || mobileView === 'split' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          <List className="w-4 h-4" />
          <span>لیست املاک ({toPersianDigits(filteredProperties.length)})</span>
        </button>
        <button
          onClick={() => setMobileView('map')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileView === 'map' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          <MapIcon className="w-4 h-4" />
          <span>مشاهده روی نقشه</span>
        </button>
      </div>

      {/* Main Split Layout: Properties List & Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Properties Grid: 7 columns on desktop */}
        <div className={`lg:col-span-7 space-y-4 ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
              <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">ملکی با این فیلترها یافت نشد</h3>
              <p className="text-xs text-slate-500 mb-4">لطفاً محدوده قیمت یا محله مورد جستجو را گسترش دهید.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl"
              >
                بازنشانی تمام فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  onMouseEnter={() => setSelectedPropertyId(prop.id)}
                >
                  <PropertyCard
                    property={prop}
                    onSelect={(p) => onNavigate('property-detail', { id: p.id })}
                    onOpenBooking={onOpenBooking}
                    onOpenReport={onOpenReport}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Leaflet Map: 5 columns on desktop */}
        <div className={`lg:col-span-5 sticky top-24 h-[600px] lg:h-[750px] ${
          mobileView === 'list' ? 'hidden lg:block' : 'block'
        }`}>
          <PropertyMap
            properties={filteredProperties}
            selectedPropertyId={selectedPropertyId}
            onSelectProperty={(prop) => onNavigate('property-detail', { id: prop.id })}
          />
        </div>

      </div>

    </div>
  );
};
