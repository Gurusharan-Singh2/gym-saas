'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Zap, RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';

/**
 * ExerciseAnimator - Ultra-Smooth Real Human Athlete Exercise Demonstration Engine.
 * - Seamless dark studio blending (eliminates harsh white rectangular boxes)
 * - Butter-smooth 60fps looping without jitter or CPU load
 * - Zero artificial rep ticking on catalog cards
 * - Real-time tracking and tempo cues when in active Workout Studio mode
 */
export default function ExerciseAnimator({
  gifUrl,
  imageUrl,
  animationType = 'squat',
  primaryMuscle = 'Target Muscle',
  compact = false,
  showControls = true,
  autoPlay = true,
}) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(1);
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' (seamless luxury) | 'light'
  const [reps, setReps] = useState(0);
  const [phase, setPhase] = useState('Concentric (Drive)');

  // Fallback map if gifUrl was not directly passed
  const defaultGifMap = {
    pushup: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0493-B1EVP9F.gif',
    bench_press: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0025-EIeI8Vf.gif',
    dumbbell_press: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0289-SpYC0Kp.gif',
    squat: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0043-qXTaZnJ.gif',
    bulgarian_split: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0987-arsYEd3.gif',
    bicep_curl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0285-L1626nF.gif',
    hammer_curl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0165-HPlPoQA.gif',
    pullup: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0015-vrhHa6D.gif',
    lat_pulldown: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2330-LEprlgG.gif',
    barbell_row: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0292-w9Yv1tQ.gif',
    shoulder_press: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0774-jjUPrze.gif',
    lateral_raise: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0334-93JzGZ5.gif',
    shrugs: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0406-NJzBsGJ.gif',
    dips: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0129-RrLske5.gif',
    tricep_pushdown: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1723-qRZ5S1N.gif',
    skull_crusher: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0060-h8LFzo9.gif',
    deadlift: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1009-kuMiR2T.gif',
    rdl: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1459-rR0LJzx.gif',
    hip_thrust: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1409-qKBpF7I.gif',
    calf_raise: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1372-8ozhUIZ.gif',
    crunch: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0276-iny3m5y.gif',
    plank: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0103-xnInPfE.gif',
    mobility_flow: 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1410-py1HSzx.gif',
  };

  const activeMediaUrl = gifUrl || defaultGifMap[animationType] || defaultGifMap.squat;
  const activeStaticImage =
    imageUrl ||
    activeMediaUrl.replace('/videos/', '/images/').replace('.gif', '.jpg');

  const baseDuration = 3.2;
  const currentDuration = baseDuration / speed;

  // Only run live timer & phase updates when in studio modal mode (!compact) to prevent jitter on catalog
  useEffect(() => {
    if (compact || !isPlaying) return;

    const interval = setInterval(() => {
      setReps((prev) => prev + 1);
    }, currentDuration * 1000);

    const phaseInterval = setInterval(() => {
      const now = (Date.now() / 1000) % currentDuration;
      const progress = now / currentDuration;

      if (progress < 0.38) {
        setPhase('Concentric (Drive)');
      } else if (progress < 0.58) {
        setPhase('Peak Contraction');
      } else {
        setPhase('Eccentric (Control)');
      }
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, [compact, isPlaying, speed, currentDuration]);

  // CSS blend styles that convert white backgrounds into seamless Obsidian studio black
  const isDark = themeMode === 'dark';
  const imgFilterStyle = isDark
    ? {
        filter: 'invert(0.92) hue-rotate(180deg) contrast(1.2) brightness(1.08)',
        mixBlendMode: 'screen',
      }
    : {
        filter: 'none',
        mixBlendMode: 'normal',
      };

  return (
    <div
      className={`relative flex flex-col items-center justify-between rounded-2xl bg-[#0D0D11] border border-zinc-800/80 overflow-hidden select-none shadow-xl transition-all duration-300 ${
        compact ? 'p-3' : 'p-5 sm:p-6'
      }`}
    >
      {/* Studio Header (Only in Full Modal, or subtle status in compact) */}
      {!compact ? (
        <div className="w-full flex items-center justify-between mb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isPlaying ? 'bg-amber-400' : 'bg-zinc-500'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isPlaying ? 'bg-amber-400' : 'bg-zinc-500'
                }`}
              />
            </span>
            <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-300">
              {phase}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-semibold text-zinc-400 bg-zinc-900/90 px-2 py-0.5 rounded-md border border-zinc-800">
              Reps: <strong className="text-white font-mono">{reps}</strong>
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              {primaryMuscle}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between mb-1.5 z-10 px-0.5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Biomechanical Motion</span>
          </div>
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
            Smooth 60FPS
          </span>
        </div>
      )}

      {/* Main Real Athlete Video / Animated Demonstration Stage */}
      <div
        className={`relative w-full rounded-xl overflow-hidden flex items-center justify-center p-2 sm:p-3 my-0.5 border transition-all duration-300 group ${
          isDark
            ? 'bg-gradient-to-b from-[#0A0A0D] via-[#0E0E13] to-[#0A0A0D] border-zinc-800/80 shadow-2xl'
            : 'bg-white border-zinc-300 shadow-md'
        } ${compact ? 'h-48' : 'h-64 sm:h-80'}`}
      >
        {/* Subtle Ambient Vignette & Floor Glow */}
        <div className="absolute inset-0 pointer-events-none rounded-xl bg-radial-gradient from-transparent via-transparent to-black/40 z-10" />

        {/* Real Person Animated Loop with seamless studio blend */}
        <img
          src={isPlaying ? activeMediaUrl : activeStaticImage}
          alt={`${primaryMuscle} real person demonstration`}
          style={imgFilterStyle}
          className="w-full h-full object-contain max-h-full transition-transform duration-500 group-hover:scale-105"
          loading={compact ? 'lazy' : 'eager'}
        />

        {/* Studio Lighting Tag */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider border border-white/10 z-20 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          <span>Real Athlete Form</span>
        </div>

        {/* When Paused Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-20">
            <div className="px-3 py-1.5 rounded-xl bg-black/85 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl">
              <Pause className="w-3.5 h-3.5" />
              <span>Form Hold</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls Toolbar (Modal only or compact toggle) */}
      {showControls && (
        <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-3 mt-1.5 border-t border-zinc-800/80 z-10 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-all active:scale-95 flex items-center justify-center shadow-sm"
              title={isPlaying ? 'Pause Motion' : 'Play Motion'}
              aria-label="Toggle Play"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            <button
              onClick={() => setReps(0)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-95"
              title="Reset Rep Counter"
              aria-label="Reset Reps"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Speed Selector */}
            <div className="flex items-center bg-zinc-900 rounded-xl p-0.5 border border-zinc-800 ml-1">
              {[0.5, 1, 1.5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    speed === s
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Theme Mode Toggle: Seamless Dark Studio vs Original High-Key */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all border ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              }`}
              title={isDark ? 'Switch to Light Studio' : 'Switch to Dark Studio'}
            >
              {isDark ? <Moon className="w-3 h-3 text-amber-400" /> : <Sun className="w-3 h-3 text-amber-400" />}
              <span>{isDark ? 'Dark Studio' : 'Light Studio'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
