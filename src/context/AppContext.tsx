import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Property, 
  Consultant, 
  Review, 
  BookingVisit, 
  Conversation, 
  UserProfile, 
  SearchFilters, 
  ViolationReport,
  ChatMessage
} from '../types';
import { 
  INITIAL_PROPERTIES, 
  INITIAL_CONSULTANTS, 
  INITIAL_REVIEWS, 
  INITIAL_BOOKINGS, 
  INITIAL_CONVERSATIONS, 
  CURRENT_USER 
} from '../data/mockData';

interface AppContextType {
  properties: Property[];
  consultants: Consultant[];
  reviews: Review[];
  bookings: BookingVisit[];
  conversations: Conversation[];
  currentUser: UserProfile | null;
  reports: ViolationReport[];
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;
  // Auth
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithPhone: (phone: string, name?: string, role?: 'user' | 'consultant') => void;
  logout: () => void;
  toggleUserRole: () => void;
  // Properties
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'savesCount'>) => string;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleSaveProperty: (id: string) => void;
  isPropertySaved: (id: string) => boolean;
  // Bookings
  addBooking: (booking: Omit<BookingVisit, 'id' | 'createdAt' | 'status'>) => string;
  updateBookingStatus: (id: string, status: BookingVisit['status']) => void;
  // Chat
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrOpenConversation: (propertyId: string, consultantId: string) => string;
  // Reviews & Reports
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  addReport: (report: Omit<ViolationReport, 'id' | 'trackingCode' | 'createdAt' | 'status'>) => string;
  // Quick Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_FILTERS: SearchFilters = {
  dealType: 'all',
  propertyType: 'all',
  city: 'تهران',
  neighborhood: '',
  minPrice: 0,
  maxPrice: 100_000_000_000,
  minMortgage: 0,
  maxMortgage: 10_000_000_000,
  minRent: 0,
  maxRent: 150_000_000,
  minArea: 0,
  maxArea: 1000,
  bedrooms: 'all',
  amenities: [],
  sort: 'newest',
  hasImagesOnly: false,
  urgentOnly: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('melkyab_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [consultants, setConsultants] = useState<Consultant[]>(() => {
    const saved = localStorage.getItem('melkyab_consultants');
    return saved ? JSON.parse(saved) : INITIAL_CONSULTANTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('melkyab_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [bookings, setBookings] = useState<BookingVisit[]>(() => {
    const saved = localStorage.getItem('melkyab_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('melkyab_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('melkyab_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [reports, setReports] = useState<ViolationReport[]>(() => {
    const saved = localStorage.getItem('melkyab_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('melkyab_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('melkyab_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('melkyab_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('melkyab_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('melkyab_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('melkyab_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('melkyab_user');
    }
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginWithPhone = (phone: string, name: string = 'کاربر محترم', role: 'user' | 'consultant' = 'user') => {
    const user: UserProfile = {
      id: 'u_' + Date.now(),
      name: name.trim() || 'کاربر ملک‌یاب',
      phone,
      role,
      agencyName: role === 'consultant' ? 'دپارتمان املاک نوین' : undefined,
      licenseCode: role === 'consultant' ? 'ش-' + Math.floor(100000 + Math.random() * 900000) : undefined,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      savedPropertyIds: ['p1']
    };
    setCurrentUser(user);
    closeAuthModal();
    showToast(`خوش آمدید، ${user.name}! احراز هویت پیامکی با موفقیت انجام شد.`);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('شما با موفقیت از حساب کاربری خارج شدید.');
  };

  const toggleUserRole = () => {
    if (!currentUser) return;
    const newRole = currentUser.role === 'user' ? 'consultant' : 'user';
    setCurrentUser({
      ...currentUser,
      role: newRole,
      agencyName: newRole === 'consultant' ? (currentUser.agencyName || 'دپارتمان تخصصی املاک نگین') : undefined,
      licenseCode: newRole === 'consultant' ? (currentUser.licenseCode || 'ش-۹۸۴۱۲۰') : undefined
    });
    showToast(newRole === 'consultant' ? 'پنل کاربری به حالت مشاور املاک تغییر کرد.' : 'پنل کاربری به حالت متقاضی / خریدار تغییر کرد.');
  };

  const addProperty = (data: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'savesCount'>): string => {
    const newId = 'p_' + Date.now();
    const newProp: Property = {
      ...data,
      id: newId,
      createdAt: 'امروز',
      viewsCount: 1,
      savesCount: 0
    };
    setProperties((prev) => [newProp, ...prev]);
    showToast('آگهی ملک با موفقیت منتشر و در نقشه ثبت شد.');
    return newId;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('تغییرات آگهی با موفقیت اعمال شد.');
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast('آگهی ملک با موفقیت حذف گردید.');
  };

  const toggleSaveProperty = (id: string) => {
    if (!currentUser) {
      openAuthModal();
      return;
    }
    const isSaved = currentUser.savedPropertyIds.includes(id);
    const updatedIds = isSaved
      ? currentUser.savedPropertyIds.filter((item) => item !== id)
      : [...currentUser.savedPropertyIds, id];

    setCurrentUser({ ...currentUser, savedPropertyIds: updatedIds });
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, savesCount: Math.max(0, p.savesCount + (isSaved ? -1 : 1)) } : p
      )
    );
    showToast(isSaved ? 'ملک از لیست نشان‌شده‌ها حذف شد' : 'ملک به لیست نشان‌شده‌ها افزوده شد');
  };

  const isPropertySaved = (id: string): boolean => {
    return currentUser?.savedPropertyIds.includes(id) ?? false;
  };

  const addBooking = (bookingData: Omit<BookingVisit, 'id' | 'createdAt' | 'status'>): string => {
    const newId = 'b_' + Date.now();
    const newBooking: BookingVisit = {
      ...bookingData,
      id: newId,
      status: 'pending',
      createdAt: 'امروز'
    };
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`درخواست بازدید شما برای تاریخ ${newBooking.date} ثبت شد و به مشاور پیامک گردید.`);
    return newId;
  };

  const updateBookingStatus = (id: string, status: BookingVisit['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    const statusText = status === 'confirmed' ? 'تایید شد' : status === 'cancelled' ? 'لغو شد' : 'بروزرسانی شد';
    showToast(`وضعیت نوبت بازدید ${statusText}.`);
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      conversationId,
      senderId: currentUser?.id || 'u1',
      senderName: currentUser?.name || 'خریدار',
      senderType: currentUser?.role === 'consultant' ? 'consultant' : 'buyer',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: newMessage.text,
            lastMessageTime: 'هم‌اکنون',
            messages: [...conv.messages, newMessage]
          };
        }
        return conv;
      })
    );

    // Simulate real-time realistic consultant response after 2 seconds if user sent it
    if (currentUser?.role !== 'consultant') {
      setTimeout(() => {
        const replies = [
          'سلام و درود، پیام شما دریافت شد. با کمال میل در خدمتتون هستم. آیا مایلید هماهنگی برای بازدید فردا انجام بشه؟',
          'سلام وقتتون بخیر. بله شرایط این ملک کاملاً مطابق توضیحات است و امکان نشست با مالک هم وجود دارد.',
          'درود، مدارک و سند این ملک به‌طور کامل استعلام شده و بدون ریشه است. در صورت تمایل شماره تماس مستقیم بدید تا فایل‌های مشابه رو هم بفرستم.'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const autoReply: ChatMessage = {
          id: 'msg_reply_' + Date.now(),
          conversationId,
          senderId: 'consultant_auto',
          senderName: 'مشاور املاک',
          senderType: 'consultant',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        };

        setConversations((innerPrev) =>
          innerPrev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                lastMessage: autoReply.text,
                lastMessageTime: 'هم‌اکنون',
                messages: [...conv.messages, autoReply]
              };
            }
            return conv;
          })
        );
      }, 2000);
    }
  };

  const startOrOpenConversation = (propertyId: string, consultantId: string): string => {
    const existing = conversations.find((c) => c.propertyId === propertyId);
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const prop = properties.find((p) => p.id === propertyId);
    const consultant = consultants.find((c) => c.id === consultantId) || consultants[0];

    const newConvId = 'conv_' + Date.now();
    const newConv: Conversation = {
      id: newConvId,
      propertyId,
      propertyTitle: prop ? prop.title : 'ملک پیشنهادی',
      propertyPrice: prop?.dealType === 'buy' ? `${prop.price.totalPrice} تومان` : 'ودیعه و اجاره',
      propertyImage: prop?.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80',
      participantUser: {
        id: currentUser?.id || 'u1',
        name: currentUser?.name || 'کاربر ملک‌یاب',
        phone: currentUser?.phone || '۰۹۱۲۵۵۵۷۷۲۲'
      },
      consultant: {
        id: consultant.id,
        name: consultant.name,
        agency: consultant.agencyName,
        avatar: consultant.avatar
      },
      lastMessage: 'گفتگو با مشاور آغاز شد.',
      lastMessageTime: 'هم‌اکنون',
      unreadCount: 0,
      messages: [
        {
          id: 'msg_start_' + Date.now(),
          conversationId: newConvId,
          senderId: consultant.id,
          senderName: consultant.name,
          senderType: 'consultant',
          text: `سلام! من ${consultant.name} مشاور این ملک در ${consultant.agencyName} هستم. چطور می‌تونم راهنمایی‌تون کنم؟`,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          isRead: true
        }
      ]
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    return newConvId;
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newId = 'rev_' + Date.now();
    const newRev: Review = {
      ...reviewData,
      id: newId,
      date: '۱۴۰۳/۰۶/۲۰',
      helpfulCount: 0
    };
    setReviews((prev) => [newRev, ...prev]);

    // Recalculate consultant rating
    const cReviews = [...reviews.filter((r) => r.consultantId === reviewData.consultantId), newRev];
    const avgRating = Number((cReviews.reduce((acc, curr) => acc + curr.overallRating, 0) / cReviews.length).toFixed(1));
    setConsultants((prev) =>
      prev.map((c) =>
        c.id === reviewData.consultantId
          ? { ...c, rating: avgRating, reviewCount: c.reviewCount + 1 }
          : c
      )
    );
    showToast('نظر و امتیاز شما با موفقیت ثبت گردید.');
  };

  const addReport = (reportData: Omit<ViolationReport, 'id' | 'trackingCode' | 'createdAt' | 'status'>): string => {
    const code = 'REP-' + Math.floor(10000 + Math.random() * 90000);
    const newReport: ViolationReport = {
      ...reportData,
      id: 'rep_' + Date.now(),
      trackingCode: code,
      status: 'submitted',
      createdAt: 'امروز'
    };
    setReports((prev) => [newReport, ...prev]);
    showToast(`گزارش تخلف با کد پیگیری ${code} ثبت شد و توسط تیم بازرسی پیگیری خواهد شد.`);
    return code;
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        consultants,
        reviews,
        bookings,
        conversations,
        currentUser,
        reports,
        filters,
        setFilters,
        resetFilters,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithPhone,
        logout,
        toggleUserRole,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleSaveProperty,
        isPropertySaved,
        addBooking,
        updateBookingStatus,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startOrOpenConversation,
        addReview,
        addReport,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
