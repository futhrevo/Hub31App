import { useMemo, useCallback } from 'react';
import { useTable, Column } from 'react-table';
import { Table, Button } from 'react-bootstrap';
import { useExportData, useColumnSummary, ColumnS } from "react-table-plugins";
import Papa from "papaparse";
import { OutlineArray, ResultObj } from '..';

// @ts-ignore
export function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns.map((col: { exportValue: any; }) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  }
}

// Define a default UI for column summaries
export function DefaultColumnSummary({ column: { columnSummary, setColumnSummary } }: { column: ColumnS }) {
  const summaryFns = [
    'count',
    'uniqueCount',
    'sum',
    'min',
    'max',
    'median',
    'average',
    'minMax',
  ]

  return (
    <div>
      <select
        value={columnSummary.type}
        onChange={e => {
          setColumnSummary(e.target.value)
        }}
      >
        {summaryFns.map((option, i) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <small> {columnSummary.value}</small>
    </div>
  )
}

const ResultsTable = ({ outline, results }: { outline: OutlineArray, results: ResultObj }) => {
  const columns = useMemo(() => {
    const cols: Array<Column> = [];
    cols.push({
      Header: 'Student Name',
      accessor: 'fname',
      // @ts-ignore
      columnSummaryFn: 'uniqueCount',
      ColumnSummary: ({ column: { columnSummary } }: { column: ColumnS }) => (
        <small>Unique Count: {columnSummary.value}</small>
      ),
    })
    outline.forEach(el => {
      cols.push({
        Header: el.desc,
        columns: el.mats.map(ml => {
          return {
            Header: ml.title,
            accessor: `chaps[${el.chapId}][${ml.matId}][p]`,
            Cell: ({ value }) => {
              if (value)
                return String(value)
              else
                return String('X')
            },
            points: ml.points,
            columnSummaryFn: 'average',
          }
        })
      });
    });
    return cols;
  }, [outline]);

  const data = useMemo(() => {
    return Object.keys(results).map(el => results[el]);
  }, [results]);

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Column Summary UI
      ColumnSummary: DefaultColumnSummary,
    }),
    []
  )
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    exportData } = useTable({ columns, data, getExportFileBlob, defaultColumn }, useExportData, useColumnSummary);

  const download = useCallback((xl) => {
    exportData("csv", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="result-table">
      <Button onClick={() => download(false)} className="m-3">Download as CSV</Button>
      <Table striped hover bordered responsive {...getTableProps()} className="text-center" size="sm">
        <thead className="thead-dark">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps({
                    // @ts-ignore
                    className: (cell.column.points === undefined) ? '' : ((cell.column.points === cell.value) ? 'bg-success' : 'bg-danger')
                  })}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot className="bg-light">
          {footerGroups.slice(0, 1).map(group => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column: any) => (
                <td {...column.getFooterProps()}>
                  {column.hasColumnSummary && column.render('ColumnSummary')}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
    </div>
  );
}

export default ResultsTable;
