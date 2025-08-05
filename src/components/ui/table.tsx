interface TableProps {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        {children}
      </table>
    </div>
  )
}

Table.Header = function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b border-border bg-muted">
      {children}
    </thead>
  )
}

Table.Body = function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}

Table.Row = function TableRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <tr className={`border-b border-border transition-colors hover:bg-muted/50 ${className}`}>
      {children}
    </tr>
  )
}

Table.Head = function TableHead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`}>
      {children}
    </th>
  )
}

Table.Cell = function TableCell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`p-4 align-middle ${className}`}>
      {children}
    </td>
  )
}
