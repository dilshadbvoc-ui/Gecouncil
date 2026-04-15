import { ObjectId } from 'mongodb';
import { getDb } from './db';
import { University, Director, PageGallery, Enquiry, Program, Country, Testimonial, SiteSettings } from '@/types/admin';

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

// ─── Programs ────────────────────────────────────────────────────────────────

export async function getPrograms(filter?: { category?: string; universityId?: string }): Promise<Program[]> {
  const db = await getDb();
  const query: Record<string, unknown> = {};
  if (filter?.category) {
    if (filter.category === 'recruitment') {
      query['category'] = 'recruitment';
    } else {
      (query as Record<string, unknown>)['$or'] = [{ category: filter.category }, { category: 'both' }];
    }
  }
  if (filter?.universityId) query.universityId = filter.universityId;
  const docs = await db.collection('programs').find(query).sort({ createdAt: -1 }).toArray();
  return docs.map(d => toId(d as Record<string, unknown>)) as Program[];
}

export async function getProgramById(id: string): Promise<Program | null> {
  const db = await getDb();
  const doc = await db.collection('programs').findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return toId(doc as Record<string, unknown>) as Program;
}

export async function createProgram(data: Omit<Program, 'id' | 'createdAt'>): Promise<Program> {
  const db = await getDb();
  const doc = { ...data, createdAt: new Date() };
  const result = await db.collection('programs').insertOne(doc);
  return { id: result.insertedId.toString(), ...doc } as Program;
}

export async function updateProgram(id: string, data: Partial<Program>): Promise<Program | null> {
  const db = await getDb();
  const result = await db.collection('programs').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  );
  if (!result) return null;
  return toId(result as Record<string, unknown>) as Program;
}

export async function deleteProgram(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('programs').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// ─── Countries ───────────────────────────────────────────────────────────────

export async function getCountries(filter?: { category?: string }): Promise<Country[]> {
  const db = await getDb();
  const query: Record<string, unknown> = {};
  if (filter?.category) {
    query['$or'] = [{ category: filter.category }, { category: 'both' }];
  }
  const docs = await db.collection('countries').find(query).sort({ name: 1 }).toArray();
  return docs.map(d => toId(d as Record<string, unknown>)) as Country[];
}

export async function getCountryById(id: string): Promise<Country | null> {
  const db = await getDb();
  const doc = await db.collection('countries').findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return toId(doc as Record<string, unknown>) as Country;
}

export async function createCountry(data: Omit<Country, 'id'>): Promise<Country> {
  const db = await getDb();
  const result = await db.collection('countries').insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { id: result.insertedId.toString(), ...data } as Country;
}

export async function updateCountry(id: string, data: Partial<Country>): Promise<Country | null> {
  const db = await getDb();
  const result = await db.collection('countries').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: 'after' }
  );
  if (!result) return null;
  return toId(result as Record<string, unknown>) as Country;
}

export async function deleteCountry(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('countries').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  const docs = await db.collection('testimonials').find().sort({ order: 1 }).toArray();
  return docs.map(d => toId(d as Record<string, unknown>)) as Testimonial[];
}

export async function createTestimonial(data: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const db = await getDb();
  const doc = { ...data, createdAt: new Date() };
  const result = await db.collection('testimonials').insertOne(doc);
  return { id: result.insertedId.toString(), ...doc } as Testimonial;
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial | null> {
  const db = await getDb();
  const result = await db.collection('testimonials').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  );
  if (!result) return null;
  return toId(result as Record<string, unknown>) as Testimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('testimonials').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const db = await getDb();
  const doc = await db.collection('site_settings').findOne({});
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: (_id as ObjectId).toString(), ...rest } as SiteSettings;
}

export async function upsertSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await getDb();
  await db.collection('site_settings').updateOne(
    {},
    { $set: { ...data, updatedAt: new Date() } },
    { upsert: true }
  );
  const doc = await db.collection('site_settings').findOne({});
  const { _id, ...rest } = doc!;
  return { id: (_id as ObjectId).toString(), ...rest } as SiteSettings;
}
