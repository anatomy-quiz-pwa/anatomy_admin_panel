export type V0KPI = { label: string; value: string | number; trend?: number };
export type V0Table = { columns: string[]; rows: Record<string, any>[] };

const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

// 簡單重試，應對 Render 冷啟動
async function fetchJSON(path: string, tries = 2) {
  let err;
  for (let i = 0; i < tries; i++) {
    const r = await fetch(`${API}${path}`, { cache: "no-store" });
    if (r.ok) return r.json();
    err = new Error(`${r.status} ${r.statusText}`);
    await new Promise(s => setTimeout(s, 1200));
  }
  throw err;
}

export async function getDashboardKPI(): Promise<V0KPI[]> {
  const s = await fetchJSON("/api/dashboard");
  return [
    { label: "活躍學生", value: s.activeStudents, trend: s.activeStudentsWoW },
    { label: "今日答題", value: s.answersToday, trend: s.answersDoD },
    { label: "正確率", value: `${Math.round((s.accuracy ?? 0)*100)}%` },
    { label: "連勝最長", value: s.maxStreak ?? 0 },
  ];
}

export async function getLeaderboard(period: "week"|"month"|"all"="week"): Promise<V0Table> {
  const list = await fetchJSON(`/api/leaderboard?period=${period}`);
  return {
    columns: ["名次","姓名","答題數","連勝"],
    rows: list.map((u: any, i: number) => ({
      "名次": i+1, "姓名": u.name, "答題數": u.answers, "連勝": u.streak
    }))
  };
}

export async function getStudents(): Promise<V0Table> {
  const list = await fetchJSON("/api/students");
  return { columns: ["姓名","Email","等級","狀態"],
    rows: list.map((s: any)=>({ "姓名":s.name,"Email":s.email,"等級":s.level,"狀態":s.status })) };
}

export async function getQuestions(): Promise<V0Table> {
  const list = await fetchJSON("/api/questions");
  return { columns: ["ID","主題","難度","標籤","啟用"],
    rows: list.map((q: any)=>({ "ID":q.id,"主題":q.title,"難度":q.level,"標籤":(q.tags||[]).join(", "), "啟用": q.enabled ? "是":"否" })) };
}
