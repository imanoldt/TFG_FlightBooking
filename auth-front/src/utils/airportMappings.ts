// Define un tipo para el mapeo
interface AirportMapping {
    [key: string]: string;
}

// Define el objeto de mapeo
const airportMapping: AirportMapping = {
    "las palmas": "Gran Canaria",
    "madrid": "Madrid-Barajas",
    "ibiza": "Ibiza",
    "londres": "Londres-Gatwick",
    "malaga": "Málaga-Costa del Sol",
    "paris": "Charles de Gaulle",
    "barcelona": "Barcelona-El Prat",
    "sevilla": "Sevilla",
    "amsterdam": "Ámsterdam-Schiphol",
    "los angeles": "Los Ángeles"
};

export default airportMapping;
