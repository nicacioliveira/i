export interface FolderStructure {
  name: string;
  path: string;
  subfolders: FolderStructure[];
}
