import { describe,it,expect } from 'vitest';
import { emptyProgress,recordQuiz,parseProgress,nextDue } from './storage';
describe('learning progression',()=>{
 const now=new Date('2026-11-09T12:00:00Z');
 it('does not complete a lesson on an imperfect quiz',()=>{const p=recordQuiz(emptyProgress(),'assets',2,3,false,now);expect(p.lessons.assets.completed).toBeUndefined();expect(p.lessons.assets.status).toBe('Needs Revision');expect(p.lessons.assets.due).toBe('2026-11-10T12:00:00.000Z');});
 it('completes a perfect quiz and preserves attempt history',()=>{const a=recordQuiz(emptyProgress(),'assets',1,3,false,now);const b=recordQuiz(a,'assets',3,3,false,now);expect(b.lessons.assets.completed).toBe(now.toISOString());expect(b.lessons.assets.attempts).toHaveLength(2);expect(b.lessons.assets.status).toBe('Learning');});
 it('advances revision through all intervals and masters only after five stages',()=>{let p=recordQuiz(emptyProgress(),'assets',3,3,false,now);for(let i=1;i<=5;i++){p=recordQuiz(p,'assets',3,3,true,now);expect(p.lessons.assets.revisionStep).toBe(i);expect(p.lessons.assets.due).toBe(nextDue(i,now));}expect(p.lessons.assets.status).toBe('Mastered');});
 it('brings a failed revision forward without erasing completion',()=>{let p=recordQuiz(emptyProgress(),'assets',3,3,false,now);p=recordQuiz(p,'assets',3,3,true,now);p=recordQuiz(p,'assets',1,3,true,now);expect(p.lessons.assets.due).toBe(nextDue(0,now));expect(p.lessons.assets.completed).toBeTruthy();expect(p.lessons.assets.revisionStep).toBe(0);});
});
describe('progress backup validation',()=>{
 it('roundtrips an export with quiz history',()=>{const p=recordQuiz(emptyProgress(),'assets',3,3);expect(parseProgress(JSON.parse(JSON.stringify(p)))).toEqual(p);});
 it('rejects incompatible schemas, impossible scores and invalid dates',()=>{expect(()=>parseProgress({version:2,lessons:{},theme:'light'})).toThrow();const p=recordQuiz(emptyProgress(),'assets',3,3);p.lessons.assets.attempts[0].score=4;expect(()=>parseProgress(p)).toThrow();p.lessons.assets.attempts[0].score=3;p.lessons.assets.due='not a date';expect(()=>parseProgress(p)).toThrow();});
});
