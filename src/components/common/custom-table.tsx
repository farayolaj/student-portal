import { Card, CardBody, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";

type CustomTableProps<T> = Omit<TableOptions<T>, "getCoreRowModel">;

export default function CustomTable<T>(props: CustomTableProps<T>) {
  const table = useReactTable({
    ...props,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card w="full" overflowX="auto">
      <CardBody>
        <Table className="w-full ">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} colSpan={header.colSpan} p={3}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id} p={3}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
