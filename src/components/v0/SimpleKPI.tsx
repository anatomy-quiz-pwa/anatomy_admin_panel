"use client";
export default function SimpleKPI({ items }:{ items:{label:string;value:any;trend?:number}[] }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
      {items.map((k,i)=>(
        <div key={i} style={{padding:16,border:"1px solid #eee",borderRadius:12}}>
          <div style={{opacity:.6,fontSize:12}}>{k.label}</div>
          <div style={{fontSize:24,fontWeight:700}}>{k.value}</div>
          {"trend" in k && k.trend!==undefined &&
            <div style={{opacity:.6,fontSize:12}}>trend: {k.trend>0?`+${k.trend}%`:`${k.trend}%`}</div>}
        </div>
      ))}
    </div>
  );
}
