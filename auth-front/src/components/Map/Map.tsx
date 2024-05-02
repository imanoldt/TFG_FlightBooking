const Map = ({ cityName }) => {
    // Implementación del mapa dependiendo del servicio que decidas usar
    const mapUrl = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    
    return (
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          title={`Map of ${cityName}`}
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          width="100%"
          height="450"
        ></iframe>
      </div>
    );
  };
  
  export default Map;