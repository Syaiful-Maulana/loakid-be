require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const helper = require('./helpers/response');
const routes = require('./routes');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const DSN = process.env.DSN;
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

Sentry.init({
  dsn: DSN,
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/image', express.static('public/uploads'));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helper);
app.set('view engine', 'ejs');
app.use(`${process.env.BASE_URL}`, routes);

app.use(Sentry.Handlers.errorHandler());

// run app
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
