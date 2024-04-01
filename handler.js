'use strict';

const querystring = require("querystring")

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









