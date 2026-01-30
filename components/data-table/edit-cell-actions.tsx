import React from "react";

import { Button } from "../ui/button";
import { Check, Pencil, X } from "lucide-react";
import { CellContext } from "@tanstack/react-table";

export const EditCellActions = ({ row, table }: CellContext<any, unknown>) => {
  const tableMeta = table.options.meta

  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    tableMeta?.setEditedRows((old: { [key: string]: boolean }) => ({...old, [row.id]: !old[row.id]}))
    if (elName !== "edit") {
      tableMeta?.revertData(row.index, e.currentTarget.name === "cancel")
    }
  }

  if (tableMeta?.editedRows[row.id]) {
    return (
      <div className="flex items-center gap-1 w-12">
        <Button variant="ghost" size="icon-sm" onClick={setEditedRows} name="cancel"><X className="text-red-500" /></Button>
        <Button variant="ghost" size="icon-sm" onClick={setEditedRows} name="done"><Check className="text-green-500" /></Button>
      </div>
    )
  }
  return (
    <div className="w-12">
      <Button variant="ghost" size="icon-sm" onClick={setEditedRows} name="edit"><Pencil /></Button>
    </div>
  )
}