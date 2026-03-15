"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Timer } from 'lucide-react';
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

// --- KOMPONEN UTAMA (Yang merender semua section) ---
export default function Page() {
  return (
    <main>
      <HeroSection />
      <CelebrationSection />
      <ChatSection />
    </main>
  );
}

// --- SECTION 1: HERO & COUNTDOWN ---
function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("March 20, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    const audio = document.getElementById("audio-takbir") as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      // SET AUDIO KE DETIK 11 sebelum play
      if (audio.currentTime === 0) {
        audio.currentTime = 11; 
      }
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative min-h-screen bg-[#0A192F] flex flex-col items-center justify-center text-white p-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>

      <div className="z-10 text-center">
        <h2 className="text-xl md:text-2xl font-light mb-4 flex items-center justify-center gap-2">
          <Timer className="w-6 h-6" /> Menuju Hari Kemenangan
        </h2>
        
        <div className="flex gap-4 md:gap-8 text-4xl md:text-7xl font-bold mb-10">
          <div className="flex flex-col"><span>{timeLeft.days}</span><span className="text-sm font-light uppercase tracking-widest">Hari</span></div>
          <span>:</span>
          <div className="flex flex-col"><span>{timeLeft.hours}</span><span className="text-sm font-light uppercase tracking-widest">Jam</span></div>
          <span>:</span>
          <div className="flex flex-col"><span>{timeLeft.minutes}</span><span className="text-sm font-light uppercase tracking-widest">Menit</span></div>
          <span>:</span>
          <div className="flex flex-col"><span>{timeLeft.seconds}</span><span className="text-sm font-light uppercase tracking-widest">Detik</span></div>
        </div>

        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <button onClick={toggleAudio} className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-400 transition-colors">
            {isPlaying ? <Pause className="fill-white" /> : <Play className="fill-white ml-1" />}
          </button>
          <div className="text-left pr-2">
            <p className="text-xs font-semibold">Putar Takbiran</p>
            <p className="text-[10px] opacity-70">Gema Takbir Syawal</p>
          </div>
        </div>

        <audio id="audio-takbir" loop>
          <source src="/audio/takbiran.mp3" type="audio/mpeg" />
        </audio>
      </div>

      <div className="absolute bottom-10 animate-bounce opacity-50 text-center">
        <p className="text-xs mb-2 italic text-white">Scroll ke bawah</p>
        <div className="w-[1px] h-10 bg-white mx-auto"></div>
      </div>
    </section>
  );
}

// --- SECTION 2: CELEBRATION ---
function CelebrationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Amount 0.3 biar lebih cepat terdeteksi saat scroll

  useEffect(() => {
    if (isInView) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden relative border-t border-gray-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1.2 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-6xl mb-4"
      >
        🧨 🎇
      </motion.div>

      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-8xl font-black text-emerald-600 text-center leading-tight"
      >
        HAPPY EID <br /> MUBARAK
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="mt-4 text-gray-500 text-xl font-medium"
      >
        1447 Hijriah
      </motion.p>

      <div className="flex gap-8 mt-12">
        {["🌙", "🕌", "🥣", "🎁"].map((icon, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 + (index * 0.2) }}
            className="text-4xl"
          >
            {icon}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

// --- SECTION 3: THE CHAT ---
function ChatSection() {
  const messages = [
    { id: 1, name: "Talitha", msg: "Selamat makan nastar semuanya! 🍍", side: "left", color: "bg-emerald-100" },
    { id: 2, name: "Adrian", msg: "Maaf lahir batin ya guys! 🙏", side: "right", color: "bg-blue-100" },
    { id: 3, name: "Jocelyn", msg: "Makan opor yang banyak! 🥣", side: "left", color: "bg-emerald-100" },
    { id: 4, name: "Stefani", msg: "Jangan lupa THR-nya ya! 🧧", side: "right", color: "bg-blue-100" },
  ];

  return (
    <section className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-slate-400 mb-12 uppercase tracking-widest">
          Pesan dari Kami
        </h2>
        
        <div className="flex flex-col gap-6">
          {messages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: item.side === "left" ? -50 : 50, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className={`flex ${item.side === "left" ? "justify-start" : "justify-end"}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm border ${item.color} 
                ${item.side === "left" ? "rounded-tl-none border-emerald-200" : "rounded-tr-none border-blue-200"}`}
              >
                <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-tight">
                  {item.name}
                </p>
                <p className="text-slate-800 text-lg">
                  {item.msg}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}