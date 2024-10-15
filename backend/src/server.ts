import app from './app.js';
import 'dotenv/config';
import Logger from './lib/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  Logger.debug(`Server running on port ${PORT}`);
});
