
import { nanoid } from "nanoid";
import { getDatabase } from "~/server/db/config";
import { Instrument, InstrumentSchema } from "~/server/entities/Instrument";
import { IInstrumentRepository } from "../InstrumentRepository";

export class SqliteInstrumentRepository implements IInstrumentRepository {
  private db = getDatabase();

  async create(instrument: Omit<Instrument, "id">): Promise<Instrument> {
    const newInstrument = {
      id: nanoid(),
      ...instrument,
    };

    const stmt = this.db.prepare(
      "INSERT INTO instruments (id, name, type, track_count, tuning) VALUES (?, ?, ?, ?, ?)"
    );

    stmt.run(newInstrument.id, newInstrument.name, newInstrument.type, newInstrument.trackCount, newInstrument.tuning);

    return InstrumentSchema.parse(newInstrument);
  }

  async findById(id: string): Promise<Instrument | null> {
    const stmt = this.db.prepare(
      "SELECT id, name, type, track_count as trackCount, tuning FROM instruments WHERE id = ?"
    );
    const result = stmt.get(id) as Instrument | undefined;
    if (!result) return null;

    return InstrumentSchema.parse(result);
  }

  async findAll(): Promise<Instrument[]> {
    const stmt = this.db.prepare(
      "SELECT id, name, type, track_count as trackCount, tuning FROM instruments"
    );
    const results = stmt.all() as Instrument[];
    return results.map((instrument) => InstrumentSchema.parse(instrument));
  }

  async update(id: string, instrument: Partial<Omit<Instrument, "id">>): Promise<Instrument> {
    const existingInstrument = await this.findById(id);
    if (!existingInstrument) {
      throw new Error("Instrument not found
");
    }

    const updatedInstrument = { ...existingInstrument, ...instrument };

    const stmt = this.db.prepare(
      "UPDATE instruments SET name = ?, type = ?, track_count = ?, tuning = ? WHERE id = ?"
    );

    stmt.run(updatedInstrument.name, updatedInstrument.type, updatedInstrument.trackCount, updatedInstrument.tuning, id);

    return InstrumentSchema.parse(updatedInstrument);
  }

  async delete(id: string): Promise<void> {
    const stmt = this.db.prepare("DELETE FROM instruments WHERE id = ?");
    stmt.run(id);
  }
}
