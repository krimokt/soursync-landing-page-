"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { WaitlistModal } from "@/components/ui/waitlist-modal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    num: "01",
    problem: "Scattered tools",
    problemDetail:
      "WhatsApp for clients. Excel for tracking. Email for quotes. WeChat for suppliers. Nothing talks to anything. Every order lives in ten different places.",
    solution: "One centralized platform",
    solutionDetail:
      "Every client, order, quote, and shipment lives in one workspace. You open one tab and see everything. Your clients do too.",
  },
  {
    num: "02",
    problem: "Manual quotations",
    problemDetail:
      "Building quotes in Excel, copying prices, adjusting margins, formatting PDFs, sending over WhatsApp, chasing approval. Hours for one quote.",
    solution: "Structured templates in seconds",
    solutionDetail:
      "Create professional, branded quotes with cost breakdowns in minutes. Clients approve directly inside their portal. No back-and-forth.",
  },
  {
    num: "03",
    problem: "WhatsApp chaos",
    problemDetail:
      "Clients asking for updates 3 times a day. You searching through 200 messages to find the one shipping detail. Status updates buried in threads.",
    solution: "Professional client portal",
    solutionDetail:
      "Every client logs into their own secure portal and sees their orders, shipment status, and payments — in real time. The questions stop.",
  },
  {
    num: "04",
    problem: "Lost in spreadsheets",
    problemDetail:
      "Payment tracking in one sheet, orders in another, suppliers in a third. One wrong cell and the whole picture breaks. Nothing is real-time.",
    solution: "Real-time order & payment tracking",
    solutionDetail:
      "Orders, payments, and shipping stages are updated once and visible everywhere — to you and your client — instantly and accurately.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create your workspace",
    detail:
      "Add your clients, import your product catalog, and save your supplier contacts. Setup takes less than a day.",
  },
  {
    step: "02",
    title: "Manage operations",
    detail:
      "Quotations flow into orders. Orders track through shipping stages. Payments log as they happen. Every step is visible.",
  },
  {
    step: "03",
    title: "Share with clients",
    detail:
      "Clients log into their own portal and see everything in real time. No more update requests. No more WhatsApp threads.",
  },
];

export function SolutionPageContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const problemsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = problemsRef.current?.querySelectorAll(".problem-row");
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: problemsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      const stepEls = stepsRef.current?.querySelectorAll(".how-step");
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-5">
              The Solution
            </p>
            <h1
              className="font-display font-extrabold text-foreground text-4xl md:text-6xl lg:text-7xl max-w-4xl mb-6"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Stop managing sourcing in WhatsApp and Excel.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              SourSync replaces the tool chaos that every sourcing agent runs on. One
              platform for your operations, your clients, and your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Problem / Solution Rows ──────────────────────────── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-4">
              The Problem
            </p>
            <h2
              className="font-display font-extrabold text-foreground text-3xl md:text-4xl max-w-xl"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              What sourcing agents deal with every day.
            </h2>
          </motion.div>
        </div>

        <div ref={problemsRef}>
          {problems.map((item) => (
            <div
              key={item.num}
              className="problem-row border-t border-border"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Problem side */}
                  <div className="py-10 md:py-14 pr-0 md:pr-12 md:border-r border-border bg-red-50/40 dark:bg-red-950/10 -mx-4 md:mx-0 px-4 md:px-0">
                    <p
                      className="font-display font-extrabold text-foreground/10 select-none mb-4"
                      style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 1 }}
                      aria-hidden
                    >
                      {item.num}
                    </p>
                    <h3
                      className="font-display font-bold text-foreground text-xl md:text-2xl mb-3"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {item.problem}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                      {item.problemDetail}
                    </p>
                  </div>

                  {/* Solution side */}
                  <div className="py-10 md:py-14 pl-0 md:pl-12 bg-cyan-50/30 dark:bg-cyan-950/10 -mx-4 md:mx-0 px-4 md:px-0">
                    <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-4">
                      Solution
                    </p>
                    <h3
                      className="font-display font-bold text-foreground text-xl md:text-2xl mb-3"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {item.solution}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                      {item.solutionDetail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-4">
              How it works
            </p>
            <h2
              className="font-display font-extrabold text-foreground text-3xl md:text-5xl max-w-xl"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Three steps to a professional operation.
            </h2>
          </motion.div>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s) => (
              <div
                key={s.step}
                className="how-step border-t-2 border-[rgb(6,182,212)] pt-8"
              >
                <p
                  className="font-display font-extrabold text-foreground/8 select-none mb-4"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1 }}
                  aria-hidden
                >
                  {s.step}
                </p>
                <h3
                  className="font-display font-semibold text-foreground text-xl mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(6,182,212)] font-bold mb-4">
              Get started
            </p>
            <h2
              className="font-display font-extrabold text-foreground text-3xl md:text-5xl max-w-2xl mb-4"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              The system your operation deserves.
            </h2>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              14-day free trial. No credit card required. Cancel anytime.
            </p>
            <button
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center gap-2 bg-[rgb(6,182,212)] text-black font-bold px-7 py-3.5 rounded-xl hover:bg-[rgb(6,182,212)]/90 transition-colors text-sm"
            >
              Start your free 14-day trial
            </button>
          </motion.div>
        </div>
      </section>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        source="solution"
      />
    </>
  );
}
