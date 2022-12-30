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

const l2info: ueObject = {
    UED311: 'PROBABILITES',
    UED312: 'THEORIE DES LANG...',
    UED313: 'ANGLAIS',
    UED321: 'PROGRAMMATION FONCTIONNELLE',
    UED322: 'WEB DYNAMIQUE',
    UED323: 'INTRODUCTION AUX BASE DE DONNEE',
    UED411: 'LOGIQUE',
    UED412: 'PROGRAMMATION ORIENTEE OBJET',
    UED421: 'INTRODUCTION AUX RESEAUX',
    UED422: 'PROGRAMMATION SYSTEME',
    UEO311: 'ECONOMIE POUR L INFORMATIQUE 1',
    UEO312: 'ALGEBRE ET ARITH...',
    UEO411: 'STATISTIQUES',
    UEP311: 'PPEI',
    UET313: 'ECONOMIE POUR L INFORMATIQUE',
    UET411: 'ANGLAIS',
    UET412: 'COMPETENCES NUMERIQUES (PIX)'
};

const l3dlbi: ueObject = {
    UED514: 'BIOLOGIE STRUCTURALE',
    UED531: 'STATISTIQUES POUR LA BIOLOGIE',
    UET511: 'ANGLAIS',
    UED513: 'BIOLOGIE CELLULAIRE',
    UED511: 'RÉGULATION EXPRESSION GÉNIQUE PROCARYOTE',
    UED521: 'BASES DE DONNÉES',
    UED524: 'PROGRAMMATION R',
    UED512: 'BIOCHIMIE'
};

const ueList: ueListObject = {
    l1portailmi_g1: l1portailmi,
    l1portailmi_g2: l1portailmi,
    l1portailmi_g3: l1portailmi,
    l1portailmi_g4: l1portailmi,
    l2infog1: l2info,
    l2infog2: l2info,
    l2infog3: l2info,
    l2infog4: l2info,
    l3dlbi: l3dlbi,
    l2lddisdv: l3dlbi
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

export function formatClassname(summary: string) {
    const splitted = summary.split(' - ');
    if (splitted[0].length < 25) return summary;
    return splitted[0].slice(0, 25) + (splitted[1] ? '... - ' + splitted[1] : '...');
}
export function rangeHour(event: any) {
    return (
        (event.end.getHours() - event.start.getHours()) * 60 +
        Math.abs(event.end.getMinutes() - event.start.getMinutes())
    );
}
