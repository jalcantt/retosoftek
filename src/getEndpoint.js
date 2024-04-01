const axios = require('axios');

const getEndpoint = async () => {
    try {
      // Lógica para obtener datos almacenados
      const dto = await obtenerDatosSWAPI();
      
      return {
        statusCode: 200,
        body: JSON.stringify(dto)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error al obtener los datos de SWAPI' })
      };
    }
  };

  // Función para obtener los datos de SWAPI y traducirlos
async function obtenerDatosSWAPI() {
    try {
        const response = await axios.get('https://swapi.dev/api/people/');
        const data = response.data.results.map(personaje => {
            return {
                id: personaje.id, 
                url:personaje.url,
                nombre: personaje.name,
                altura: personaje.height,
                peso: personaje.mass,
                color_pelo: personaje.hair_color,
                color_piel: personaje.skin_color,
                color_ojos: personaje.eye_color,
                fecha_nacimiento: personaje.birth_year,
                genero: personaje.gender,
                peliculas: personaje.films,
                especies: personaje.species
            };
        });
        return {
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
            results: data
        };
    } catch (error) {
        throw new Error('Error al obtener datos de SWAPI');
    }
  }
  

  module.exports = {
    getEndpoint
  };

