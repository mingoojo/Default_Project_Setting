
// 📂 파일 및 폴더 타입 정의
export type FileNode = {
  children: null;
  created: string;
  executable: boolean;
  hidden: boolean;
  lastAccessed: string;
  lastModified: string;
  name: string;
  owner: string;
  path: string
  permissions: string[];
  readable: boolean;
  size: number;
  type: "file";
  writable: boolean;
};

export type FolderNode = {
  children: FileTree[];
  created: string;
  executable: boolean;
  hidden: boolean;
  lastAccessed: string;
  lastModified: string;
  name: string;
  owner: string;
  path: string;
  permissions: string[];
  readable: boolean;
  size: number;
  type: "directory";
  writable: boolean;
};

export type FileTree = FileNode | FolderNode;
