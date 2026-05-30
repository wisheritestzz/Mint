import { create } from 'zustand';
import type { MBTIResult, HistoryRecord, Answer } from '../types';
import { calculateResult } from '../logic/scoring';
import { getDirectionMap, getDimensionMap } from '../data/questions';

const HISTORY_KEY = 'mbti_history';
const MAX_HISTORY = 3;

interface ResultState {
  currentResult: MBTIResult | null;
  history: HistoryRecord[];

  computeResult: (answers: Answer[]) => void;
  saveToHistory: () => void;
  loadHistory: () => void;
  clearResult: () => void;
}

export const useResultStore = create<ResultState>((set, get) => ({
  currentResult: null,
  history: [],

  computeResult: (answers) => {
    const directionMap = getDirectionMap();
    const dimensionMap = getDimensionMap();

    const result = calculateResult(answers, directionMap, dimensionMap);
    set({ currentResult: result });
    get().saveToHistory();
  },

  saveToHistory: () => {
    const { currentResult, history } = get();
    if (!currentResult) return;

    const record: HistoryRecord = {
      type: currentResult.type,
      tag: currentResult.tag,
      timestamp: currentResult.timestamp,
    };

    const newHistory = [record, ...history].slice(0, MAX_HISTORY);
    set({ history: newHistory });

    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch {
      // ignore
    }
  },

  loadHistory: () => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return;
      const data: HistoryRecord[] = JSON.parse(raw);
      set({ history: data.slice(0, MAX_HISTORY) });
    } catch {
      // ignore
    }
  },

  clearResult: () => {
    set({ currentResult: null });
  },
}));
