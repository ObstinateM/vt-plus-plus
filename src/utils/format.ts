interface ueObject {
  [key: string]: string;
}

interface ueListObject {
  [key: string]: ueObject;
}

const l1portailmi: ueObject = {
  UED111: 'LANGAGE MATHEMATIQUE',
  UED112: 'ANALYSE REEL 1',
  UED121: 'OPTOELECTRONIQUE',
  UED131: 'PROGRAMMATION IMPERATIVE',
  UED132: 'INFORMATIQUE GENERALE',
  UEO111: 'EMULATEUR DISCIPLINAIRE',
  UEP111: 'PPEI',
  UET111: 'METHODOLOGIE',
  UET112: 'COMPETENCE NUMERIQUE (PIX)',
  UET113: 'ANGLAIS',
  UET211: 'ANGLAIS',
  UED211: 'ALGEBRE LINEAIRE ET GEOMETRIE',
  UED212: 'ANALYSE REEL 2',
  UED221: 'ELECTRONIQUE NUMERIQUE',
  UED231: 'ALGORITHMIQUE ET PROGRAMMATION',
  UED232: 'WEB STATIQUE',
  UED233: 'ARCHITECTURE'
};

const ueList: ueListObject = {
  l1portailmi_g1: l1portailmi,
  l1portailmi_g2: l1portailmi,
  l1portailmi_g3: l1portailmi,
  l1portailmi_g4: l1portailmi
};

/**
 * Check for a specific code if the UE is in the list, if so, replace the code by the UE name
 */
export function formatUE(ue: string, code: string): string {
  const splitted = ue.split(' - ');
  let newName = ueList[code][splitted[0]];

  if (!newName) return ue;
  if (splitted[1]) {
    newName += ' - ' + splitted[1];
  }

  return newName;
}

export function shouldBeFormatted(code: string): boolean {
  return Object.keys(ueList).includes(code);
}

export function formatMinutes(minutes: number) {
  if (minutes === 0) return '00';
  return minutes;
}

export function formatHours(event: any) {
  return `${event.start.getHours()}:${formatMinutes(
    event.start.getMinutes()
  )} - ${event.end.getHours()}:${formatMinutes(event.end.getMinutes())}`;
}
