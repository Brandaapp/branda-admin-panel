import bunyan from 'bunyan';

function reqSerializer (req) {
  return {
    url: req.url,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query
  };
}

function credentialsSerializer (credentials) {
  return {
    csrfToken: credentials.csrfToken,
    username: credentials.username,
    password: 'Authenticated - OBFUSCATED'
  };
}

const logger = bunyan.createLogger({
  name: 'branda-admin-panel-server',
  level: bunyan.DEBUG,
  serializers: {
    req: reqSerializer,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
    credentials: credentialsSerializer
  }
});

export default logger;
