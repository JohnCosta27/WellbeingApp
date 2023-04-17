import { MentalEnergy } from "@wellbeing/graphql-types";
import { FC, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "./Table";

const columnHelper = createColumnHelper<MentalEnergy>();

const columns = [
  columnHelper.accessor("date", {
    cell: (info) => new Date(info.getValue()).toLocaleString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("level", {
    header: () => "Level",
    cell: (info) => (
      <div
        className="radial-progress"
        style={{ "--value": info.getValue() * 100, "--size": "4rem" } as object}
      >
        {Math.floor(info.getValue() * 100)}
      </div>
    ),
    footer: (info) => info.column.id,
  }),
];

interface MentalEnergyTable {
  mentalEnergy: Array<MentalEnergy>;
}

export const MentalEnergyTable: FC<MentalEnergyTable> = ({ mentalEnergy }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: mentalEnergy,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={table.previousPage}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <span>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={table.nextPage}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
      <Table
        header={table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <button
                  type="button"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </button>
              </th>
            ))}
          </tr>
        ))}
        body={table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        footer={null}
      />
    </>
  );
};
