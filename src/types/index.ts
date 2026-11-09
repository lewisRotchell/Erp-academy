export type Status = 'Not Started' | 'Learning' | 'Needs Revision' | 'Mastered';
export interface Question { prompt: string; options: string[]; answer: number; explanation: string }
export interface Concept { term: string; definition: string }
export interface Lesson { id: string; title: string; minutes: number; objectives: string[]; explanation: string[]; concepts: Concept[]; example: string; workflow: string[]; erp: string; mistake: string; summary: string; questions: Question[]; exercise: { prompt: string; answer: number; explanation: string } }
export interface Module { title: string; lessons: { id: string; title: string }[] }
export interface Subject { id: string; title: string; description: string; icon: string; color: string; modules: Module[] }
export interface Attempt { score: number; total: number; date: string }
export interface LessonProgress { status: Status; started: string; lastStudied: string; completed?: string; attempts: Attempt[]; revisionStep: number; due?: string }
export interface ProgressData { version: 1; lessons: Record<string, LessonProgress>; currentLesson?: string; theme: 'light' | 'dark' | 'system' }
