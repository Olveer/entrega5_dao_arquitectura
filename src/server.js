
import app from './app.js';
import config from './config/env.config.js';

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});