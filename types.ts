
export interface CityData {
  type: CityType;
  emissions: number;
  reduction: number;
  rate: number;
  vision: string;
  sectors: { [key: string]: number };
  finance: {
    total: number;
    city: number;
    external: number;
  };
}

export interface ReportData {
  [key: string]: CityData;
}

export type CityType = '산업도시형' | '농업중심형' | '도농복합형' | '해양·생태형';

export interface TypeInfo {
  cities: string[];
  description: string;
  challenges: string[];
  sectors: { [key: string]: number };
}

export interface TypeData {
  [key: string]: TypeInfo;
}

export interface ChatMessage {
  sender: 'user' | 'ai' | 'loading';
  text: string;
}

export type SectionID = 'intro' | 'overview' | 'types' | 'details' | 'recommendations';
