## External links
- React hooks for arrays: https://react.dev/learn/updating-arrays-in-state#inserting-into-an-array

## Button
```bash
const [value, setValue] = useState(false)
const handleClick = () => {setValue(value ? false : true)}

<Button onClick={handleClick}>
    {enableDash ? true : false}
</Button>
```
## Checkbox
```bash
const [value, setValue] = useState(false)

function handleSetValue(value: boolean) {
    setValue(value)
}

<Checkbox checked={value} onCheckedChange={handleSetValue} />
```
## External dialog
### Main page

```bash
const [diaOpen, setDiaOpen] = useState(false)

<Button onClick={() => setEditOpen(true)}></Button>
<ExtDialog isOpen={diaOpen} onClose={() => setDiaOpen(false)} />
```

### Dialog
```bash
interface DialogProps {
    isOpen: boolean;
    onClose: () => void
}
export function ExtDialog({ isOpen, onClose }: DialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <Button onClick={onClose}></Button>
        </Dialog>
    )
}
```
## Select
```bash
const [value, setValue] = useState('')

<Select value={value} onValueChange{(e) => setValue(e.value)}>
# Put items here
</Select>
```
## Table rendering
```bash
<Table>
<TableHeader>
<TableRow>
    {Object.keys(data()[0]).map((header) => (
        <TableHead key={header.indexOf.toString()}>
            {header}
        </TableHead>
    ))}
</TableRow>
</TableHeader>
<TableBody>
    {data().map((row) => (
        <TableRow>
            {Object.values(row).map((cell) => (
                <TableCell key={cell}>{cell}</TableCell>
            ))}
        </TableRow>
    ))}
</TableBody>
</Table>
```