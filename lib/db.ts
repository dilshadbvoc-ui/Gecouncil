import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Reuse connection across hot reloads in dev
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, reuse at module level (serverless warm instances)
  clientPromise = new MongoClient(uri, options).connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('gec');
}

export default clientPromise;
