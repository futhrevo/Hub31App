import stringToColour from './string-to-color';

export default function genCourseGrad(name: string, prof: string) {
  const hexValues = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
  ];

  function populate(a: string) {
    for (let i = 0; i < 6; i += 1) {
      const x = Math.round(Math.random() * 14);
      const y = hexValues[x];
      a += y;
    }
    return a;
  }

  const newColor1 = `${name.length > 0 ? stringToColour(name) : populate('#')
    }33`;
  const newColor2 = `${prof.length > 0 ? stringToColour(prof) : populate('#')}`;
  // const angle = Math.round(Math.random() * 360);
  const angle = 0;

  const gradient = `linear-gradient(${angle}deg, ${newColor1}, ${newColor2})`;
  return gradient;
}
