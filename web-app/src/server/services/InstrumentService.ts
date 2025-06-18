import type { Instrument } from "../entities/Instrument";

export interface IInstrumentService {
  createInstrument(instrument: Omit<Instrument, "id">): Promise<Instrument>;
  getInstrumentById(id: string): Promise<Instrument | null>;
  getAllInstruments(): Promise<Instrument[]>;
  updateInstrument(
    id: string,
    instrument: Partial<Omit<Instrument, "id">>
  ): Promise<Instrument>;
}

export class InstrumentService implements IInstrumentService {
  async createInstrument(
    instrument: Omit<Instrument, "id">
  ): Promise<Instrument> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async getInstrumentById(id: string): Promise<Instrument | null> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async getAllInstruments(): Promise<Instrument[]> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async updateInstrument(
    id: string,
    instrument: Partial<Omit<Instrument, "id">>
  ): Promise<Instrument> {
    // Implementation to be added
    throw new Error("Not implemented");
  }
}
