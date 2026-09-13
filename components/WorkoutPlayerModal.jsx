'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
} from 'lucide-react';
import ExerciseAnimator from './ExerciseAnimator';

export default function WorkoutPlayerModal({
  exercise,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) {
  const [completedSets, setCompletedSets] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [allDone, setAllDone] = useState(false);

  // Parse recommended sets count from e.g. "4 sets × 10 reps"
  const defaultSetsCount = exercise?.setsReps?.startsWith('5')
    ? 5
    : exercise?.setsReps?.startsWith('4')
    ? 4
    : 3;

  // Reset state when exercise changes
  useEffect(() => {
    if (exercise) {
      setCompletedSets({});
      setTimerSeconds(exercise.restSeconds || 60);
      setIsTimerRunning(false);
      setAllDone(false);
    }
  }, [exercise]);

  // Rest Timer Countdown effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Trigger a small confetti celebration for resting
      if (typeof window !== 'undefined') {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.8 },
        });
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen || !exercise) return null;

  const handleToggleSet = (index) => {
    const updated = { ...completedSets, [index]: !completedSets[index] };
    setCompletedSets(updated);

    // If marked done, auto-start rest timer
    if (!completedSets[index]) {
      setTimerSeconds(exercise.restSeconds || 60);
      setIsTimerRunning(true);
    }

    // Check if all sets finished
    const count = Object.values(updated).filter(Boolean).length;
    if (count === defaultSetsCount) {
      setAllDone(true);
      if (typeof window !== 'undefined') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      setAllDone(false);
    }
  };

  const getDifficultyBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'intermediate':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#0F0F12] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-zinc-800/80 flex items-center justify-between bg-[#141418]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getDifficultyBadge(
                  exercise.difficulty
                )}`}
              >
                {exercise.difficulty}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {exercise.name}
                </h2>
                <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                  <span>{exercise.day}</span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">{exercise.muscle}</span>
                  <span>•</span>
                  <span>Equipment: {exercise.equipment}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* Top Grid: Animated Figure + Interactive Set Logger & Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Biomechanical Animated Demonstration */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Biomechanical Animation</span>
                </div>
                <ExerciseAnimator
                  gifUrl={exercise.gifUrl}
                  imageUrl={exercise.imageUrl}
                  animationType={exercise.animationType}
                  primaryMuscle={exercise.muscle}
                  showControls={true}
                  autoPlay={true}
                />
              </div>

              {/* Right Column: Sets Tracker & Rest Countdown Timer */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                {/* Target Protocol Card */}
                <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="font-semibold uppercase tracking-wider">Protocol</span>
                    <span className="font-mono text-zinc-300">Tempo: {exercise.tempo || '2-1-2'}</span>
                  </div>
                  <div className="text-lg font-black text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span>{exercise.setsReps}</span>
                  </div>
                </div>

                {/* Interactive Set Checkboxes */}
                <div className="p-4 rounded-2xl bg-[#141418] border border-zinc-800 space-y-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Log Completed Sets
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {Object.values(completedSets).filter(Boolean).length} of {defaultSetsCount}
                    </span>
                  </div>

                  {Array.from({ length: defaultSetsCount }).map((_, i) => {
                    const isDone = !!completedSets[i];
                    return (
                      <button
                        key={i}
                        onClick={() => handleToggleSet(i)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          isDone
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2
                            className={`w-4 h-4 ${
                              isDone ? 'text-emerald-400 fill-emerald-400/20' : 'text-zinc-600'
                            }`}
                          />
                          <span>Set {i + 1}</span>
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {isDone ? 'COMPLETED' : 'TAP TO LOG'}
                        </span>
                      </button>
                    );
                  })}

                  {allDone && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>All Sets Completed! Outstanding Effort!</span>
                    </motion.div>
                  )}
                </div>

                {/* Rest Timer Card */}
                <div className="p-4 rounded-2xl bg-[#141418] border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Rest Timer</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {timerSeconds}s
                    </span>
                  </div>

                  {/* Rest Progress Bar */}
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden mb-3 border border-zinc-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000 ease-linear"
                      style={{
                        width: `${Math.min(
                          100,
                          (timerSeconds / (exercise.restSeconds || 60)) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        isTimerRunning
                          ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                          : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-3 h-3" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-black" />
                          <span>Start Rest</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setTimerSeconds(exercise.restSeconds || 60);
                        setIsTimerRunning(false);
                      }}
                      className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {[30, 60, 90].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setTimerSeconds(s);
                            setIsTimerRunning(true);
                          }}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                            timerSeconds === s
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {s}s
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tabs: Detailed Coaching Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Setup & Execution */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Biomechanical Execution Steps</span>
                </h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {exercise.execution?.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Coach Tip & Common Mistakes */}
              <div className="space-y-4">
                {/* Pro Coach Tip */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Master Coach Form Cue</span>
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    &ldquo;{exercise.proTip}&rdquo;
                  </p>
                </div>

                {/* Common Mistake Alert */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Common Biomechanical Error</span>
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {exercise.commonMistake}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer with Previous / Next Exercise Navigation */}
          <div className="p-4 sm:p-5 border-t border-zinc-800/80 bg-[#141418] flex items-center justify-between text-xs">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all ${
                hasPrev
                  ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                  : 'opacity-40 cursor-not-allowed text-zinc-500'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Exercise</span>
            </button>

            <span className="text-zinc-500 font-medium hidden sm:inline-block">
              Aura Biomechanics Engine
            </span>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all ${
                hasNext
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'opacity-40 cursor-not-allowed text-zinc-500'
              }`}
            >
              <span>Next Exercise</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
