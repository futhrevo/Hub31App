import { OutlineArray } from "..";

const TableResultHeader = ({ outline }: { outline: OutlineArray }) => {
  if (outline.length === 0) return <thead><tr><th>Nothing to Show here</th></tr></thead>
  return (
    <thead>
      <tr>
        <th rowSpan={2}>#</th>
        {outline.map(el => <th key={el.chapId} colSpan={el.mats.length}>{el.desc || el.chapId}</th>)}
      </tr>
      <tr>
        {outline.map(el => el.mats.map(mat => <th key={mat.matId}>{mat.title}</th>))}
      </tr>
    </thead>
  );
}

export default TableResultHeader;
