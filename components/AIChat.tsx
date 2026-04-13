import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatProps {
  lang?: 'en' | 'ar';
}

export const AIChat: React.FC<AIChatProps> = ({ lang = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessage = lang === 'ar' 
    ? 'مرحباً بك في فانيلا أم. أنا مستشارك الشخصي للعطور. كيف يمكنني مساعدتك اليوم؟'
    : 'Welcome to Vanilla OM. I am your personal scent concierge. How may I assist you today?';
    
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: initialMessage, timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat if language changes
  useEffect(() => {
     setMessages([{ id: Date.now().toString(), role: 'model', text: initialMessage, timestamp: Date.now() }]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await getGeminiResponse(userMsg.text, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText || (lang === 'ar' ? "أواجه مشكلة في الاتصال بالأرشيف." : "I'm having trouble connecting to the perfume archives."),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  const isRtl = lang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 z-50 p-4 bg-stone-900 text-gold-200 rounded-full shadow-lg hover:bg-stone-800 transition-all duration-300 hover:scale-105 ${isRtl ? 'left-6' : 'right-6'}`}
        aria-label="Open AI Concierge"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 z-50 w-80 md:w-96 h-[500px] bg-white border border-gold-200 shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-300 font-sans ${isRtl ? 'left-6' : 'right-6'}`}>
          {/* Header */}
          <div className="bg-stone-900 p-4 flex items-center gap-3">
            <div className="bg-gold-400 p-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-stone-900" />
            </div>
            <div>
              <h3 className="text-gold-100 font-serif font-bold">{lang === 'ar' ? 'مستشار فانيلا' : 'Vanilla Concierge'}</h3>
              <p className="text-stone-400 text-xs">Powered by Gemini AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 text-sm ${
                    msg.role === 'user'
                      ? `bg-stone-800 text-white shadow-sm ${isRtl ? 'rounded-t-lg rounded-br-lg' : 'rounded-t-lg rounded-bl-lg'}`
                      : `bg-white border border-stone-200 text-stone-800 shadow-sm ${isRtl ? 'rounded-t-lg rounded-bl-lg' : 'rounded-t-lg rounded-br-lg'}`
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`bg-white border border-stone-200 p-3 shadow-sm flex gap-1 ${isRtl ? 'rounded-t-lg rounded-bl-lg' : 'rounded-t-lg rounded-br-lg'}`}>
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'ar' ? "اسأل عن المكونات، الشحن..." : "Ask about notes, shipping..."}
                className="flex-1 border-stone-200 bg-stone-50 border px-3 py-2 text-sm focus:outline-none focus:border-gold-400 rounded-md"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gold-500 text-white p-2 rounded-md hover:bg-gold-600 disabled:opacity-50"
              >
                <Send className="w-4 h-4 transform rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};