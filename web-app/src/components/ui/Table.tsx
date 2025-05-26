import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../utils";
import { Button } from "./Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

type TableProps<TData> = {
  data: Array<TData>;
  columns: Array<ColumnDef<TData>>;
  tableClass?: string;
};

const Table = <TData,>({ data, columns, tableClass }: TableProps<TData>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "relative overflow-auto border border-foreground rounded-md",
          tableClass
        )}
      >
        <table className="grid border-separate border-spacing-0">
          <thead className="grid sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="flex w-full" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="flex p-1 border-b border-foreground bg-background first:rounded-tl-md last:rounded-tr-md"
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="grid">
            {table.getRowModel().rows.map((row, i) => (
              <tr
                className="flex w-full even:bg-background last:rounded-b-md"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={cn(
                      "px-2 py-1 flex overflow-hidden",
                      i === table.getRowModel().rows.length - 1 &&
                        "first:rounded-bl-md last:rounded-br-md"
                    )}
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>
          </div>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          {/* <div className="flex items-center gap-1">
            <span className="whitespace-nowrap">Go to page:</span>
            <Input
              className="appearance-none"
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              disabled={!table.getCanNextPage() && !table.getCanPreviousPage()}
            />
          </div> */}
          <RowsPerPageSelect
            value={table.getState().pagination.pageSize.toString()}
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
          />
        </div>
        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
          {table.getRowCount().toLocaleString()} Rows
        </div>
      </div>
    </div>
  );
};
Table.displayName = "Table";

const RowsPerPageSelect = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="!w-[120px] border-accent">
        <SelectValue defaultValue="10" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="10">Show 10</SelectItem>
          <SelectItem value="20">Show 20</SelectItem>
          <SelectItem value="50">Show 50</SelectItem>
          <SelectItem value="100">Show 100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { Table };
