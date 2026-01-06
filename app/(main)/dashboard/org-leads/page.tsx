import { Card, CardContent } from "@/components/ui/card";
import { PageTitle } from "@/components/layout/formatting";

export default function Page() {
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title={"Organisation leads"} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
