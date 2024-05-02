
import DefaultLayoutTemplate from '../layout/DefaultLayoutTemplate';
import Collage from '../components/Collage/Collage';
import Text from '../components/Text/Text';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../components/Map/Map';


const CityPage = () => {
  const { cityName } = useParams();
  const [cityDetails, setCityDetails] = useState({ images: [], description: '' });

  useEffect(() => {
    axios.get(`http://localhost:7903/api/city-images/${cityName}`)
      .then(response => {
        setCityDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching city details:', error);
      });
  }, [cityName]);



  return (
    
    <DefaultLayoutTemplate>
    <Collage images={cityDetails.images} cityName={cityName}/>
    <div className="container mx-auto px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
        <div className="lg:w-1/2">
          <Text quote={cityDetails.description} />
        </div>
        <div className="lg:w-1/2">
          {/* Aquí se montará el componente Map */}
          <Map cityName={cityName} />
        </div>
      </div>
    </div>
</DefaultLayoutTemplate>
);
};


export default CityPage;
