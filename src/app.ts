import * as express from 'express';
import routes from './routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
