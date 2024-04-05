import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { randomUUID } from 'crypto';

// TODO: move this interface to its own file
export interface GeneratedApiKeyPayload {
  apiKey: string;
  hashedKey: string;
}

@Injectable()
export class ApiKeysService {
  constructor(private readonly hashingService: HashingService) {}

  async createdAndHash(id: number): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(id);
    const hashedKey = await this.hashingService.hash(apiKey);
    return { apiKey, hashedKey };
  }

  extractIdFromApiKey(apiKey: string): string {
    const [id] = Buffer.from(apiKey, 'base64').toString('ascii').split(' ');
    return id;
  }

  private generateApiKey(id: number): string {
    const apiKey = `${id} ${randomUUID()}`;
    return Buffer.from(apiKey).toString('base64');
  }
}
