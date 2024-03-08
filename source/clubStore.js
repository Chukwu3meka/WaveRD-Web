const clubs = {
  club000000: [
    ["Free Agents", "Premiums", 2018, "ViewCrunch Garden", 100000, "Soccer, Earth"],
    ["SoccerMASS", []],
  ],
  club000001: [
    ["FC Barcelona", "Barça", 1899, "Camp Nou", 99359, "Barcelona, Spain"],
    ["Xavi Hernades", ["club000002", "club000031"]],
  ],
  club000002: [
    ["Real Madrid", "Los Blancos", 1902, "Santiago Bernabéu", 85454, "Madrid, Spain"],
    ["Carlo Ancelotti", ["club000001", "club000002", "club000007"]],
  ],
  club000003: [
    ["Atlético de Madrid", "Los Rojiblancos", 1903, "Wanda Metropolitano", 68000, "Madrid, Spain"],
    ["Diego Simeone", ["club000002"]],
  ],
  club000004: [
    ["Sevilla FC", "Sevillistas", 1905, "Ramón Sánchez Pizjuán", 45500, "Seville, Spain"],
    ["Julen Lopetegui", ["club000008"]],
  ],
  club000005: [
    ["Villarreal CF", "El Submarino", 1923, "Estadio de la Cerámica", 25000, "Villarreal, Spain"],
    ["Unai Emery", ["club000010"]],
  ],
  club000006: [
    ["Real Sociedad", "Txuri-urdin", 1909, "Anoeta", 32076, "	Donostia-SanSebastián, Spain"],
    ["Imanol Alguacil", ["club000007"]],
  ],
  club000007: [
    ["Athletic Club", "Los Leones", 1898, "San Mamés", 53332, "Bilbao, Spain"],
    ["Marcelino García Toral", ["club000006", "club000002"]],
  ],
  club000008: [
    ["Real Betis Balompié", "Los Verdiblancos", 1907, "Estadio Benito Villamarín", 60720, "Sevilla, Spain"],
    ["Manuel Pellegrini", ["club000009"]],
  ],
  club000009: [
    ["Granada CF", "Granada", 1974, "Nuevo Los Cármenes", 19336, "Granada, Spain"],
    ["Robert Moreno", ["club000008"]],
  ],
  club000010: [
    ["Valencia CF", "Los Ches", 1919, "Mestalla", 55000, "Valencia, Spain"],
    ["José Bordalás", ["club000002", "club000005"]],
  ],
  club000011: [
    ["FC Bayern München", "Die Roten", 1900, "Allianz Arena", 75000, "Munich, Germany"],
    ["Julian Nagelsmann", ["club000012", "club000020", "club000015", "club000018"]],
  ],
  club000012: [
    ["Borussia Dortmund", "Schwarzgelben", 1909, "Signal Iduna Park", 81365, "Dortmund, Germany"],
    ["Marco Rose", ["club000020", "club000011", "club000014"]],
  ],
  club000013: [
    ["RB Leipzig", "Die Bullen", 2009, "Red Bull Arena", 44345, "Leipzig, Germany"],
    ["Jesse Marsch", []],
  ],
  club000014: [
    ["Borussia Mönchengladbach", "Die Fohlen", 1900, "Borussia-Park", 54022, "Mönchengladbach, Germany"],
    ["Adi Hütter", ["club000012"]],
  ],
  club000015: [
    ["Bayer 04 Leverkusen", "Werkself", 1904, "BayArena", 30810, "Leverkusen, Germany"],
    ["Gerardo Seoane", ["club000011"]],
  ],
  club000016: [
    ["VfL Wolfsburg", "Die Wölfe", 1945, "Volkswagen Arena", 30122, "Wolfsburg, Germany"],
    ["Mark Van Bommel", []],
  ],
  club000017: [
    ["Eintracht Frankfurt", "Die Adler", 1899, "Deutsche Bank Park", 51500, "Frankfurt, Germany"],
    ["Oliver Glasner", []],
  ],
  club000018: [
    ["SV Werder Bremen", "Die Grün-Weißen", 1899, "Weserstadion", 43087, "Bremen, Germany"],
    ["Markus Anfang", ["club000011"]],
  ],
  club000019: [
    ["TSG Hoffenheim", "Hoffe", 1899, "Rhein-Neckar-Arena", 30164, "Sinsheim, Germany"],
    ["Sebastian Hoeneß", []],
  ],
  club000020: [
    ["FC Schalke 04", "Die Königsblauen", 1904, "Veltins Arena", 61973, "Gelsenkirchen, Germany"],
    ["Dimitrios Grammozis", ["club000011", "club000012"]],
  ],
  club000021: [
    ["Liverpool", "The Reds", 1892, "Anfield", 54167, "Liverpool, England"],
    ["Jürgen Klopp", ["club000028", "club000024", "club000025"]],
  ],
  club000022: [
    ["Manchester City", "The Citizens", 1887, "Etihad Stadium", 55097, "Manchester, England"],
    ["Pep Guardiola", ["club000024"]],
  ],
  club000023: [
    ["Tottenham Hotspur", "Spurs", 1882, "Tottenham Hotspur Stadium", 62062, "London, England"],
    ["Nuno Espírito Santo", ["club000026", "club000025", "club000030"]],
  ],
  club000024: [
    ["Manchester United", "The Red Devils", 1878, "Old Trafford", 75765, "Manchester, England"],
    ["Ole Gunnar Solskjær", ["club000022", "club000021", "club000036", "club000025"]],
  ],
  club000025: [
    ["Chelsea", "The Blues", 1905, "Stamford Bridge", 41837, "London, England"],
    ["Thomas Tuchel", ["club000023", "club000024", "club000021"]],
  ],
  club000026: [
    ["Arsenal", "The Gunners", 1886, "Emirates Stadium", 60432, "London, England"],
    ["Mikel Arteta", ["club000023", "club000024", "club000025"]],
  ],
  club000027: [
    ["Leicester City", "The Foxes", 1884, "King Power Stadium", 32262, "Leicester, England"],
    ["Brendan Rodgers", []],
  ],
  club000028: [
    ["Everton", "The Toffees", 1878, "Goodison Park", 40157, "Liverpool, England"],
    ["Rafael Benítez", ["club000021"]],
  ],
  club000029: [
    ["Wolverhampton Wanderers", "Wolves", 1877, "Molineux", 31700, "Wolverhampton, England"],
    ["Bruno Lage", []],
  ],
  club000030: [
    ["West Ham United", "The Hammers", 1895, "Olympic Stadium", 60000, "London, England"],
    ["David Moyes", ["club000023"]],
  ],
  club000031: [
    ["Paris Saint-Germain", "PSG", 1970, "Parc des Princes", 48712, "Paris, France"],
    ["Mauricio Pochettino", ["club000032", "club000035"]],
  ],
  club000032: [
    ["Olympique Lyonnais", "Les Gones", 1950, "Parc OL", 59500, "Lyon, France"],
    ["Peter Bosz", ["club000031", "club000040"]],
  ],
  club000033: [
    ["AS Monaco", "Les Monegasques", 1919, "Louis II", 18523, "Monaco, France"],
    ["Niko Kovač", ["club000036", "club000035"]],
  ],
  club000034: [
    ["LOSC Lille", "Les Dogues", 1944, "Stade Pierre Mauroy", 50186, "Lille, France"],
    ["Jocelyn Gourvennec", []],
  ],
  club000035: [
    ["Olympique de Marseille", "Les Phoceens", 1899, "Vélodrome", 67000, "Marseille, France"],
    ["Jorge Sampaoli", ["club000031", "club000033"]],
  ],
  club000036: [
    ["OGC Nice", "Le Gym", 1904, "Allianz Riviera", 35626, "Nice, France"],
    ["Christophe Galtier", ["club000033"]],
  ],
  club000037: [
    ["Stade Rennais FC", "Les Rouges et Noirs", 1901, "Roazhon Park", 31127, "Rennes, France"],
    ["Bruno Génésio", []],
  ],
  club000038: [
    ["Montpellier Hérault SC", "Les Pailladins", 1974, "Stade de la Mosson", 32900, "Montpellier, France"],
    ["Olivier Dall'Oglio", []],
  ],
  club000039: [
    ["FC Girondins de Bordeaux", "Les Girondins", 1881, "Stade Bordeaux-Atlantique", 42566, "Bordeaux, France"],
    ["Vladimir Petković", []],
  ],
  club000040: [
    ["AS Saint-Étienne", "Les Verts", 1928, "Geoffroy-Guichard", 41965, "Saint-Etienne, France"],
    ["Claude Puel", ["club000032"]],
  ],
  club000041: [
    ["Juventus", "Old Lady", 1897, "Juventus Stadium", 41588, "Turin, Italy"],
    ["Massimiliano Allegri", ["club000042", "club000049", "club000048", "club000046", "club000043", "club000047"]],
  ],
  club000042: [
    ["Inter", "Nerazzurri", 1908, "Giuseppe Meazza", 80018, "Milano, Italy"],
    ["Simone Inzaghi", ["club000046", "club000041", "club000047", "club000043"]],
  ],
  club000043: [
    ["Napoli", "Azzurri", 1926, "Stadio Diego Armando Maradona", 60240, "Napoli, Italy"],
    ["Luciano Spalletti", ["club000047", "club000041", "club000044", "club000045", "club000048", "club000042", "club000046"]],
  ],
  club000044: [
    ["Lazio", "Biancocelesti", 1900, "Stadio Olimpico", 73261, "Rome, Italy"],
    ["Maurizio Sarri", ["club000047", "club000043", "club000048"]],
  ],
  club000045: [
    ["Atalanta", "Orobici", 1907, "Atleti Azzurri d'Italia", 26724, "Bergamo, Italy"],
    ["Gian Piero Gasperini", ["club000043"]],
  ],
  club000046: [
    ["Milan", "Rossoneri", 1899, "San Siro", 80018, "Milano, Italy"],
    ["Stefano Pioli", ["club000042", "club000041", "club000047", "club000043"]],
  ],
  club000047: [
    ["Roma", "Giallorossi", 1927, "Stadio Olimpico", 73261, "Rome, Italy"],
    ["José Mourinho", ["club000044", "club000043", "club000046", "club000042", "club000041", "club000048"]],
  ],
  club000048: [
    ["Fiorentina", "Viola", 1926, "Artemio Franchi", 47290, "Firenze, Italy"],
    ["Vincenzo Italiano", ["club000041", "club000044", "club000043", "club000047"]],
  ],
  club000049: [
    ["Torino", "Granata", 1906, "Stadio Olimpico di Torino", 28140, "Torino, Italy"],
    ["Ivan Jurić", ["club000041"]],
  ],
  club000050: [
    ["Sassuolo", "Neroverdi", 1922, "Mapei Stadium", 23717, "Sassuolo, Italy"],
    ["Alessio Dionisi", []],
  ],
  club000051: [
    ["Ajax", "Godenzonen", 1900, "Johan Cruyff Arena", 54033, "Amsterdam, Netherlands"],
    ["Erik Ten Hag", ["club000052", "club000053", "club000055"]],
  ],
  club000052: [
    ["PSV", "Boeren", 1913, "Philips Stadion", 35119, "Eindhoven, Netherlands"],
    ["Roger Schmidt", ["club000051", "club000053"]],
  ],
  club000053: [
    ["Feyenoord", "De club van het volk", 1908, "De Kuip", 51117, "Rotterdam, Netherlands"],
    ["Arne Slot", ["club000051", "club000052", "club000055"]],
  ],
  club000054: [
    ["AZ", "Alkmaar", 1967, "AFAS Stadion", 17023, "Alkmaar, Netherlands"],
    ["Unknown", ["club000051"]],
  ],
  club000055: [
    ["FC Utrecht", "Utreg", 1970, "Stadion Galgenwaard", 24426, "Utrecht, Netherlands"],
    ["René Hake", ["club000051", "club000053"]],
  ],
  club000056: [
    ["Vitesse", "Geel en Zwart", 1892, "Gelredome", 25000, "Arnhem, Netherlands"],
    ["Thomas Letsch", []],
  ],
  club000057: [
    ["Willem II", "King's Army", 1896, "Koning Willem II Stadion", 14500, "Tilburg, Netherlands"],
    ["Željko Petrović", []],
  ],
  club000058: [
    ["SL Benfica", "As Águias", 1904, "Estadio da Luz", 65647, "Lisbon, Portugal"],
    ["Jorge Jesus", ["club000059"]],
  ],
  club000059: [
    ["FC Porto", "Dragões", 1893, "Estádio do Dragão", 50948, "Porto, Portugal"],
    ["Sérgio Conceição", ["club000064", "club000060", "club000058"]],
  ],
  club000060: [
    ["Sporting CP", "Leões", 1906, "Estádio José Alvalade", 50095, "Lisbon, Portugal"],
    ["Rúben Amorim", ["club000059"]],
  ],
  club000061: [
    ["SC Braga", "Os Arsenalistas", 1921, "Estádio Municipal de Braga", 30286, "Braga, Portugal"],
    ["Carlos Carvalhal", ["club000064", "club000062"]],
  ],
  club000062: [
    ["Vitória Guimarães", "White Angels", 1922, "D. Afonso Henriques", 30165, "Guimarães, Portugal"],
    ["Pedro Miguel Pepa", ["club000061", "club000064"]],
  ],
  club000063: [
    ["Rio Ave FC", "Vilacondenses", 1939, "Estádio dos Arcos", 12820, "Vila do Conde, Portugal"],
    ["Luís Freire", []],
  ],
  club000064: [
    ["Boavista FC", "As Panteras", 1903, "Estádio do Bessa", 28263, "Porto, Portugal"],
    ["João Pedro Sousa", ["club000059", "club000062", "club000061"]],
  ],
};

const listOfClubs = [
  "club000001",
  "club000002",
  "club000003",
  "club000004",
  "club000005",
  "club000006",
  "club000007",
  "club000008",
  "club000009",
  "club000010",
  "club000011",
  "club000012",
  "club000013",
  "club000014",
  "club000015",
  "club000016",
  "club000017",
  "club000018",
  "club000019",
  "club000020",
  "club000021",
  "club000022",
  "club000023",
  "club000024",
  "club000025",
  "club000026",
  "club000027",
  "club000028",
  "club000029",
  "club000030",
  "club000031",
  "club000032",
  "club000033",
  "club000034",
  "club000035",
  "club000036",
  "club000037",
  "club000038",
  "club000039",
  "club000040",
  "club000041",
  "club000042",
  "club000043",
  "club000044",
  "club000045",
  "club000046",
  "club000047",
  "club000048",
  "club000049",
  "club000050",
  "club000051",
  "club000052",
  "club000053",
  "club000054",
  "club000055",
  "club000056",
  "club000057",
  "club000058",
  "club000059",
  "club000060",
  "club000061",
  "club000062",
  "club000063",
  "club000064",
];

const clubStore = (ref) => {
  const [[title, nickname, founded, stadium, capacity, location], [coach, rivals]] = clubs[ref || "club000000"];

  return {
    ref,
    title,
    nickname,
    founded,
    stadium,
    capacity,
    location,
    coach,
    rivals,
    // rivals: rivals.map((rival) => clubs[rival][0][0]),
  };
};

export { listOfClubs, clubStore as default };
// export { listOfClubs };
