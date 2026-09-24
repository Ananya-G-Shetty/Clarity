'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Citation } from '@/types';
import {
  MessageSquare,
  Send,
  Sparkles,
  BookmarkCheck,
  AlertCircle,
  HelpCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface ChatWidgetProps {
  documentText: string;
  docTitle: string;
  suggestedQuestions?: string[];
  apiKey?: string;
}

export function ChatWidget({
  documentText,
  docTitle,
  suggestedQuestions = [],
  apiKey = '',
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am Clarity’s Document Q&A assistant. I am strictly grounded in "${docTitle}". You can ask me any question about obligations, deadlines, penalties, or restrictions. Every answer will cite the source clause, and if a topic is absent from the contract, I will explicitly confirm it is not found.`,
      citations: [],
      notFoundInDoc: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultPrompts = [
    'Can the landlord withhold my deposit without receipts?',
    'What happens if I terminate before the 6-month lock-in period?',
    'Am I allowed to work on side projects outside work hours?',
    'Does this document provide maternity or health insurance benefits?', // Grounding test
  ];

  const displayPrompts = suggestedQuestions.length > 0 ? suggestedQuestions.slice(0, 4) : defaultPrompts;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      citations: [],
      notFoundInDoc: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (apiKey) headers['x-gemini-key'] = apiKey;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          question: q,
          documentText,
          docTitle,
          apiKey,
        }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: json.data.answer,
          citations: json.data.citations || [],
          notFoundInDoc: !!json.data.notFoundInDoc,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: json.error || 'Sorry, I encountered an error while analyzing the document context.',
          citations: [],
          notFoundInDoc: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: 'Network error: Unable to retrieve grounded answer. Please try again.',
        citations: [],
        notFoundInDoc: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `Chat reset. Ready to answer your questions grounded strictly in "${docTitle}".`,
        citations: [],
        notFoundInDoc: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[700px] animate-in fade-in duration-200">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-lg">
            <MessageSquare className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Strict Document-Grounded Q&A</span>
              <span className="text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                Zero-Hallucination Guardrail
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Scoped strictly to: <strong className="text-slate-700">{docTitle}</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetChat}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md transition-colors text-xs flex items-center gap-1.5"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3 bg-indigo-50/40 border-b border-indigo-100/80 flex items-center gap-2 overflow-x-auto text-xs">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1" aria-hidden="true" />
        <span className="text-indigo-900 font-semibold shrink-0">Try asking:</span>
        <div className="flex items-center gap-2">
          {displayPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              disabled={loading}
              className="px-2.5 py-1 bg-white hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-full text-[11px] whitespace-nowrap transition-colors shadow-2xs font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread (with aria-live for screen readers) */}
      <div
        aria-live="polite"
        role="log"
        aria-label="Document grounded chat history"
        className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-xs'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
              }`}
            >
              {/* Message Text */}
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Citations Box (Mandatory Requirement) */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700">
                    <BookmarkCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Cited Document Clauses:</span>
                  </div>
                  {msg.citations.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-700 font-mono"
                    >
                      <strong className="text-slate-900 block font-sans font-semibold mb-0.5">
                        {c.clauseTitle}
                      </strong>
                      <span className="italic text-slate-600">&ldquo;{c.sectionQuote}&rdquo;</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Not Found in Document Badge */}
              {msg.notFoundInDoc && (
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Verified Not Present: This clause/term is completely absent from the document.</span>
                </div>
              )}

              <span
                className={`block text-[10px] mt-1.5 ${
                  msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs p-4 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" aria-hidden="true" />
              <span>Analyzing document clauses and retrieving citations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
      >
        <label htmlFor="chat-input-field" className="sr-only">
          Ask a question about the document
        </label>
        <input
          id="chat-input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything about ${docTitle}...`}
          disabled={loading}
          className="flex-1 text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-indigo-600"
          title="Send Question"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Send Question</span>
        </button>
      </form>
    </div>
  );
}
