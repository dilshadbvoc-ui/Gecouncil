import { ObjectId } from 'mongodb';
import { getDb } from './db';
import { University, Director, PageGallery, Enquiry } from '@/types/admin';

// ─── helpers ────────────────────────────────────────────────────────────────

function toId(doc: Record<string, unknown>) {
  const { _id, ...rest } = doc;
  return { id: (_id as ObjectId).toString(), ...rest };
}

// ─── Universities ────────────────────────────────────────────────────────────

export async function getUniversities(): Promise<University[]> {
  const db = await getDb();
  const docs = await db.collection('universities').find().toArray();
  return docs.map(d => toId(d as Record<string, unknown>)) as University[];
}

export async function getUniversityById(id: string): Promise<University | null> {
  const db = await getDb();
  const doc = await db.collection('universities').findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return toId(doc as Record<string, unknown>) as University;
}

export async function createUniversity(data: Omit<University, 'id'>): Promise<University> {
  const db = await getDb();
  const result = await db.collection('universities').insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return { id: result.insertedId.toString(), ...data } as University;
}

export async function updateUniversity(id: string, data: Partial<University>): Promise<University | null> {
  const db = await getDb();
  const result = await db.collection('universities').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: 'after' }
  );
  if (!result) return null;
  return toId(result as Record<string, unknown>) as University;
}

export async function deleteUniversity(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('universities').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// ─── Directors ───────────────────────────────────────────────────────────────

export async function getDirectors(): Promise<Director[]> {
  const db = await getDb();
  const docs = await db.collection('directors').find().sort({ order: 1 }).toArray();
  return docs.map(d => toId(d as Record<string, unknown>)) as Director[];
}

export async function getDirectorById(id: string): Promise<Director | null> {
  const db = await getDb();
  const doc = await db.collection('directors').findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return toId(doc as Record<string, unknown>) as Director;
}

export async function createDirector(data: Omit<Director, 'id'>): Promise<Director> {
  const db = await getDb();
  const result = await db.collection('directors').insertOne(data);
  return { id: result.insertedId.toString(), ...data } as Director;
}

export async function updateDirector(id: string, data: Partial<Director>): Promise<Director | null> {
  const db = await getDb();
  const result = await db.collection('directors').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  );
  if (!result) return null;
  return toId(result as Record<string, unknown>) as Director;
}

export async function deleteDirector(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('directors').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// ─── Page Galleries ──────────────────────────────────────────────────────────

export async function getPageGalleries(page?: string): Promise<PageGallery[]> {
  const db = await getDb();
  const filter = page ? { page } : {};
  const docs = await db.collection('galleries').find(filter).sort({ order: 1 }).toArray();
  return docs.map(d => toId(d as Record<string, unknown>)) as PageGallery[];
}

export async function getPageGalleryById(id: string): Promise<PageGallery | null> {
  const db = await getDb();
  const doc = await db.collection('galleries').findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return toId(doc as Record<string, unknown>) as PageGallery;
}

export async function createPageGallery(data: Omit<PageGallery, 'id'>): Promise<PageGallery> {
  const db = await getDb();
  const result = await db.collection('galleries').insertOne(data);
  return { id: result.insertedId.toString(), ...data } as PageGallery;
}

export async function updatePageGallery(id: string, data: Partial<PageGallery>): Promise<PageGallery | null> {
  const db = await getDb();
  const result = await db.collection('galleries').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  );
  if (!result) return null;
  return toId(result as Record<string, unknown>) as PageGallery;
}

export async function deletePageGallery(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('galleries').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// ─── Enquiries ───────────────────────────────────────────────────────────────

export async function getEnquiries(): Promise<Enquiry[]> {
  const db = await getDb();
  const docs = await db.collection('enquiries').find().sort({ createdAt: -1 }).toArray();
  return docs.map(d => toId(d as Record<string, unknown>)) as Enquiry[];
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const db = await getDb();
  const doc = await db.collection('enquiries').findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return toId(doc as Record<string, unknown>) as Enquiry;
}

export async function createEnquiry(data: Omit<Enquiry, 'id' | 'createdAt'>): Promise<Enquiry> {
  const db = await getDb();
  const doc = { ...data, createdAt: new Date() };
  const result = await db.collection('enquiries').insertOne(doc);
  return { id: result.insertedId.toString(), ...doc } as Enquiry;
}

export async function updateEnquiry(id: string, data: Partial<Enquiry>): Promise<Enquiry | null> {
  const db = await getDb();
  const result = await db.collection('enquiries').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  );
  if (!result) return null;
  return toId(result as Record<string, unknown>) as Enquiry;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('enquiries').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
