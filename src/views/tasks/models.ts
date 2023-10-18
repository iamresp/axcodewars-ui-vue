export interface Task {
  uuid: string;
  description: string;
  title: string;
  results: [string, string][];
}
