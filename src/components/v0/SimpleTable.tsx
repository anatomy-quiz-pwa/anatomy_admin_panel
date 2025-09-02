"use client";
export default function SimpleTable({ columns, rows }:{ columns:string[]; rows:any[] }) {
  return (
    <div style={{overflowX:"auto", border:"1px solid #eee", borderRadius:12}}>
      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr>{columns.map(c=><th key={c} style={{textAlign:"left",padding:"10px 12px",borderBottom:"1px solid #eee"}}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              {columns.map(c=>(
                <td key={c} style={{padding:"10px 12px",borderBottom:"1px solid #f5f5f5"}}>{String(r[c] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
