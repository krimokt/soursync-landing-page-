"use client";

import React, { useState, useEffect } from "react";
import { X, Send, MessageCircle, Minimize2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type AgentStatus = "searching" | "connecting" | "connected";

export const ChatSupportWidget = React.memo(function ChatSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("searching");
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    sender: string;
    timestamp: Date;
  }>>([]);

  // Simulate agent connection when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setAgentStatus("searching");
      
      // Simulate searching for agent
      const searchTimeout = setTimeout(() => {
        setAgentStatus("connecting");
      }, 1500);

      // Simulate connecting to agent
      const connectTimeout = setTimeout(() => {
        setAgentStatus("connected");
        // Add welcome message when agent connects
        if (messages.length === 0) {
          setMessages([
            {
              id: 1,
              text: "Hello! I'm Sarah, your support agent. How can I help you today?",
              sender: "support",
              timestamp: new Date(),
            },
          ]);
        }
      }, 3000);

      return () => {
        clearTimeout(searchTimeout);
        clearTimeout(connectTimeout);
      };
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate support response after 1 second
    setTimeout(() => {
      const supportResponse = {
        id: messages.length + 2,
        text: "Thank you for your message! Our support team will get back to you shortly. In the meantime, feel free to browse our FAQ section.",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "bg-[rgb(6,182,212)] text-white",
          "shadow-lg shadow-[rgb(6,182,212)]/30",
          "flex items-center justify-center",
          "transition-all duration-300",
          "hover:shadow-xl hover:shadow-[rgb(6,182,212)]/40",
          "focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)] focus:ring-offset-2"
        )}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0, scale: isOpen ? 0 : 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        aria-label="Open Support Chat"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.div>
        
        {/* Pulse animation ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[rgb(6,182,212)]"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed bottom-6 right-6 z-50",
              "w-96 max-w-[calc(100vw-3rem)]",
              "bg-card rounded-2xl shadow-2xl",
              "border border-border",
              "flex flex-col",
              "overflow-hidden"
            )}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: isMinimized ? 0.95 : 1,
              height: isMinimized ? 60 : 600,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ maxHeight: '600px' }}
          >
            {/* Header */}
            <div className="bg-[rgb(6,182,212)] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {agentStatus === "connected" ? (
                    <MessageCircle className="w-5 h-5" />
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                  )}
                  {agentStatus === "connected" && (
                    <motion.div
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[rgb(6,182,212)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-sm">Support Chat</h3>
                  <div className="flex items-center gap-2">
                    {agentStatus === "searching" && (
                      <motion.p
                        className="text-xs text-white/90 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span>Searching for agent</span>
                        <TypingDots />
                      </motion.p>
                    )}
                    {agentStatus === "connecting" && (
                      <motion.p
                        className="text-xs text-white/90 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span>Connecting</span>
                        <TypingDots />
                      </motion.p>
                    )}
                    {agentStatus === "connected" && (
                      <motion.p
                        className="text-xs text-white/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Agent connected
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2",
                          msg.sender === "user"
                            ? "bg-[rgb(6,182,212)] text-white"
                            : "bg-card border border-border text-foreground"
                        )}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            msg.sender === "user"
                              ? "text-white/70"
                              : "text-muted-foreground"
                          )}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)] focus:border-transparent text-sm"
                    />
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-full bg-[rgb(6,182,212)] text-white flex items-center justify-center hover:bg-[rgb(6,182,212)]/90 transition-colors"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

// Typing dots animation component
const TypingDots = () => {
  return (
    <span className="flex items-center gap-0.5">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="w-1 h-1 bg-white/90 rounded-full"
          animate={{
            y: [0, -4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
};

