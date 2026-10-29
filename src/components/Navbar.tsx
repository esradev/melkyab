import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Search, 
  PlusCircle, 
  MessageSquare, 
  UserCheck, 
  LogOut, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Heart,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string, params?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const { 
    currentUser, 
    openAuthModal, 
    logout, 
    toggleUserRole, 
    conversations, 
    setActiveConversationId 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalUnreadMessages = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

  const navigateTo = (page: string, params?: any) => {
    setActivePage(page, params);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button 
              id="nav-brand-logo"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 group text-right focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                  ملک‌<span className="text-emerald-700">یاب</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 -mt-1">سامانه هوشمند املاک و مستغلات</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-700">
              <button
                id="nav-link-home"
                onClick={() => navigateTo('home')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activePage === 'home' 
                    ? 'bg-emerald-50 text-emerald-800 font-bold' 
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                صفحه اصلی
              </button>
              <button
                id="nav-link-search"
                onClick={() => navigateTo('search')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                  activePage === 'search' 
                    ? 'bg-emerald-50 text-emerald-800 font-bold' 
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>جستجو و نقشه هوشمند</span>
              </button>
              <button
                id="nav-link-consultants"
                onClick={() => navigateTo('consultants')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activePage === 'consultants' || activePage === 'consultant-profile'
                    ? 'bg-emerald-50 text-emerald-800 font-bold' 
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                مشاورین برتر
              </button>
              <button
                id="nav-link-trust"
                onClick={() => navigateTo('trust')}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  activePage === 'trust' 
                    ? 'bg-emerald-50 text-emerald-800 font-bold' 
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>امنیت و اصالت سند</span>
              </button>
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Chat button */}
            <button
              id="nav-chat-btn"
              onClick={() => {
                if (conversations.length > 0) {
                  setActiveConversationId(conversations[0].id);
                }
                navigateTo('panel', { tab: 'messages' });
              }}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-emerald-800 transition-all"
              title="پیام‌ها و گفتگوی آنلاین"
            >
              <MessageSquare className="w-5 h-5" />
              {totalUnreadMessages > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {toPersianDigits(totalUnreadMessages)}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="nav-user-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all text-right"
                >
                  <img 
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-600/30"
                  />
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-slate-800 line-clamp-1">{currentUser.name}</span>
                    <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                      <UserCheck className="w-3 h-3" />
                      {currentUser.role === 'consultant' ? 'مشاور رسمی' : 'کاربر تایید شده'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-right animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 dir-ltr text-right">{toPersianDigits(currentUser.phone)}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-800 rounded-md">
                        {currentUser.role === 'consultant' ? 'پنل مشاور املاک' : 'پنل کاربر عادی'}
                      </span>
                    </div>

                    <button
                      onClick={() => navigateTo('panel', { tab: 'overview' })}
                      className="w-full text-right px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4 text-emerald-700" />
                      داشبورد مدیریت و سوابق
                    </button>

                    <button
                      onClick={() => navigateTo('panel', { tab: 'saved' })}
                      className="w-full text-right px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      املاک نشان‌شده ({toPersianDigits(currentUser.savedPropertyIds.length)})
                    </button>

                    <button
                      onClick={() => {
                        toggleUserRole();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-right px-4 py-2.5 text-xs text-amber-700 hover:bg-amber-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <Building2 className="w-4 h-4" />
                      تغییر نقش به {currentUser.role === 'consultant' ? 'کاربر عادی' : 'مشاور املاک'}
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-right px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج از حساب
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={openAuthModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-semibold text-xs hover:border-emerald-600 hover:text-emerald-700 transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                ورود / احراز هویت پیامکی
              </button>
            )}

            {/* Post Ad Button */}
            <button
              id="nav-post-ad-btn"
              onClick={() => {
                if (!currentUser) {
                  openAuthModal();
                } else {
                  navigateTo('new-listing');
                }
              }}
              className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-emerald-900/15 hover:shadow-emerald-900/25 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ثبت رایگان آگهی ملک</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                if (conversations.length > 0) {
                  setActiveConversationId(conversations[0].id);
                }
                navigateTo('panel', { tab: 'messages' });
              }}
              className="relative p-2 rounded-xl text-slate-700 border border-slate-200"
            >
              <MessageSquare className="w-5 h-5" />
              {totalUnreadMessages > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {toPersianDigits(totalUnreadMessages)}
                </span>
              )}
            </button>

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-800">
            <button
              onClick={() => navigateTo('home')}
              className={`p-3 rounded-xl text-right transition-colors ${activePage === 'home' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50'}`}
            >
              صفحه اصلی
            </button>
            <button
              onClick={() => navigateTo('search')}
              className={`p-3 rounded-xl text-right flex items-center gap-2 transition-colors ${activePage === 'search' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50'}`}
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              جستجو و نقشه هوشمند
            </button>
            <button
              onClick={() => navigateTo('consultants')}
              className={`p-3 rounded-xl text-right transition-colors ${activePage === 'consultants' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50'}`}
            >
              مشاورین برتر و رتبه‌بندی
            </button>
            <button
              onClick={() => navigateTo('trust')}
              className={`p-3 rounded-xl text-right flex items-center gap-2 transition-colors ${activePage === 'trust' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50'}`}
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              امنیت، گزارش تخلف و اصالت سند
            </button>
            {currentUser && (
              <button
                onClick={() => navigateTo('panel', { tab: 'overview' })}
                className={`p-3 rounded-xl text-right flex items-center gap-2 transition-colors ${activePage === 'panel' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50'}`}
              >
                <Briefcase className="w-4 h-4 text-emerald-700" />
                پنل مدیریت من ({currentUser.role === 'consultant' ? 'مشاور' : 'کاربر'})
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-lg" />
                  <div className="text-right text-xs">
                    <div className="font-bold">{currentUser.name}</div>
                    <div className="text-slate-500 text-[10px]">{toPersianDigits(currentUser.phone)}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-red-600 font-semibold p-2"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-300 font-bold text-xs text-slate-800"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                ورود / احراز هویت با پیامک
              </button>
            )}

            <button
              onClick={() => {
                if (!currentUser) {
                  openAuthModal();
                } else {
                  navigateTo('new-listing');
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              ثبت رایگان آگهی ملک
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
