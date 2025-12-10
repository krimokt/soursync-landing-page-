"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 py-16 max-w-6xl mx-auto">
        <div className="relative shadow-2xl shadow-primary/40 rounded-2xl overflow-hidden shrink-0">
          <Image
            className="max-w-md w-full object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=451&h=451&auto=format&fit=crop"
            alt="Team work"
            width={451}
            height={451}
            unoptimized
          />
          <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-card border border-border p-4 rounded-xl shadow-lg">
            <div className="flex -space-x-4 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="Team member"
                width={36}
                height={36}
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1"
                unoptimized
              />
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="Team member"
                width={36}
                height={36}
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]"
                unoptimized
              />
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Team member"
                width={36}
                height={36}
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]"
                unoptimized
              />
              <div className="flex items-center justify-center text-xs text-primary-foreground size-9 rounded-full border-[3px] border-white bg-primary hover:-translate-y-1 transition z-[4]">
                50+
              </div>
            </div>
            <p className="text-sm font-medium text-foreground">Join our developer community</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground max-w-lg">
          <h1 className="text-xl uppercase font-semibold text-foreground">What we do?</h1>
          <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-primary to-primary/60"></div>
          <p className="mt-8">
            SourSync helps you build faster by transforming your sourcing operations into fully functional,
            production-ready workflows.
          </p>
          <p className="mt-4">
            Whether you're managing product sourcing, order tracking, or client communication, our comprehensive platform is crafted to boost your efficiency and improve user experience.
          </p>
          <p className="mt-4">
            From all-in-one sourcing dashboards to automated quotation builders, SourSync empowers you to streamline operations and scale effortlessly.
          </p>
          <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-primary to-primary/80 py-3 px-8 rounded-full text-primary-foreground">
            <span>Read more</span>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}

