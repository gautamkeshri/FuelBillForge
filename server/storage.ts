// Storage interface for fuel bill generator
// No backend storage needed for this app - all client-side

export interface IStorage {
  // Add storage methods here if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage
  }
}

export const storage = new MemStorage();
