import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getChatbotResponse, getImage } from '@/lib/utilityFunctions';

interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
  image_url?: string | null;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      content: "Hi! I'm Stokis AI. How can I help you with stocks or market insights today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);
    try {
      const data = await getChatbotResponse(userMessage.content);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          content: data.response || "Sorry, I couldn't understand that.",
          image_url: data.image_url ? getImage(data.image_url) : null,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          content: "Sorry, there was an error getting a response. Please try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 mt-0 mb-0 h-[calc(100vh-30px)] overflow-hidden backdrop-blur-sm">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 rounded-t-2xl shrink-0 bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-lg"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Stokis AI
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered Stock Assistant
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm shrink-0 mt-1">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-3xl text-base whitespace-pre-line relative overflow-hidden ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-lg shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-bl-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm'
                  }`}
                >
                  {msg.role === 'user' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 pointer-events-none" />
                  )}
                  <div className="relative z-10">
                    {msg.content}
                    {msg.image_url && (
                      <img 
                        src={msg.image_url} 
                        alt="Chart or visualization" 
                        className="mt-3 rounded-xl max-w-full h-auto border border-slate-200/50 dark:border-slate-600/50"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isSending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-3 max-w-[85%]">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm shrink-0 mt-1">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-3xl rounded-bl-lg bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative px-4 py-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-lg rounded-b-2xl shrink-0"
      >
        <form
          className="flex items-end gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div className="flex-1 relative">
            <Textarea
              className="resize-none min-h-[52px] max-h-32 text-base bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500/50 dark:focus:border-blue-400/50 focus:ring-0 rounded-2xl px-4 py-3 pr-12 shadow-sm backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="Ask me anything about stocks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              rows={1}
              disabled={isSending}
            />
            <div className="absolute right-3 bottom-3 text-xs text-slate-400 dark:text-slate-500 pointer-events-none">
              {input.length > 0 && `${input.length} chars`}
            </div>
          </div>
          <Button
            type="submit"
            className="h-[52px] px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white border-0 rounded-2xl shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:hover:scale-100"
            disabled={!input.trim() || isSending}
          >
            <motion.div
              animate={isSending ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: isSending ? Infinity : 0, ease: "linear" }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          </Button>
        </form>
      </motion.div>
    </div>
  );
} 