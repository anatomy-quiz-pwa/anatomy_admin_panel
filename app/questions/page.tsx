import { V0Section } from "@/src/components/v0/V0Wrapper";
import { getQuestions } from "@/src/lib/adapters/v0-adapter";
import SimpleTable from "@/src/components/v0/SimpleTable";

export default async function Page() {
  const table = await getQuestions();
  return (
    <V0Section>
      <h1 style={{fontSize:24,fontWeight:800,margin:"8px 0 16px"}}>題庫管理</h1>
      <SimpleTable columns={table.columns} rows={table.rows}/>
    </V0Section>
  );
}
