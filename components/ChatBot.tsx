import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MinusCircle, User, Bot, Sparkles, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendMessageToBot, generateSpeech } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Dynamic Welcome Message - Updates when language changes
  useEffect(() => {
    let welcomeText = "";
    if (language === 'es') welcomeText = t('chat.welcome_es');
    else if (language === 'de') welcomeText = t('chat.welcome_de');
    else welcomeText = t('chat.welcome_en');

    // Only update if it's the first message or if we are resetting
    setMessages(prev => {
      if (prev.length === 0) {
        return [{ id: 'welcome', role: 'bot', text: welcomeText }];
      }
      // If the first message is the welcome message, update it
      if (prev.length > 0 && prev[0].id === 'welcome') {
          const newMessages = [...prev];
          newMessages[0] = { ...newMessages[0], text: welcomeText };
          return newMessages;
      }
      return prev;
    });
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToBot(text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: "Lo siento, hubo un error de conexión." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    await generateSpeech(text);
    setIsSpeaking(false);
  };

  // Re-generate suggestions when language changes
  const suggestions = [
    t('chat.suggestion_search'),
    t('chat.suggestion_recommend'),
    t('chat.suggestion_advice'),
    // t('chat.suggestion_translate') // Removed fourth one to keep UI clean
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-accent text-white p-4 rounded-full shadow-2xl hover:bg-amber-700 transition-all duration-300 z-50 hover:scale-110 group"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 flex flex-col overflow-hidden ${isMinimized ? 'w-72 h-14' : 'w-96 h-[500px]'}`}>
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-3 flex justify-between items-center shrink-0 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-2">
           <div className="bg-amber-500 p-1.5 rounded-full">
              <Sparkles size={14} className="text-white" />
           </div>
           <div>
              <h3 className="font-serif font-bold text-sm leading-none">{t('chat.header')}</h3>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">AI Research Agent</span>
           </div>
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
           <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-amber-400"><MinusCircle size={18} /></button>
           <button onClick={() => setIsOpen(false)} className="hover:text-amber-400"><X size={18} /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-amber-100'}`}>
                  {msg.role === 'user' ? <User size={16} className="text-gray-600"/> : <Bot size={16} className="text-amber-700"/>}
                </div>
                <div className="max-w-[80%] flex flex-col gap-1">
                    <div className={`p-3 rounded-lg text-sm shadow-sm ${msg.role === 'user' ? 'bg-white text-gray-800 rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                        {msg.role === 'user' ? (
                            msg.text
                        ) : (
                            <div className="prose prose-sm prose-amber max-w-none">
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                    {msg.role === 'bot' && (
                        <button 
                            onClick={() => handleSpeak(msg.text)}
                            disabled={isSpeaking}
                            className={`self-start text-[10px] flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors ${isSpeaking ? 'opacity-50' : ''}`}
                            title="Escuchar respuesta"
                        >
                            <Volume2 size={12} /> {isSpeaking ? '...' : 'Escuchar'}
                        </button>
                    )}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-amber-700"/>
                 </div>
                 <div className="bg-white p-3 rounded-lg rounded-tl-none border border-gray-100 text-gray-400 text-xs flex items-center gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && (
            <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
                {suggestions.map((sugg, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSend(sugg)}
                        className="whitespace-nowrap px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-amber-50 hover:border-amber-200 transition-colors"
                    >
                        {sugg}
                    </button>
                ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="p-2 bg-accent text-white rounded-full hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;