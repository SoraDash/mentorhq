
export enum UpsertType {
  ADDED,
  UPDATED,
  UNCHANGED
}

export interface SyncResult {
  added: number;
  updated: number;
  removed: number;
}

export type GoogleSheetStudent = {
  name: string;
  email: string;
  status: string;
  courseCode: string;
  programmeID: string;
  mentor: string;
  lmsAccess: string;
  skype: string;
  slack: string;
  github: string;
  deadlines: Deadline[];
};
export type Deadline =
  | { '1': string }
  | { '2': string }
  | { '3': string }
  | { '4': string }
  | { '5': string };


export type PartialGoogleSheetStudent = Partial<GoogleSheetStudent>;
