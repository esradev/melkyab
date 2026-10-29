/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { ReportModal } from './components/ReportModal';
import { ReviewModal } from './components/ReviewModal';

import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ConsultantsPage } from './pages/ConsultantsPage';
import { ConsultantProfilePage } from './pages/ConsultantProfilePage';
import { PanelPage } from './pages/PanelPage';
import { NewListingPage } from './pages/NewListingPage';
import { TrustPage } from './pages/TrustPage';
import { Property, Consultant } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    currentUser, 
    openAuthModal, 
    toast 
  } = useApp();

  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>({});

  // Active Modals for Property or Consultant
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [reportProperty, setReportProperty] = useState<Property | null>(null);
  const [reviewConsultant, setReviewConsultant] = useState<Consultant | null>(null);

  const handleNavigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Routed Page */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate}
            onOpenBooking={(p) => setBookingProperty(p)}
            onOpenReport={(p) => setReportProperty(p)}
          />
        )}

        {currentPage === 'search' && (
          <SearchPage 
            onNavigate={handleNavigate}
            onOpenBooking={(p) => setBookingProperty(p)}
            onOpenReport={(p) => setReportProperty(p)}
          />
        )}

        {currentPage === 'property-detail' && (
          <PropertyDetailPage 
            propertyId={pageParams.id}
            onNavigate={handleNavigate}
            onOpenBooking={(p) => setBookingProperty(p)}
            onOpenReport={(p) => setReportProperty(p)}
          />
        )}

        {currentPage === 'consultants' && (
          <ConsultantsPage 
            onNavigate={handleNavigate}
            onOpenReview={(c) => setReviewConsultant(c)}
          />
        )}

        {currentPage === 'consultant-profile' && (
          <ConsultantProfilePage 
            consultantId={pageParams.id}
            onNavigate={handleNavigate}
            onOpenReview={(c) => setReviewConsultant(c)}
            onOpenBooking={(p) => setBookingProperty(p)}
            onOpenReport={(p) => setReportProperty(p)}
          />
        )}

        {currentPage === 'panel' && (
          <PanelPage 
            initialTab={pageParams.tab || 'overview'}
            onNavigate={handleNavigate}
            onOpenBooking={(p) => setBookingProperty(p)}
            onOpenReport={(p) => setReportProperty(p)}
          />
        )}

        {currentPage === 'new-listing' && (
          <NewListingPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'trust' && (
          <TrustPage 
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Persian Footer with trust seals */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />

      {bookingProperty && (
        <BookingModal 
          isOpen={true} 
          onClose={() => setBookingProperty(null)} 
          property={bookingProperty} 
        />
      )}

      {reportProperty && (
        <ReportModal 
          isOpen={true} 
          onClose={() => setReportProperty(null)} 
          property={reportProperty} 
        />
      )}

      {reviewConsultant && (
        <ReviewModal 
          isOpen={true} 
          onClose={() => setReviewConsultant(null)} 
          consultant={reviewConsultant} 
        />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
