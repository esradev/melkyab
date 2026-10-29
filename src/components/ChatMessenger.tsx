import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  MessageSquare, 
  X, 
  CheckCheck, 
  Building2, 
  User, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toPersianDigits } from '../utils/formatters';

interface ChatMessengerProps {
  onSelectProperty?: (propertyId: string) => void;
}

export const ChatMessenger: React.FC<ChatMessengerProps> = ({ onSelectProperty }) => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    currentUser 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage);
    setInputMessage('');
  };

  const quickQuestions = [
    'سلام، آیا امکان بازدید حضوری امروز عصر وجود دارد؟',
    'آیا شرایط سند کاملاً تک‌برگ و بدون ریشه است؟',
    'آیا قیمت نهایی قابل تبدیل یا تخفیف پای معامله هست؟',
    'آیا پارکینگ و انباری به صورت سندی قید شده‌اند؟'
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col md:flex-row h-[650px] max-h-[85vh] text-right">
      
      {/* Left Sidebar: Conversations List */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-l border-slate-200/80 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200/80 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-800" />
              <span>گفتگوهای فعال</span>
            </h3>
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              {toPersianDigits(conversations.length)} گفتگو
            </span>
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.map((conv) => {
            const isSelected = activeConv?.id === conv.id;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full p-3.5 text-right flex items-start gap-3 transition-colors ${
                  isSelected ? 'bg-emerald-50/80 border-r-4 border-emerald-800' : 'hover:bg-slate-100/60'
                }`}
              >
                <img 
                  src={conv.consultant.avatar} 
                  alt={conv.consultant.name} 
                  className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {conv.consultant.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-emerald-800 truncate mb-1">
                    {conv.propertyTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Panel */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Active Chat Header with Property context */}
          <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <img 
                src={activeConv.consultant.avatar} 
                alt={activeConv.consultant.name} 
                className="w-10 h-10 rounded-xl object-cover shrink-0 ring-2 ring-emerald-600/20"
              />
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {activeConv.consultant.name}
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    مشاور آنلاین
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{activeConv.consultant.agency}</p>
              </div>
            </div>

            {/* Property shortcut */}
            <div 
              onClick={() => onSelectProperty && onSelectProperty(activeConv.propertyId)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 cursor-pointer text-xs shrink-0 max-w-[200px]"
            >
              <img 
                src={activeConv.propertyImage} 
                alt="ملک" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div className="overflow-hidden hidden sm:block">
                <p className="text-[11px] font-bold text-slate-800 truncate">{activeConv.propertyTitle}</p>
                <p className="text-[10px] text-emerald-700 font-semibold">{activeConv.propertyPrice}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
            {activeConv.messages.map((msg) => {
              const isMe = msg.senderType === (currentUser?.role === 'consultant' ? 'consultant' : 'buyer');
              return (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-start' : 'items-end'}`}
                >
                  <div 
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMe 
                        ? 'bg-emerald-800 text-white rounded-br-xs' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                    <div className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${
                      isMe ? 'text-emerald-200' : 'text-slate-400'
                    }`}>
                      <span>{toPersianDigits(msg.timestamp)}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Inquiry Chips */}
          <div className="px-3 pt-2 pb-1 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              پرسش‌های سریع:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputMessage(q)}
                className="shrink-0 text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-full transition-colors border border-slate-200/60"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="پیام خود را درباره ملک، مدارک یا تخفیف بنویسید..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs sm:text-sm bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white transition-all shadow-sm shrink-0"
              title="ارسال پیام"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
          <MessageSquare className="w-12 h-12 stroke-[1.5] mb-2" />
          <p className="text-sm font-bold text-slate-600">گفتگویی انتخاب نشده است</p>
          <p className="text-xs">روی یکی از پیام‌های سمت راست کلیک کنید یا از صفحه هر ملک گفتگوی جدید آغاز کنید.</p>
        </div>
      )}
    </div>
  );
};
