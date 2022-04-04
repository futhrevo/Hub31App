import { OutlineArray } from "..";
import { EnCoursesType } from "../../../../../../redux/courses/enrollReducer";

const TableResultRow = ({ outline, result }:
  {
    outline: OutlineArray;
    result: EnCoursesType
  }) => {
  return (
    <tr>
      <td>{result.fname || result.stuId}</td>
      { outline.map(el => {
        return el.mats.map(ml => {
          if (ml.points === result.chaps?.[el.chapId]?.[ml.matId]?.p) {
            return <td key={ml.matId} className="bg-success">{ml.points}</td>
          }
          return <td key={ml.matId} className="bg-danger">X</td>
        })
      })}
    </tr>
  );
}

export default TableResultRow;


