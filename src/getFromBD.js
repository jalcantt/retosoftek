const AWS = require('aws-sdk');

const getEndpointFromBD = async () => {
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

  module.exports = {
    getEndpointFromBD
  };