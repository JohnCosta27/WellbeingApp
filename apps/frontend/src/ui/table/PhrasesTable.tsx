import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { UserHowAmIPhrase } from "@wellbeing/graphql-types";
import { FC, useState } from "react";
import { Table } from "./Table";

const columnHelper = createColumnHelper<UserHowAmIPhrase>();

const columns = [
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
    footer: (info) => info.column.id,
    aggregatedCell: ({ getValue }) => new Date(getValue()).toLocaleString(),
  }),
  columnHelper.accessor("phrase.phrase", {
    header: () => "Word",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

interface PhrasesTable {
  phrases: Array<UserHowAmIPhrase>;
}

export const PhrasesTable: FC<PhrasesTable> = ({ phrases }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const table = useReactTable({
    data: phrases,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    state: {
      sorting,
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
    <div className="flex gap-2 items-center mb-2">
      <button
        type="button"
        className="btn btn-primary"
        onClick={table.previousPage}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <span>
        {table.getState().pagination.pageIndex + 1} of {(table.getPageCount() < 1) ? 1 : table.getPageCount()}
      </span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={table.nextPage}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>

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
                {header.column.getCanGroup() && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={header.column.getToggleGroupingHandler()}
                  >
                    Group
                  </button>
                )}
              </th>
            ))}
          </tr>
        ))}
        body={table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {cell.getIsGrouped() ? (
                  <button
                    type="button"
                    {...{
                      onClick: row.getToggleExpandedHandler(),
                      style: {
                        cursor: row.getCanExpand() ? "pointer" : "normal",
                      },
                    }}
                  >
                    {row.getIsExpanded() ? "👇" : "👉"}{" "}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}{" "}
                    ({row.subRows.length})
                  </button>
                ) : cell.getIsAggregated() ? (
                  flexRender(
                    cell.column.columnDef.aggregatedCell ??
                      cell.column.columnDef.cell,
                    cell.getContext()
                  )
                ) : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </td>
            ))}
          </tr>
        ))}
        footer={null}
      />
    </>
  );
};
