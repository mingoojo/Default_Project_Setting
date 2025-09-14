export type CREATED =
  {
    date: string
    path: string
    status: string
    statusDesc: string
    userId: number
  }
export type DELETED =
  {
    date: string
    deletedPath: string
    status: string
    statusDesc: string
    userId: number
  }

export type MOVED = {
  current: string
  date: string
  prev: string
  status: string
  statusDesc: string
  userId: number
}
export type RENAMED = {
  current: string
  date: string
  prev: string
  status: string
  statusDesc: string
  userId: number
}
export type RESTORED = {
  current: string
  date: string
  prev: string
  status: string
  statusDesc: string
  userId: number
}
export type TRASHED = {
  date: string
  prev: string
  status: string
  statusDesc: string
  trashedTo: string
  userId: number
}

export type ListType = {
  resourceId: number,
  resourcePath: string,
  resourceName: string,
  resourceType: string,
  resourceSize: number,
  createDate: number,
  updateDate: number,
  userId: number
  childFolderCount: number,
  childFileCount: number
  isPrivate: string
}

export type TrashListType = {
  createDate: number,
  resourceId: number,
  resourcePath: string,
  resourceSize: number,
  resourceType: string,
  trashId: number,
  trashPath: string,
  trashedDate: number,
  updateDate: number,
  userId: number
}

export type PostAuthRefresh = {
  accessToken: string,
}

export type PostDirectory = {
  code: null | number,
  message: string,
  directoryPath: string
  result: {
    list: ListType[]
    parentKey: null | number,
    resourceKey: null | number,
    totalCount: number,
    totalChildrenCount: number,
  }
}

export type GetTrashList = {
  code: null | number,
  message: string,
  result: {
    list: TrashListType[]
    totalCount: number,
  }
}

export type GetDiskSpace = {
  freeDiskSpaceBytes: number,
  totalDiskSpaceBytes: number,
  usedDiskSpaceBytes: number
}

export type GetUserAll = {
  createdDate: string,
  department: null | string,
  email: string,
  position: string,
  userId: number,
  userName: string
}

export type GetFileGrant = {
  email: string,
  isAccess: string,
  userId: number,
  userName: string,
}

export type GetAuthLogin = {
  grantType: string,
  accessToken: string,
  refreshToken: string,
  loginUserDTO: {
    userId: number,
    email: string,
    role: string,
  }
}

export type GetLogsUser = {
  id: number
  ip: string
  loginTime: string
  userId: number
}
export type GetLogsResource = {
  CREATED: CREATED[],
  DELETED: DELETED[],
  MOVED: MOVED[],
  RENAMED: RENAMED[],
  RESTORED: RESTORED[],
  TRASHED: TRASHED[],
}

export type GetUserIp = {
  description: string
  ip: string
  useYn: string
  userAllowedIpId: number
}

