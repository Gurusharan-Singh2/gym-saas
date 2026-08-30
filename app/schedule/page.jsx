'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  User,
  Users,
  Flame,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
  MotionButton,
} from '../../components/MotionWrapper';
import Modal from '../../components/Modal';
import { BrandedSpinner } from '../../components/BrandedSpinner';
import { useToast } from '../../components/ToastProvider';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = ['All', 'Strength', 'HIIT', 'Pilates', 'Boxing', 'Yoga', 'Recovery'];

export default function SchedulePage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedClass, setSelectedClass] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchClasses() {
      try {
        setLoading(true);
        const res = await fetch('/api/classes');
        const data = await res.json();
        if (data.success) {
          setClasses(data.data);
        }
      } catch (err) {
        console.error('Error fetching classes:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
  }, []);

  const filteredClasses = classes.filter((c) => {
    const matchCategory =
      selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchCategory;
  });

  const dayClasses = filteredClasses.filter((c) => c.day_of_week === selectedDay);

  const handleBookSpot = () => {
    setBookingSuccess(true);
    toast.success(`Spot confirmed for ${selectedClass?.title}! A calendar invitation has been sent.`);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedClass(null);
    }, 2000);
  };

  return (
    <div className="bg-charcoal-950 text-brown-50 pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <SlideUp>
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
            Precision Timetable
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-brown-50 mt-3 mb-4">
            STUDIO & PERFORMANCE SCHEDULE
          </h1>
          <p className="max-w-2xl mx-auto text-brown-300 text-sm sm:text-base leading-relaxed">
            Reserve your session with master coaches. Small-group formats are capped to ensure individualized feedback and maximum performance output.
          </p>
        </SlideUp>
      </div>

      {/* Category Filter Chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'btn-gold shadow-gold-sm'
                  : 'bg-brown-900/40 border border-brown-800 text-brown-300 hover:text-brown-100 hover:bg-brown-900/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Day Selector Tabs (Mobile & Desktop View Switcher) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between border-b border-brown-900 overflow-x-auto scrollbar-none">
          {DAYS.map((day) => {
            const isSelected = selectedDay === day;
            const countForDay = filteredClasses.filter((c) => c.day_of_week === day).length;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected ? 'text-gold-accent' : 'text-brown-400 hover:text-brown-100'
                }`}
              >
                <span>{day}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-gold-500/20 text-gold-accent' : 'bg-brown-900 text-brown-400'
                  }`}
                >
                  {countForDay}
                </span>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Class Cards for Selected Day */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 flex justify-center">
            <BrandedSpinner size="lg" />
          </div>
        ) : dayClasses.length === 0 ? (
          <div className="text-center py-20 bg-charcoal-900/40 rounded-3xl border border-brown-900">
            <Calendar className="w-12 h-12 text-brown-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brown-100 mb-1">No sessions scheduled</h3>
            <p className="text-brown-400 text-xs">
              Try selecting a different day or category filter above.
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dayClasses.map((cls) => (
              <StaggerItem key={cls.id}>
                <div
                  onClick={() => setSelectedClass(cls)}
                  className="group cursor-pointer rounded-2xl glass-panel border-brown-800/80 hover:border-gold-accent/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-gold-md"
                >
                  <div>
                    {/* Time & Category Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brown-900/80 border border-gold-accent/30 text-xs font-bold text-gold-300">
                        <Clock className="w-3.5 h-3.5 text-gold-accent" />
                        <span>
                          {cls.start_time} – {cls.end_time}
                        </span>
                      </div>
                      <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg bg-brown-900 border border-brown-800 text-brown-300">
                        {cls.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-brown-50 group-hover:text-gold-accent transition-colors mb-2">
                      {cls.title}
                    </h3>
                    <p className="text-xs text-brown-300 line-clamp-2 leading-relaxed mb-6">
                      {cls.description}
                    </p>
                  </div>

                  {/* Coach info & Action */}
                  <div className="pt-4 border-t border-brown-900/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {cls.trainer_photo ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold-accent/40">
                          <Image
                            src={cls.trainer_photo}
                            alt={cls.trainer_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-brown-800 border border-brown-700 flex items-center justify-center text-gold-accent text-xs font-bold">
                          {cls.trainer_name ? cls.trainer_name[0] : 'C'}
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-brown-100">
                          {cls.trainer_name}
                        </div>
                        <div className="text-[10px] text-brown-400">
                          {cls.duration_minutes} Mins • {cls.level}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-gold-400 group-hover:text-gold-300">
                      Reserve
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      {/* Class Reservation Modal */}
      <Modal
        isOpen={Boolean(selectedClass)}
        onClose={() => setSelectedClass(null)}
        title={selectedClass?.title || 'Session Details'}
      >
        {selectedClass && (
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-lg bg-gold-500/10 border border-gold-accent/40 text-gold-300 text-xs font-bold">
                {selectedClass.day_of_week} ({selectedClass.start_time} - {selectedClass.end_time})
              </span>
              <span className="px-3 py-1 rounded-lg bg-brown-900 border border-brown-800 text-brown-200 text-xs font-semibold">
                Category: {selectedClass.category}
              </span>
              <span className="px-3 py-1 rounded-lg bg-brown-900 border border-brown-800 text-brown-200 text-xs font-semibold">
                Level: {selectedClass.level}
              </span>
            </div>

            <p className="text-brown-200 text-sm leading-relaxed mb-6">
              {selectedClass.description}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-charcoal-950 border border-brown-800/80 mb-6">
              <div>
                <span className="text-[11px] uppercase font-bold text-brown-400 block mb-1">
                  Master Coach
                </span>
                <span className="text-sm font-bold text-brown-50">{selectedClass.trainer_name}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-brown-400 block mb-1">
                  Class Capacity
                </span>
                <span className="text-sm font-bold text-gold-300">
                  {selectedClass.capacity} Max Athletes
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <MotionButton
                onClick={() => setSelectedClass(null)}
                className="flex-1 py-3 rounded-xl border border-brown-700 bg-brown-900/40 text-brown-200 font-semibold text-xs uppercase tracking-wider"
              >
                Close
              </MotionButton>
              <MotionButton
                onClick={handleBookSpot}
                disabled={bookingSuccess}
                className="flex-1 btn-gold py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {bookingSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmed!</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </MotionButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
