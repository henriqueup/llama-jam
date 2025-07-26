import { SqliteInstrumentRepository } from "../repositories/Sqlite/SqliteInstrumentRepository";
import type { Instrument } from "../entities/Instrument";

export interface IInstrumentService {
  createInstrument(instrument: Omit<Instrument, "id">): Promise<Instrument>;
  getInstrumentById(id: string): Promise<Instrument | null>;
  getAllInstruments(): Promise<Instrument[]>;
  updateInstrument(
    id: string,
    instrument: Partial<Omit<Instrument, "id">>
  ): Promise<Instrument>;
  deleteInstrument(id: string): Promise<void>;
}

export class InstrumentService implements IInstrumentService {
  constructor(private instrumentRepository: SqliteInstrumentRepository) {}

  async createInstrument(
    instrument: Omit<Instrument, "id">
  ): Promise<Instrument> {
    return this.instrumentRepository.create(instrument);
  }

  async getInstrumentById(id: string): Promise<Instrument | null> {
    return this.instrumentRepository.findById(id);
  }

  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentRepository.findAll();
  }

  async updateInstrument(
    id: string,
    instrument: Partial<Omit<Instrument, "id">>
  ): Promise<Instrument> {
    return this.instrumentRepository.update(id, instrument);
  }

  async deleteInstrument(id: string): Promise<void> {
    return this.instrumentRepository.delete(id);
  }
}
