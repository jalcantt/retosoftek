
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'jalcantaraa',
  applicationName: 'curso-slsl-hola-mundo',
  appUid: 'Px3Mssxq4GtGpsg3dY',
  orgUid: '36199f92-8b2a-46f4-ab5f-7c99c3c0003d',
  deploymentUid: '5b885ff0-e734-4991-889c-5fb820195eb2',
  serviceName: 'curso-slsl-hola-mundo',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '7.2.3',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'curso-slsl-hola-mundo-dev-getEndpoint', timeout: 6 };

try {
  const userHandler = require('./handler.js');
  module.exports.handler = serverlessSDK.handler(userHandler.getEndpoint, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}