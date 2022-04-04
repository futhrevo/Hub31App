import { useMemo, useCallback } from 'react';
import { useTable, Column } from 'react-table';
import { Table, Button } from 'react-bootstrap';
import { useExportData, useColumnSummary, ColumnS } from "react-table-plugins";
import { QuizOutline } from '..';
import { QPaperResult, Question } from '../../../../../../redux/qpaper/reducer';
import { DefaultColumnSummary, getExportFileBlob } from '../../../../../Course/CourseResults/components/SessionResult/components/ResultsTable';
import { arrayCompare } from '../../../../../../modules/utils';

const getPreviewButton = (label: string, data: Question, onPreview?: (x: Question) => void) => (
  <Button variant="link" value={label} onClick={() => onPreview && onPreview(data)} className="text-light" block>
    {label}
  </Button>
);

const ResultsTable = ({ outline, results, onPreview }: { outline: QuizOutline, results: { [x: string]: QPaperResult }, onPreview?: (doc: Question) => void }) => {
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
          Cell: ({ value }) => {
            if (arrayCompare(value, el.answers[j]))
              return String(el.marks[j])
            else
              return String('X')
          },
        }))
      });
    });
    cols.push({
      Header: 'Total',
      accessor: 'score',
      // @ts-ignore
      columnSummaryFn: 'average',
    });
    cols.push({
      Header: 'Attempts',
      accessor: 'attempts',
      // @ts-ignore
      columnSummaryFn: 'max'
    });
    cols.push({
      Header: 'Result',
      accessor: (row: any) => Math.round(row.score * 100 / row.agg),
      // @ts-ignore
      columnSummaryFn: 'average',
      criteria: outline.criteria
    });
    return cols;
  }, [onPreview, outline.criteria, outline.questions]);

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
