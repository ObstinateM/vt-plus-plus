interface colorsType {
  [key: string]: {
    bgColor: string;
    borderColor: string;
  };
}

const colors: colorsType = {
  CM: {
    bgColor: '#f7e7fd',
    borderColor: '#e7bafd'
  },
  TD: {
    bgColor: '#dff7f7',
    borderColor: '#8be0e1'
  },
  Examen: {
    bgColor: '#fef8e7',
    borderColor: '#ffe4a7'
  },
  TP: {
    bgColor: '#dff7f7',
    borderColor: '#8be0e1'
  },
  Others: {
    bgColor: '#fef8e7',
    borderColor: '#ffe4a7'
  }
};

export function getEventColor(className: string) {
  let str = className.split(' ');
  let type = str[str.length - 1];
  if (colors[type]) return colors[type];
  return colors.Others;
}
