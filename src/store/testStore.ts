import { create } from 'zustand';
import type { Question, LikertLevel, CacheData } from '../types';
import { shuffleQuestions, questionMap } from '../data/questions';

const CACHE_KEY = 'mbti_test_progress';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24小时

interface TestState {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, LikertLevel>;
  startTime: number;
  hasResumed: boolean;

  // Actions
  initTest: (resume?: boolean) => void;
  setAnswer: (questionId: number, score: LikertLevel) => void;
  next: () => void;
  prev: () => void;
  isComplete: () => boolean;
  getProgress: () => number;

  // Cache
  saveToCache: () => void;
  loadFromCache: () => boolean;
  clearCache: () => void;
  hasValidCache: () => boolean;
}

export const useTestStore = create<TestState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: {},
  startTime: 0,
  hasResumed: false,

  initTest: (resume = false) => {
    const state = get();
    if (resume && state.loadFromCache()) return;

    const shuffled = shuffleQuestions();
    set({
      questions: shuffled,
      currentIndex: 0,
      answers: {},
      startTime: Date.now(),
      hasResumed: false,
    });
  },

  setAnswer: (questionId, score) => {
    set((state) => {
      const newAnswers = { ...state.answers, [questionId]: score };
      return { answers: newAnswers };
    });
    // 每次答题后自动保存
    get().saveToCache();
  },

  next: () => {
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
    }));
  },

  prev: () => {
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    }));
  },

  isComplete: () => {
    const state = get();
    return (
      state.questions.length > 0 &&
      Object.keys(state.answers).length >= state.questions.length
    );
  },

  getProgress: () => {
    const state = get();
    if (state.questions.length === 0) return 0;
    return Object.keys(state.answers).length / state.questions.length;
  },

  saveToCache: () => {
    const state = get();
    if (state.questions.length === 0) return;

    const data: CacheData = {
      answers: state.answers,
      currentIndex: state.currentIndex,
      questionOrder: state.questions.map((q) => q.id),
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
      // localStorage 满或不可用，静默失败
    }
  },

  loadFromCache: () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return false;

      const data: CacheData = JSON.parse(raw);
      if (Date.now() - data.timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_KEY);
        return false;
      }

      // 根据缓存的题目顺序重建题目列表
      const questions = data.questionOrder
        .map((id: number) => questionMap.get(id))
        .filter(Boolean) as Question[];

      if (questions.length === 0) return false;

      set({
        questions,
        currentIndex: data.currentIndex,
        answers: data.answers,
        startTime: Date.now(),
        hasResumed: true,
      });
      return true;
    } catch {
      localStorage.removeItem(CACHE_KEY);
      return false;
    }
  },

  clearCache: () => {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {
      // ignore
    }
    set({
      questions: [],
      currentIndex: 0,
      answers: {},
      startTime: 0,
      hasResumed: false,
    });
  },

  hasValidCache: () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return false;
      const data: CacheData = JSON.parse(raw);
      return Date.now() - data.timestamp <= CACHE_EXPIRY;
    } catch {
      return false;
    }
  },
}));
