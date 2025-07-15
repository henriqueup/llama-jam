import type { Instrument } from "../entities/Instrument";

export interface IInstrumentRepository {
  create(instrument: Omit<Instrument, "id">): Promise<Instrument>;
  findById(id: string): Promise<Instrument | null>;
  findAll(): Promise<Instrument[]>;
  update(id: string, instrument: Partial<Omit<Instrument, "id">>): Promise<Instrument>;
  delete(id: string): Promise<void>;
}
