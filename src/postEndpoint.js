const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4 } = require("uuid");

const postEndpoint = async (event) => {

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


  module.exports = {
    postEndpoint
  };