import React, { useEffect, useMemo, useState } from "react";

import { MdExpandMore, MdOutlineExpandMore } from "react-icons/md";
import { useDatabase } from "@/dexie-test/DataCiteStore";
import {convertToDataCiteXML} from "@/dexie-test/utils"
import {dcMetadata_4_6} from "@flowcore/DataCite/types"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IoIosArrowDown } from "react-icons/io";

const columnHelper = createColumnHelper();

interface TableNavProps {
    table: any;
    pagination: any;
}

const TableNav= ({table,pagination}:TableNavProps) =>{
  return(
    <div className="flex flex-row align-items-end">
        <button
          className="paginationButton"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="paginationButton"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        {table.getCanPreviousPage() &&
        <button
          className="paginationButton"
          onClick = {()=>table.setPageIndex(pagination.pageIndex-1)}
        >
          {pagination.pageIndex}
        </button>
        }
        <button
          className="paginationButton bg-gray-200"
        >
          {pagination.pageIndex + 1}
        </button>
        {table.getCanNextPage() &&
        <button
          className="paginationButton"
          onClick = {()=>table.setPageIndex(pagination.pageIndex+1)}
        >
          {pagination.pageIndex + 2}
        </button>
        }
        <button
          className="paginationButton"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="paginationButton"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
  )
}

export const DataView = () => {
  const { db, isLoading } = useDatabase("flow1");
  const [articles, setArticles] = useState<dcMetadata_4_6>([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  console.log(articles[0])

  useEffect(() => {
    if (db?.metadata) {
      db.metadata
        .toArray()
        .then((data) => setArticles(data))
        .catch(console.error);
    }
  }, [isLoading, db]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("Expansion", {
        header: "",
        cell: (info) => (
          <button
            className="p-1 !h-full !w-full self-center"
            onClick={() =>
              setExpandedRow(expandedRow === info.row.id ? null : info.row.id)
            }
          >
            <IoIosArrowDown />
          </button>
        ),
      }),
      columnHelper.accessor("titles", {
        header: "Title",
        cell: (info) => (
          <div className="!max-w-[300px]">
            {info.getValue()?.[0]?.title || "N/A"}
          </div>
        ),
      }),
      columnHelper.accessor("creators", {
        header: "Authors",
        cell: (info) => (
          <div className="!max-w-[300px]">
            {info
              .getValue()
              ?.map((creator) => creator.name)
              .join(", ") || "Unknown"}
          </div>
        ),
      }),
      columnHelper.accessor("publicationYear", {
        header: "Pub_Year",
        cell: (info) => (
          <div className="!max-w-[30px] !text-center items-center">
            {info.getValue() || "Unknown"}
          </div>
        ),
      }),
      columnHelper.accessor("publisher", {
        header: "Publisher",
        cell: (info) => (
          <div className="!max-w-[200px]">
            {info.getValue().name || "Unknown"}
          </div>
        ),
      }),
    ],
    [expandedRow]
  );

  function printArticle(){
    console.log(convertToDataCiteXML(articles[0]))
  }

  const table = useReactTable({
    data: articles,
    rowCount: articles.length,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      //...
      pagination,
    },
  });

  return (
    <>
      <div className="mt-2 !max-h-[75vh] overflow-scroll">
        <button onClick={()=>printArticle()}>Print Article</button>
        <table className="!w-full overflow-x-scroll text-xs border-collapse border border-gray-300 table-none !h-[60vh] !min-h-[60vh] !max-h-[60vh]">
          <thead className="bg-gray-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`border ${
                      index === 0
                        ? "w-[10px]] min-w-0 max-w-[30px] p-1"
                        : "text-left max-w-2 px-4"
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <>
                <tr
                  key={row.id}
                  className={`border ${
                    expandedRow === row.id ? "font-semibold" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`border text-left !max-h-3 !min-h-3 !h-3 !p-0 ${
                        index === 0 ? "!w-[10px] min-w-0 max-w-[30px] m-0" : "px-1"
                      } ${
                        expandedRow === row.id
                          ? "bg-gray-200"
                          : "whitespace-nowrap overflow-hidden text-ellipsis"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {expandedRow === row.id && (
                  <tr className="border bg-gray-50">
                    <td colSpan={columns.length} className="p-2">
                      <strong>Abstract:</strong>{" "}
                      {row.original.Description?.[0]?.description ||
                        "No description available"}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <TableNav table={table} pagination={pagination} />
    </>
  );
};
