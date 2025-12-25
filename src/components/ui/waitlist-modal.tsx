'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Mail, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToWaitlist, trackCTAClick } from '@/lib/waitlist'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  planName?: string
  source?: string
}

export function WaitlistModal({ isOpen, onClose, planName, source = 'pricing' }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Track CTA click
      trackCTAClick('pricing_modal_waitlist', planName)

      // Add to waitlist
      await addToWaitlist({
        email,
        source,
        plan_interest: planName,
      })

      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setEmail('')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setTimeout(() => {
        setEmail('')
        setError('')
        setIsSuccess(false)
      }, 300)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-2xl shadow-xl max-w-md w-full p-6 relative"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgb(6,182,212)]/10 mb-4">
                  <Mail className="w-6 h-6 text-[rgb(6,182,212)]" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Join the Waitlist
                </h2>
                {planName && (
                  <p className="text-sm text-muted-foreground">
                    Interested in the <span className="text-[rgb(6,182,212)] font-medium">{planName}</span> plan
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Be among the first to get early access when we launch
                </p>
              </div>

              {/* Success State */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-1">You're on the list!</p>
                  <p className="text-sm text-muted-foreground">We'll notify you when we launch.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgb(6,182,212)] focus:border-transparent transition-all disabled:opacity-50"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      initial={false}
                      animate={{
                        boxShadow: email
                          ? '0 0 0 2px rgba(6,182,212,0.1)'
                          : '0 0 0 0px rgba(6,182,212,0)',
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full bg-[rgb(6,182,212)] hover:bg-[rgb(6,182,212)]/90 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      'Join Waitlist'
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Early access • Priority support • Exclusive updates
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}




