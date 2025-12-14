import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  return <>
    <Card>
      <CardContent>
        <p className="text-2xl font-bold tracking-tight">Tasks</p>
        {/* <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="kanban"></TabsContent>
          <TabsContent value="list"></TabsContent>
          <TabsContent value="table"></TabsContent>
        </Tabs> */}
      </CardContent>
    </Card>
  </>
}