import { Pokemon } from "./species.types";

export interface BulkSpriteResponse {
  success: boolean;
  status: number;
  message: string;
  data?: {
    sprites: Pokemon[];
    success_count: number;
    failed_count: number;
    failed_ids: {
      id: string;
      reason: string;
      status: number;
    }[];
  };
  error?: {
    code: string;
    details?: any;
  };
}

export interface spriteResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Pokemon;
}
