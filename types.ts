
export interface SurpriseImage {
  id: string;
  url: string;
  alt: string;
}

export enum AppState {
  CLOSED = 'CLOSED',
  OPENING = 'OPENING',
  OPENED = 'OPENED'
}
