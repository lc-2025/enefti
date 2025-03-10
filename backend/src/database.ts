import { connect } from 'mongoose';
import { MESSAGE, ROUTES } from './utils/constants';
import { Mongoose } from 'mongoose';

/**
 * @description Database connection
 * Connects API to a MongoDB Cluster
 * @author Luca Cattide
 * @date 10/03/2025
 * @returns {*}  {Promise<Mongoose>}
 */
const connectDb = async (): Promise<Mongoose> => {
  const connection = await connect(ROUTES.API.DATABASE);

  // Connection check
  if (!connection) {
    throw new Error(MESSAGE.CONNECTION);
  }

  console.log(MESSAGE.CONNECTION);

  return connection;
};

export default connectDb;
