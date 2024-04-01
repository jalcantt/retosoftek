'use strict';

const querystring = require("querystring")

const axios = require('axios');
const { v4 } = require("uuid");
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();


module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hola Eli Eli!',
        input: event,
      },
      null,
      2
    ),
  };


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.helloUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hola usuario ${event.pathParameters.name}`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.createUser = async (event) => {
  const body = querystring.parse(event["body"])

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Peticion para crear usuarios",
        input: `Hola ${body.user}`,
      },
      null,
      2
    ),
  };
};

module.exports.getEndpoint = async () => {
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

module.exports.getEndpointFromBD = async () => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({ TableName: "test1" }).promise();
  
    const dto = result.Items;

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


module.exports.postEndpoint = async (event) => {

  try {
    const body = JSON.parse(event.body);

    // Extraer los datos del cuerpo de la solicitud
    const datos = {
      id: v4(),
      nombre: body.url,
      nombre: body.nombre,
      altura: body.altura,
      peso: body.peso,
      color_pelo: body.color_pelo,
      color_piel: body.color_piel,
      color_ojos: body.color_ojos,
      fecha_nacimiento: body.fecha_nacimiento,
      genero: body.genero,
      peliculas: body.peliculas,
      especies: body.especies
    };

 // Almacenar los datos en DynamoDB
    await dynamodb.put({
      TableName: 'test1',
      Item: datos
    }).promise();


    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Datos guardados correctamente" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al guardar los datos" }),
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