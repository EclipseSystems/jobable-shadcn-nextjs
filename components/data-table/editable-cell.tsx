import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { CellContext } from "@tanstack/react-table";

export const EditableCell = ({ getValue, row, column, table }: CellContext<any, unknown>) => {
  const initialValue = getValue() as string
  const tableMeta = table.options.meta
  const [value, setValue] = useState(initialValue)

  useEffect(() => {setValue(initialValue)}, [initialValue])

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value)
  }

  if (tableMeta?.editedRows[row.id]) {
    return (
      <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
    />
    )
  }
  return <span>{value}</span>
}