import { AppDataSource } from './data-source';
import app from './app';
import envConfig from './config/envConfig';
import dataSource from './data-source';

const { PORT } = envConfig;

export const main = async () => {
  try {
    await dataSource.AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
