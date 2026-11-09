import * as ProgressPrimitive from '@radix-ui/react-progress';
export function Progress({value,label='Progress'}:{value:number;label?:string}){return <ProgressPrimitive.Root className="progress-track" value={value} aria-label={label}><ProgressPrimitive.Indicator className="progress-fill" style={{transform:`translateX(-${100-value}%)`}}/></ProgressPrimitive.Root>;}
