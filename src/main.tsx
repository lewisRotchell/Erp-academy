import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProgressProvider } from './hooks/useProgress';
import { Layout } from './components/layout/Layout';
import { Dashboard, Subjects, SubjectPage, Learning, LessonReader, NotFound } from './features/courses/Pages';
import { Revision } from './features/revision/Revision';
import { Glossary } from './features/glossary/Glossary';
import { ProgressPage } from './features/progress/ProgressPage';
import { Settings } from './features/progress/Settings';
import './styles.css';
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0);},[pathname]);return null;}
createRoot(document.getElementById('root')!).render(<StrictMode><ProgressProvider><HashRouter><ScrollToTop/><Routes><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="learning" element={<Learning/>}/><Route path="subjects" element={<Subjects/>}/><Route path="subjects/:id" element={<SubjectPage/>}/><Route path="lesson/:id" element={<LessonReader/>}/><Route path="revision" element={<Revision/>}/><Route path="glossary" element={<Glossary/>}/><Route path="progress" element={<ProgressPage/>}/><Route path="settings" element={<Settings/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></HashRouter></ProgressProvider></StrictMode>);
