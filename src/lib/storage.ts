import type { ProgressData, LessonProgress, Status } from '../types';
export const STORAGE_KEY='erp-academy-progress-v1';
export const emptyProgress = (): ProgressData => ({version:1,lessons:{},theme:'system'});
const statuses: Status[]=['Not Started','Learning','Needs Revision','Mastered'];
const validDate=(v: unknown): v is string => typeof v==='string' && Number.isFinite(Date.parse(v));
export function parseProgress(value: unknown): ProgressData {
 if(!value || typeof value!=='object') throw new Error('Choose a valid ERP Academy progress export.');
 const p=value as ProgressData;
 if(p.version!==1 || !p.lessons || typeof p.lessons!=='object' || Array.isArray(p.lessons) || !['light','dark','system'].includes(p.theme) || (p.currentLesson!==undefined && typeof p.currentLesson!=='string')) throw new Error('Unsupported or invalid progress file.');
 const clean: Record<string, LessonProgress>={};
 for(const [id,l] of Object.entries(p.lessons)) {
  if(!l || !statuses.includes(l.status) || !validDate(l.started) || !validDate(l.lastStudied) || !Number.isInteger(l.revisionStep) || l.revisionStep<0 || l.revisionStep>5 || !Array.isArray(l.attempts) || (l.completed!==undefined&&!validDate(l.completed)) || (l.due!==undefined&&!validDate(l.due))) throw new Error('Invalid lesson progress.');
  if(l.attempts.some(a=>!a||!Number.isInteger(a.score)||!Number.isInteger(a.total)||a.total<1||a.score<0||a.score>a.total||!validDate(a.date))) throw new Error('Invalid quiz attempt.');
  if(id==='__proto__'||id==='constructor'||id==='prototype') throw new Error('Invalid lesson identifier.');
  clean[id]={status:l.status,started:l.started,lastStudied:l.lastStudied,attempts:l.attempts.map(a=>({score:a.score,total:a.total,date:a.date})),revisionStep:l.revisionStep,...(l.completed?{completed:l.completed}:{}),...(l.due?{due:l.due}:{})};
 }
 return {version:1,lessons:clean,theme:p.theme,...(p.currentLesson?{currentLesson:p.currentLesson}:{})};
}
export interface ProgressRepository { load(): ProgressData; save(data: ProgressData): void }
export const progressRepository: ProgressRepository = {
 load(){const raw=localStorage.getItem(STORAGE_KEY);return raw?parseProgress(JSON.parse(raw)):emptyProgress();},
 save(data){localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}
};
export const intervals=[1,3,7,14,30];
export function nextDue(step: number, now=new Date()): string { const d=new Date(now);d.setDate(d.getDate()+intervals[Math.min(step,4)]);return d.toISOString(); }
export function recordQuiz(data: ProgressData,id: string,score: number,total: number,revision=false,now=new Date()): ProgressData {
 const date=now.toISOString();const previous=data.lessons[id];const passed=score===total;
 const step=revision&&passed?Math.min((previous?.revisionStep??0)+1,5):0;
 return {...data,currentLesson:id,lessons:{...data.lessons,[id]:{started:previous?.started??date,lastStudied:date,status:passed?(revision&&step===5?'Mastered':'Learning'):'Needs Revision',completed:passed?(previous?.completed??date):previous?.completed,attempts:[...(previous?.attempts??[]),{score,total,date}],revisionStep:step,due:nextDue(step,now)}}};
}
