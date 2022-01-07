import { Moment } from 'moment';

export interface BookLogPostRequest {
  count: number;
  date: string | Moment;
  notes?: string;
}

export interface BookLogRequest extends BookLogPostRequest {
  id: number;
}

export interface BookLogResponse extends BookLogRequest {
  id: number;
}
