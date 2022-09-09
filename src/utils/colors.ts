interface colorsType {
  [key: string]: {
    bgColor: string;
    borderColor: string;
  };
}

const colorsLight: colorsType = {
  CM: {
    bgColor: '#f7e7fd',
    borderColor: '#e7bafd'
  },
  TD: {
    bgColor: '#dff7f7',
    borderColor: '#8be0e1'
  },
  Examen: {
    bgColor: '#fde7e7',
    borderColor: '#fdbaba'
  },
  DS: {
    bgColor: '#fde7e7',
    borderColor: '#fdbaba'
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

const colorsDark: colorsType = {
  CM: {
    bgColor: '#280037',
    borderColor: '#e7bafd'
  },
  TD: {
    bgColor: '#004040',
    borderColor: '#8be0e1'
  },
  Examen: {
    bgColor: '#400000',
    borderColor: '#fdbaba'
  },
  DS: {
    bgColor: '#400000',
    borderColor: '#fdbaba'
  },
  TP: {
    bgColor: '#004040',
    borderColor: '#8be0e1'
  },
  Others: {
    bgColor: '#473400',
    borderColor: '#ffe4a7'
  }
};

export function getEventColor(classType: string, className: string) {
  let str = className.split(' ');
  let type = str[str.length - 1];

  if (classType === 'light') {
    if (colorsLight[type]) return colorsLight[type];
    return colorsLight.Others;
  }

  if (colorsDark[type]) return colorsDark[type];
  return colorsDark.Others;
}
