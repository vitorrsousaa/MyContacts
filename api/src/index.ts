import express from 'express';
import cors from './app/middlewares/cors';
import errorHandler from './app/middlewares/errorHandler';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(cors);

app.use(router);

app.use(errorHandler);

app.listen(3000, () => console.log('Server started at port 3000'));

// SOP -> Same Origin Policy -> Política de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens cruzadas
// Origem: protocolo://domínio:porta

// Saída: http://localhost:3000
// Destino: http://localhost:3001

// Toda vez que ferimos a SOP, a Request passa a ser do tipo CORS
// Para utilizar a Request pelo front e resolver o problema do CORS, precisamos passar no Header que a origem é confiável
