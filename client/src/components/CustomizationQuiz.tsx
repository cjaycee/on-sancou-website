/**
 * CustomizationQuiz Component — Sancou Bag Customization Flow
 *
 * Multi-step quiz to understand user needs and recommend bag configuration.
 * Questions cover:
 *   1. Primary sports/activities
 *   2. Work day essentials
 *   3. Travel frequency
 *   4. Color preference
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface QuizProps {
  onClose: () => void;
}

interface QuizResponse {
  sports: string[];
  workEssentials: string[];
  travelFrequency: string;
  colorPref: string;
}

const SPORTS = [
  { id: 'running', label: 'Running', icon: '🏃' },
  { id: 'hiking', label: 'Hiking', icon: '⛰️' },
  { id: 'cycling', label: 'Cycling', icon: '🚴' },
  { id: 'gym', label: 'Gym', icon: '💪' },
  { id: 'tennis', label: 'Tennis', icon: '🎾' },
  { id: 'swimming', label: 'Swimming', icon: '🏊' },
];

const WORK_ESSENTIALS = [
  { id: 'laptop', label: 'Laptop (13-15")', icon: '💻' },
  { id: 'documents', label: 'Documents & Folders', icon: '📁' },
  { id: 'water', label: 'Water Bottle', icon: '💧' },
  { id: 'phone', label: 'Phone & Charger', icon: '📱' },
  { id: 'lunch', label: 'Lunch Container', icon: '🍱' },
  { id: 'headphones', label: 'Headphones', icon: '🎧' },
];

const TRAVEL_FREQ = [
  { id: 'daily', label: 'Daily Commute' },
  { id: 'weekly', label: 'Weekly Travel' },
  { id: 'monthly', label: 'Monthly Trips' },
  { id: 'occasional', label: 'Occasional' },
];

const COLORS = [
  { id: 'black', label: 'Midnight Black', color: '#1A1A1A' },
  { id: 'navy', label: 'Deep Navy', color: '#1E3A5F' },
  { id: 'gray', label: 'Stone Gray', color: '#6B7280' },
  { id: 'brown', label: 'Earth Brown', color: '#8B5A3C' },
];

export default function CustomizationQuiz({ onClose }: QuizProps) {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<QuizResponse>({
    sports: [],
    workEssentials: [],
    travelFrequency: '',
    colorPref: '',
  });

  const handleSportsToggle = (sportId: string) => {
    setResponses((prev) => ({
      ...prev,
      sports: prev.sports.includes(sportId)
        ? prev.sports.filter((s) => s !== sportId)
        : [...prev.sports, sportId],
    }));
  };

  const handleEssentialsToggle = (essentialId: string) => {
    setResponses((prev) => ({
      ...prev,
      workEssentials: prev.workEssentials.includes(essentialId)
        ? prev.workEssentials.filter((e) => e !== essentialId)
        : [...prev.workEssentials, essentialId],
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Generate recommendation based on responses
    const recommendation = generateRecommendation(responses);
    console.log('Quiz Response:', responses);
    console.log('Recommendation:', recommendation);
    // Could send to backend or display results
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return responses.sports.length > 0;
      case 1:
        return responses.workEssentials.length > 0;
      case 2:
        return responses.travelFrequency !== '';
      case 3:
        return responses.colorPref !== '';
      default:
        return false;
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
      <motion.div
        className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className='sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between'>
          <div>
            <h2
              className='text-2xl font-bold text-stone-900'
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Customize Your Sancou Bag
            </h2>
            <p className='text-sm text-stone-500 mt-1'>
              Step {step + 1} of 4 — Tell us about your lifestyle
            </p>
          </div>
          <button
            onClick={onClose}
            className='text-stone-400 hover:text-stone-600 transition-colors'
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className='h-1 bg-stone-200'>
          <motion.div
            className='h-full bg-[#E8002D]'
            initial={{ width: '0%' }}
            animate={{ width: `${((step + 1) / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className='p-8'>
          <AnimatePresence mode='wait'>
            {step === 0 && (
              <StepSports
                selected={responses.sports}
                onToggle={handleSportsToggle}
              />
            )}
            {step === 1 && (
              <StepEssentials
                selected={responses.workEssentials}
                onToggle={handleEssentialsToggle}
              />
            )}
            {step === 2 && (
              <StepTravel
                selected={responses.travelFrequency}
                onChange={(value) =>
                  setResponses((prev) => ({
                    ...prev,
                    travelFrequency: value,
                  }))
                }
              />
            )}
            {step === 3 && (
              <StepColor
                selected={responses.colorPref}
                onChange={(value) =>
                  setResponses((prev) => ({
                    ...prev,
                    colorPref: value,
                  }))
                }
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className='border-t border-stone-200 p-6 flex items-center justify-between bg-stone-50'>
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className='flex items-center gap-2 px-6 py-2.5 text-stone-600 hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className='flex items-center gap-2 px-8 py-2.5 bg-[#E8002D] text-white font-medium hover:bg-[#c0001f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className='px-8 py-2.5 bg-[#E8002D] text-white font-medium hover:bg-[#c0001f] transition-colors'
            >
              Get My Recommendation
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function StepSports({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      key='sports'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className='text-lg font-semibold text-stone-900 mb-6'>
        What sports or activities do you do?
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {SPORTS.map((sport) => (
          <button
            key={sport.id}
            onClick={() => onToggle(sport.id)}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              selected.includes(sport.id)
                ? 'border-[#E8002D] bg-red-50'
                : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <div className='text-3xl mb-2'>{sport.icon}</div>
            <p className='text-sm font-medium text-stone-900'>{sport.label}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function StepEssentials({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      key='essentials'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className='text-lg font-semibold text-stone-900 mb-6'>
        What do you bring on a typical work day?
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {WORK_ESSENTIALS.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              selected.includes(item.id)
                ? 'border-[#E8002D] bg-red-50'
                : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <div className='text-3xl mb-2'>{item.icon}</div>
            <p className='text-sm font-medium text-stone-900'>{item.label}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function StepTravel({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <motion.div
      key='travel'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className='text-lg font-semibold text-stone-900 mb-6'>
        How often do you travel?
      </h3>
      <div className='space-y-3'>
        {TRAVEL_FREQ.map((option) => (
          <label
            key={option.id}
            className='flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-stone-300'
            style={{
              borderColor: selected === option.id ? '#E8002D' : '#E5E7EB',
              backgroundColor: selected === option.id ? '#FEF2F2' : '#FFFFFF',
            }}
          >
            <input
              type='radio'
              name='travel'
              value={option.id}
              checked={selected === option.id}
              onChange={(e) => onChange(e.target.value)}
              className='w-5 h-5 accent-[#E8002D]'
            />
            <span className='ml-4 font-medium text-stone-900'>{option.label}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );
}

function StepColor({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <motion.div
      key='color'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className='text-lg font-semibold text-stone-900 mb-6'>
        What's your preferred color?
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {COLORS.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selected === option.id
                ? 'border-[#E8002D] ring-2 ring-[#E8002D] ring-offset-2'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div
              className='w-full h-24 rounded-md mb-3 shadow-sm'
              style={{ backgroundColor: option.color }}
            />
            <p className='text-sm font-medium text-stone-900'>{option.label}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function generateRecommendation(responses: QuizResponse): string {
  const recommendations = [];

  if (responses.sports.includes('running') || responses.sports.includes('hiking')) {
    recommendations.push('Consider the Weather Shield module for outdoor protection');
  }

  if (responses.workEssentials.includes('laptop')) {
    recommendations.push('Add the Laptop Compartment for secure device storage');
  }

  if (responses.travelFrequency === 'monthly' || responses.travelFrequency === 'weekly') {
    recommendations.push('Upgrade to the Travel Edition with TSA-friendly features');
  }

  return recommendations.join('. ') || 'Your Sancou Bag is ready to customize!';
}
