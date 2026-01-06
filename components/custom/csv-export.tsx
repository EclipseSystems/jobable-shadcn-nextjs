import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

export function CSVMenu({ data, fileName, className }: {
  data: Array<any>;
  fileName: string;
  className?: string;
}) {
  const downloadCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(',')).join('\n');
    const csvString = `${headers}\n${rows}`;

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Button variant={"outline"}>
          <Download />
          Export to...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={downloadCSV}
        >
          Export to CSV
        </DropdownMenuItem>
        <DropdownMenuItem>Export to XLSX</DropdownMenuItem>
        <DropdownMenuItem>Export to JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
