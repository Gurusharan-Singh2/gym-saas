'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  Flame,
  Zap,
  Calendar,
  Layers,
  Sparkles,
  Clock,
  Award,
  Search,
  CheckCircle2,
  ArrowRight,
  Filter,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  MotionButton,
  MotionCard,
} from '../../components/MotionWrapper';
import ExerciseAnimator from '../../components/ExerciseAnimator';
import WorkoutPlayerModal from '../../components/WorkoutPlayerModal';
import { WORKOUT_SPLIT } from '../../lib/workoutData';

export default function WorkoutsPage() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExerciseModal, setActiveExerciseModal] = useState(null);

  // Active day data object
  const currentDayData =
    WORKOUT_SPLIT.find((d) => d.day === selectedDay) || WORKOUT_SPLIT[0];

  // Flatten exercises for the active day with contextual muscle data
  const currentDayExercises = currentDayData.muscles.flatMap((muscle) =>
    muscle.exercises.map((ex) => ({
      ...ex,
      day: currentDayData.day,
      muscleGroupName: muscle.name,
      muscleDescription: muscle.description,
    }))
  );

  // Filter based on difficulty, muscle tab, and search query
  const filteredExercises = currentDayExercises.filter((ex) => {
    const matchDifficulty =
      selectedDifficulty === 'All' ||
      ex.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    const matchMuscle =
      selectedMuscleFilter === 'All' ||
      ex.muscle.toLowerCase().includes(selectedMuscleFilter.toLowerCase()) ||
      ex.muscleGroupName.toLowerCase().includes(selectedMuscleFilter.toLowerCase());

    const matchSearch =
      !searchQuery ||
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchDifficulty && matchMuscle && matchSearch;
  });

  // Modal navigation helpers
  const currentModalIndex = filteredExercises.findIndex(
    (e) => e.id === activeExerciseModal?.id
  );
  const hasNextExercise =
    currentModalIndex >= 0 && currentModalIndex < filteredExercises.length - 1;
  const hasPrevExercise = currentModalIndex > 0;

  const handleNextExercise = () => {
    if (hasNextExercise) {
      setActiveExerciseModal(filteredExercises[currentModalIndex + 1]);
    }
  };

  const handlePrevExercise = () => {
    if (hasPrevExercise) {
      setActiveExerciseModal(filteredExercises[currentModalIndex - 1]);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
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
    <div className="bg-[#09090B] text-white pt-12 pb-28 min-h-screen">
      {/* 1. HERO HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <SlideUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Biomechanical Precision Split</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white mb-4">
            DAY-WISE EXERCISE & <span className="text-zinc-400">ANIMATION GUIDE</span>
          </h1>

          <p className="max-w-3xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every day is engineered around <strong className="text-white">2 targeted muscle groups</strong>. For each muscle, choose from <strong className="text-emerald-400">Beginner</strong>, <strong className="text-amber-400">Intermediate</strong>, and <strong className="text-rose-400">Hard</strong> difficulty tiers with real-time animated human demonstrations, tempo control, and active muscle activation glow.
          </p>
        </SlideUp>
      </div>

      {/* 2. DAY SELECTOR NAVIGATION (Monday – Sunday) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {WORKOUT_SPLIT.map((item) => {
            const isSelected = selectedDay === item.day;
            const muscleNames = item.muscles.map((m) => m.name).join(' & ');

            return (
              <button
                key={item.day}
                onClick={() => {
                  setSelectedDay(item.day);
                  setSelectedMuscleFilter('All');
                }}
                className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-800/90 border-white text-white shadow-lg shadow-white/5 ring-1 ring-white/20'
                    : 'bg-[#141418]/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Day {item.dayNumber}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>

                <div className="font-display font-bold text-sm text-white mb-1">
                  {item.day}
                </div>

                <div className="text-[11px] leading-tight text-amber-300 font-medium truncate">
                  {muscleNames}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE DAY SHOWCASE BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#141418] via-[#111115] to-[#0D0D10] border border-zinc-800 p-6 sm:p-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Day {currentDayData.dayNumber} • {currentDayData.day} Routine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
                {currentDayData.title}
              </h2>
              <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
                {currentDayData.focus}
              </p>

              {/* Day Muscles Pill Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {currentDayData.muscles.map((muscle) => (
                  <div
                    key={muscle.id}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                  >
                    <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-white">{muscle.name}</span>
                    <span className="text-[11px] text-zinc-500">({muscle.scientificName})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action: Start First Exercise in Modal */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <MotionButton
                onClick={() => setActiveExerciseModal(filteredExercises[0] || currentDayExercises[0])}
                className="btn-gold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Start Today's Workout</span>
              </MotionButton>
            </div>
          </div>
        </div>
      </div>

      {/* 4. DUAL FILTER CONTROLS: MUSCLE GROUPS & DIFFICULTY TIERS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#141418]/60 border border-zinc-800/80">
          {/* Muscle Group Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mr-2 shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Target:
            </span>
            <button
              onClick={() => setSelectedMuscleFilter('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedMuscleFilter === 'All'
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Both Muscles ({currentDayExercises.length})
            </button>
            {currentDayData.muscles.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMuscleFilter(m.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedMuscleFilter === m.name
                    ? 'bg-amber-400 text-black font-extrabold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {m.name} (3 Tiers)
              </button>
            ))}
          </div>

          {/* Difficulty Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mr-2 shrink-0 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Difficulty:
            </span>
            {['All', 'Beginner', 'Intermediate', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 border ${
                  selectedDifficulty === diff
                    ? diff === 'Beginner'
                      ? 'bg-emerald-500 text-black border-emerald-400'
                      : diff === 'Intermediate'
                      ? 'bg-amber-400 text-black border-amber-300'
                      : diff === 'Hard'
                      ? 'bg-rose-500 text-white border-rose-400'
                      : 'bg-white text-black border-white'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar & Result Counter */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise, barbell, dumbbell, etc..."
              className="w-full bg-[#141418] border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-all"
            />
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            Showing <strong className="text-white">{filteredExercises.length}</strong> of{' '}
            {currentDayExercises.length} Exercises
          </div>
        </div>
      </div>

      {/* 5. EXERCISES GRID WITH LIVE ANIMATED PERSON DEMONSTRATIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredExercises.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#141418] border border-zinc-800">
            <Filter className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Exercises Match Filter</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Try resetting the difficulty or search query to view available movements.
            </p>
            <button
              onClick={() => {
                setSelectedDifficulty('All');
                setSelectedMuscleFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-700"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="group relative rounded-3xl bg-[#141418] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                {/* Top Card Details */}
                <div className="p-5 pb-0">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColor(
                        exercise.difficulty
                      )}`}
                    >
                      {exercise.difficulty}
                    </span>

                    <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/30 border border-amber-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {exercise.muscle}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-amber-300 transition-colors mb-1">
                    {exercise.name}
                  </h3>

                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mb-3">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{exercise.setsReps}</span>
                    <span>•</span>
                    <span>Rest: {exercise.restSeconds}s</span>
                  </p>
                </div>

                {/* Animated Person Biomechanical Preview */}
                <div className="px-5 py-2">
                  <ExerciseAnimator
                    gifUrl={exercise.gifUrl}
                    imageUrl={exercise.imageUrl}
                    animationType={exercise.animationType}
                    primaryMuscle={exercise.muscle}
                    compact={true}
                    showControls={false}
                    autoPlay={true}
                  />
                </div>

                {/* Card Bottom: Pro Tip & Interactive Practice Trigger */}
                <div className="p-5 pt-3 border-t border-zinc-800/80 bg-[#0F0F12]/60 mt-2">
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-4 italic">
                    &ldquo;{exercise.proTip}&rdquo;
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-mono text-zinc-500">
                      {exercise.equipment}
                    </span>

                    <button
                      onClick={() => setActiveExerciseModal(exercise)}
                      className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    >
                      <span>Practice Form</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. WEEKLY SPLIT ARCHITECTURE OVERVIEW TABLE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="p-8 rounded-3xl bg-[#141418] border border-zinc-800">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Master Program Blueprint
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              7-Day 2-Muscle Split Structure
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Every day hits 2 opposing or synergistic muscle groups with 3 tiers of progressive resistance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Focus</th>
                  <th className="py-3 px-4">Muscle 1 (Beg / Int / Hard)</th>
                  <th className="py-3 px-4">Muscle 2 (Beg / Int / Hard)</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {WORKOUT_SPLIT.map((item) => (
                  <tr
                    key={item.day}
                    className={`hover:bg-zinc-900/50 transition-colors ${
                      item.day === selectedDay ? 'bg-zinc-800/30 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      {item.day}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">
                      {item.focus}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-amber-300">{item.muscles[0]?.name}: </span>
                      <span className="text-zinc-400">
                        {item.muscles[0]?.exercises.map((e) => e.name).join(' • ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-amber-300">{item.muscles[1]?.name}: </span>
                      <span className="text-zinc-400">
                        {item.muscles[1]?.exercises.map((e) => e.name).join(' • ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedDay(item.day);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[11px] transition-all"
                      >
                        View Exercises
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 7. FULL WORKOUT EXECUTION MODAL */}
      <WorkoutPlayerModal
        exercise={activeExerciseModal}
        isOpen={!!activeExerciseModal}
        onClose={() => setActiveExerciseModal(null)}
        onNext={handleNextExercise}
        onPrev={handlePrevExercise}
        hasNext={hasNextExercise}
        hasPrev={hasPrevExercise}
      />
    </div>
  );
}
