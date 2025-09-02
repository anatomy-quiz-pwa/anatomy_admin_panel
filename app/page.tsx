import { V0Section } from "@/src/components/v0/V0Wrapper";
import SimpleKPI from "@/src/components/v0/SimpleKPI";
import { getDashboardKPI, getLeaderboard } from "@/src/lib/adapters/v0-adapter";
import SimpleTable from "@/src/components/v0/SimpleTable";

export default async function Page() {
  const kpis = await getDashboardKPI();
  const leaderboard = await getLeaderboard("week");
  return (
    <V0Section>
      <h1 style={{fontSize:24,fontWeight:800,margin:"8px 0 16px"}}>儀表板</h1>
      <SimpleKPI items={kpis}/>
      <h2 style={{fontSize:18,fontWeight:700,margin:"24px 0 8px"}}>排行榜</h2>
      <SimpleTable columns={leaderboard.columns} rows={leaderboard.rows}/>
    </V0Section>
  );
}
