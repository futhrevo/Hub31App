import { generatePath } from "react-router";
import { pvtLinksMap } from '../layouts/Routes';

function getMaterialGlyph(matType: number) {
  let glyph = 'file';
  switch (matType) {
    case 0:
      glyph = 'clipboard-list';
      break;
    case 1:
      glyph = 'film';
      break;
    default:
      break;
  }
  return glyph;
}

function getmaterialPath(courseId: string, chapId: string, matId: string, matType: number, link: string) {
  let name;
  switch (matType) {
    case 0:
      name = 'ViewQuestionpaper';
      break;
    case 1:
      name = 'ViewVideo';
      break;
    default:
      name = 'ViewDocument';
      break;
  }
  const path = pvtLinksMap?.get(name)?.path || '';
  return generatePath(path, {
    courseId, chapId, matId, link, id: link
  })
}

export { getMaterialGlyph, getmaterialPath };
