import React, { useMemo, useEffect } from 'react';
import { useTable, Column, useRowSelect } from 'react-table';
import { Table, Button } from 'react-bootstrap';
import { useColumnSummary, ColumnS } from "react-table-plugins";
import { QPaperResult, Question } from "../../../../../redux/qpaper/reducer";
import { QuizOutline } from "../../../ViewResults/components/QuizSessionResults";
import { DefaultColumnSummary } from '../../../../Course/CourseResults/components/SessionResult/components/ResultsTable';
import { IndeterminateCheckbox } from './components/IndeterminateCheckbox';
import { EditableCell } from './components/EditableCell';

const getPreviewButton = (label: string, data: Question, onPreview?: (x: Question) => void) => (
  <Button variant="link" value={label} onClick={() => onPreview && onPreview(data)} className="text-light" block>
    {label}
  </Button>
);

const ResultsTable = ({ outline, results, onPreview, setData, onSelect }: { outline: QuizOutline, results: { [x: string]: QPaperResult }, onPreview?: (doc: Question) => void, setData: (data: any) => void, onSelect: (data: Array<string>) => void }) => {
  const columns = useMemo(() => {
    const cols: Array<Column> = [];
    cols.push({
      Header: 'Student Name',
      accessor: (row: any) => (row['fname'] || row['stuId']),
      // @ts-ignore
      columnSummaryFn: 'uniqueCount',
      ColumnSummary: ({ column: { columnSummary } }: { column: ColumnS }) => (
        <small>Unique Count: {columnSummary.value}</small>
      ),
    })
    outline.questions.forEach((el, i) => {
      cols.push({
        id: `Q${i}`,
        Header: getPreviewButton(`Q${i}`, el, onPreview),
        columns: el.answers.map((ql, j) => ({
          Header: `S${j}`,
          marks: el.marks[j],
          accessor: `ans[${el.id}][${j}]`,
          disableColumnSummary: true,
          Cell: ({ value }) => {
            if (value)
              return String(value)
            else
              return String('X')
          },
        }))
      });
    });
    cols.push({
      Header: 'Attempts',
      accessor: 'attempts',
      // @ts-ignore
      columnSummaryFn: 'max'
    });
    cols.push({
      Header: 'Total',
      accessor: 'score',
      Cell: EditableCell,
      // @ts-ignore
      columnSummaryFn: 'average',
    });
    return cols;
  }, [onPreview, outline.questions]);

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

  const updateMyData = (rowIndex: number, columnId: string, value: number) => {
    // We also turn on the flag to not reset the page
    const { stuId } = data[rowIndex];
    const newRes = { ...results };
    newRes[stuId].score = Number(value);
    setData(newRes);
  }

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    state: { selectedRowIds }, } = useTable({ columns, data, defaultColumn, updateMyData }, useRowSelect, useColumnSummary,
      hooks => {
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            // @ts-ignore
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: { row: any }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns
        ])
      }
    );

  useEffect(() => {
    const checkedRows = Object.keys(selectedRowIds).map(Number);
    const selected = checkedRows.map(el => rows[el]?.original?.stuId)
    onSelect(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowIds]);

  return (
    <div className="result-table">
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
                    className: (cell.column.criteria === undefined) ? '' : ((cell.value >= cell.column.criteria) ? 'bg-success' : 'bg-danger')
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
