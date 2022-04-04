declare module 'react-table-plugins' {
  export function useExportData();
  export function useColumnSummary();

  export interface ColumnSummary {
    type: string;
    value: number
  }
  export function setColumnSummary(data: any);

  export interface ColumnS extends Column {
    columnSummary: ColumnSummary;
    setColumnSummary: setColumnSummary;
  }
}
