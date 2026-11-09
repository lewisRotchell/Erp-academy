import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { emptyProgress, progressRepository, recordQuiz, nextDue, parseProgress } from '../lib/storage';
import type { ProgressData, Status } from '../types';
function useProgressStore(){
 const [initial]=useState(()=>{try{return {data:progressRepository.load(),error:''};}catch{return {data:emptyProgress(),error:'Saved progress could not be read. The stored copy is preserved until you make a change. Import a valid backup in Settings if needed.'};}});
 const [error,setError]=useState(initial.error);
 const [data,setData]=useState<ProgressData>(initial.data);
 useEffect(()=>{if(initial.error&&data===initial.data)return;try{progressRepository.save(data);}catch{setError('Progress could not be saved on this device. Export a backup before leaving.');}},[data,initial]);
 useEffect(()=>{const m=window.matchMedia('(prefers-color-scheme: dark)');const apply=()=>document.documentElement.classList.toggle('dark',data.theme==='dark'||(data.theme==='system'&&m.matches));apply();m.addEventListener('change',apply);return()=>m.removeEventListener('change',apply);},[data.theme]);
 return {data,error,clearError:()=>setError(''),start:(id:string)=>setData(p=>{const date=new Date().toISOString();return {...p,currentLesson:id,lessons:{...p.lessons,[id]:p.lessons[id]?{...p.lessons[id],lastStudied:date}:{started:date,lastStudied:date,status:'Learning',attempts:[],revisionStep:0}}};}),quiz:(id:string,score:number,total:number,revision=false)=>setData(p=>recordQuiz(p,id,score,total,revision)),status:(id:string,status:Status)=>setData(p=>{const date=new Date().toISOString();const old=p.lessons[id]??{started:date,lastStudied:date,attempts:[],revisionStep:0};return {...p,lessons:{...p.lessons,[id]:{...old,status,lastStudied:date,due:status==='Needs Revision'?date:status==='Mastered'?nextDue(4):old.due}}};}),theme:(theme:ProgressData['theme'])=>setData(p=>({...p,theme})),importData:(v:unknown)=>setData(parseProgress(v)),reset:()=>setData(emptyProgress())};
}
const Context=createContext<ReturnType<typeof useProgressStore>|null>(null);
export function ProgressProvider({children}:{children:ReactNode}){return <Context.Provider value={useProgressStore()}>{children}</Context.Provider>;}
export function useProgress(){const c=useContext(Context);if(!c)throw new Error('ProgressProvider is required');return c;}
