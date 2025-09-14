import { AxiosProgressEvent, AxiosResponse } from "axios";
import apiAxios from "./axiosConfig";
import { GetAuthLogin, GetDiskSpace, GetFileGrant, GetLogsResource, GetLogsUser, GetTrashList, GetUserAll, GetUserIp, PostAuthRefresh, PostDirectory } from "./interface/ApiRes";

const url = import.meta.env.VITE_API_URL || "";

const postAuthRefresh = async (): Promise<AxiosResponse<PostAuthRefresh>> => {

  const res = await apiAxios({
    url: "/auth/refresh",
    method: "post",
    withCredentials: true,
  });

  return res
}

const getUserAll = async (): Promise<GetUserAll[]> => {
  try {
    const res = await apiAxios({
      url: "/api/user/all",
      method: "get",
    });

    return res.data
  } catch (error) {
    throw error;
  }
}

const postDirectory = async (props: { resourceId: number | null, page: number, size: number, orderBy?: string, sortDirection?: string, firstFileType?: string | null, onlyFileType?: string | null }): Promise<PostDirectory> => {
  const { resourceId, page, size, orderBy, sortDirection, firstFileType, onlyFileType } = props
  try {
    const res = await apiAxios({
      url: "/api/file/folders",
      method: "post",
      data: {
        resourceId: resourceId,
        page: page,
        size: size,
        orderBy: orderBy,
        sortDirection: sortDirection,
        sortedFileType: firstFileType,
        onlyFileType: onlyFileType,
      },
    });

    return res.data
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const getDiskSpace = async (): Promise<GetDiskSpace> => {
  try {
    const res = await apiAxios({
      url: "/api/sm/disk-space",
      method: "get",
    });

    return res.data
  } catch (error) {
    throw error;
  }
}

const postFileUpload = async (
  formData: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  try {
    const res = await apiAxios({
      url: "/api/file/upload",
      method: "post",
      data: formData,
      timeout: 1200000,
      onUploadProgress, // 타입 일치
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};


const getFileDownload = async ({ resourceId }: { resourceId: number }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/download",
      method: "get",
      timeout: 1200000,
      withCredentials: false,
      params: {
        resourceId: resourceId,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const getFileDownloadFolder = async ({ resourceId, downloadId, process }: { resourceId: number, downloadId: string, process: (progressEvent: AxiosProgressEvent) => void }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/download-folder",
      method: "get",
      timeout: 1200000,
      withCredentials: false,
      params: {
        resourceId: resourceId,
        downloadId: downloadId,
      },
      onDownloadProgress: process,
    });

    return res
  } catch (error) {
    throw error;
  }
}


const postFolderCreate = async ({ dir, newFolderName, parentResourceId }: { dir: string, newFolderName: string, parentResourceId?: number }) => {

  try {
    if (parentResourceId) {
      const res = await apiAxios({
        url: "/api/file/folder-create",
        method: "post",
        data: {
          dir: dir,
          newFolderName: newFolderName,
          parentResourceId: parentResourceId,
        },
      });
      return res
    } else {
      const res = await apiAxios({
        url: "/api/file/folder-create",
        method: "post",
        data: {
          dir: dir,
          newFolderName: newFolderName,
        },
      });
      return res
    }
  } catch (error) {
    throw error;
  }
}

const postFileRename = async ({ resourceId, newName }: { resourceId: number, newName: string }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/rename",
      method: "post",
      data: {
        resourceId: resourceId,
        newName: newName,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const postFileMove = async ({ resourceIds, targetParentResourceId }: { resourceIds: number[], targetParentResourceId: number | null }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/move",
      method: "post",
      data: {
        resourceIds: resourceIds,
        targetParentResourceId: targetParentResourceId,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const postLogin = async ({ email, password }: { email: string, password: string }): Promise<GetAuthLogin> => {

  try {
    const res = await apiAxios({
      url: "/auth/login",
      method: "post",
      data: {
        email: email,
        password: password,
      },
    });

    return res.data
  } catch (error) {
    throw error;
  }
}

const patchLogout = async ({ id }: { id: number }) => {
  try {
    const res = await apiAxios({
      url: "/auth/logout",
      method: "patch",
      data: {
        userId: id,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const postCreateUser = async ({ email, password, userName, position, department, role }: { email: string, password: string, userName: string, position: string, department: string, role: string }) => {
  try {
    const res = await apiAxios({
      url: "/api/user/create",
      method: "post",
      data: {
        email: email,
        password: password,
        userName: userName,
        position: position,
        department: department,
        role: role,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const deleteUser = async ({ userId }: { userId: number }) => {
  try {
    const res = await apiAxios({
      url: `/api/user/${userId}`,
      method: "delete",
    });
    return res
  } catch (error) {
    throw error;
  }
}

const patchChangePasword = async ({ userId, oldPassword, newPassword }: { userId: number, oldPassword: string, newPassword: string }) => {
  try {
    const res = await apiAxios({
      url: "/api/user/password",
      method: "patch",
      data: {
        userId: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}



const postMoveToTrash = async ({ resourceIds }: { resourceIds: number[] }) => {
  try {
    const res = await apiAxios({
      url: "/api/trash/move",
      method: "post",
      data: {
        resourceIds: resourceIds,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const postTrashDeleteForce = async ({ resourceIds }: { resourceIds: number[] }) => {
  try {
    const res = await apiAxios({
      url: "/api/trash/force-delete",
      method: "post",
      data: {
        resourceIds: resourceIds,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const getTrashCheckOtherOwners = async ({ resourceIds }: { resourceIds: number[] }) => {
  try {
    const res = await apiAxios({
      url: "/api/trash/check-other-owners",
      method: "post",
      data: resourceIds,
    });

    return res
  } catch (error) {
    throw error;
  }
}

const getTrashList = async (): Promise<GetTrashList> => {
  try {
    const res = await apiAxios({
      url: "/api/trash/list",
      method: "get",
    });

    return res.data
  } catch (error) {
    throw error;
  }
}

const deleteTrashDelete = async ({ trashIds }: { trashIds: number[] }) => {
  try {
    const res = await apiAxios({
      url: "/api/trash/delete",
      method: "delete",
      data: {
        trashIds: trashIds,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const deleteTrashDeleteAll = async () => {
  try {
    const res = await apiAxios({
      url: "/api/trash/delete-all",
      method: "delete",
    });

    return res
  } catch (error) {
    throw error;
  }
}

const patchTrashRestore = async ({ trashIds, fileNames }: { trashIds: number[], fileNames: string[] }) => {
  try {
    const res = await apiAxios({
      url: "/api/trash/restore",
      method: "patch",
      data: {
        trashIds: trashIds,
        fileNames: fileNames,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const postFileGrant = async ({ resourceId, targetUserIds }: { resourceId: number, targetUserIds: number[] }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/grant",
      method: "post",
      data: {
        resourceId: resourceId,
        targetUserIds: targetUserIds,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const deleteFileGrant = async ({ resourceId, targetUserIds }: { resourceId: number, targetUserIds: number[] }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/grant",
      method: "delete",
      data: {
        resourceId: resourceId,
        targetUserIds: targetUserIds,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}

const patchFilePrivacy = async ({ resourceId, isPrivate }: { resourceId: number, isPrivate: string }) => {
  try {
    const res = await apiAxios({
      url: `/api/file/privacy/${resourceId}`,
      method: "patch",
      data: {
        isPrivate: isPrivate,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}
const getfileGrantedUserDetail = async ({ resourceId }: { resourceId: number }): Promise<GetFileGrant[]> => {
  try {
    const res = await apiAxios({
      url: `/api/file/granted-users-detail/${resourceId}`,
      method: "get",
    });
    return res.data
  } catch (error) {
    throw error;
  }
}

const getFileFolderSize = async ({ resourceId }: { resourceId: number }): Promise<number> => {
  try {
    const res = await apiAxios({
      url: `/api/file/folder-size/${resourceId}`,
      method: "get",
    });
    return res.data
  } catch (error) {
    throw error;
  }
}




// const listenUploadProgress = (uploadId: string, onProgress: (progress: string) => void) => {
const listenUploadProgress = ({ uploadId, handleProgress }: { uploadId: string, handleProgress: ({ value }: { value: string }) => void }) => {
  const socket = new WebSocket(`${url}/upload-progress`);

  socket.onopen = () => {
    console.log("WebSocket connected");
    socket.send(uploadId); // 서버에 식별자 등록
  };

  socket.onmessage = (event) => {
    console.log(event.data)
    handleProgress({ value: event.data });
  };

  socket.onclose = () => {
    handleProgress({ value: "Progress: 100.00%" });
    console.log("WebSocket closed");
  };

  socket.onerror = (e) => {
    console.error("WebSocket error", e);
  };

  return socket;
};

const listenDownloadProgress = ({ downloadId, handleProgress, resourceName }: { downloadId: string, resourceName: string, handleProgress: ({ value, resourceName }: { value: string, resourceName: string }) => void }) => {
  const socket = new WebSocket(`${url}/download-progress`);

  socket.onopen = () => {
    console.log("WebSocket connected");
    socket.send(downloadId); // 서버에 식별자 등록
  };

  socket.onmessage = (event) => {
    handleProgress({ value: event.data, resourceName: resourceName });
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  socket.onerror = (e) => {
    console.error("WebSocket error", e);
  };

  return socket;
};



const getLogsUser = async (): Promise<GetLogsUser[]> => {
  try {
    const res = await apiAxios({
      url: "/api/logs/user",
      method: "get",
    });
    return res.data
  } catch (error) {
    throw error;
  }
}
const getLogsResource = async (): Promise<GetLogsResource> => {
  try {
    const res = await apiAxios({
      url: "/api/logs/resource",
      method: "get",
    });
    return res.data
  } catch (error) {
    throw error;
  }
}

const getUserIp = async ({ userId }: { userId: number }): Promise<GetUserIp[]> => {
  try {
    const res = await apiAxios({
      url: `/api/user-ip/user/${userId}`,
      method: "get",
    });
    return res.data
  } catch (error) {
    throw error;
  }
}

const deleteUserIp = async ({ id }: { id: number }) => {
  try {
    const res = await apiAxios({
      url: `/api/user-ip/${id}`,
      method: "delete",
    });
    return res
  } catch (error) {
    throw error;
  }
}

const getUserRole = async ({ userId }: { userId: number }): Promise<string> => {
  try {
    const res = await apiAxios({
      url: `/api/user/role/${userId}`,
      method: "get",
    });
    return res.data
  } catch (error) {
    throw error;
  }
}

const postUserIpAdd = async ({ userId, ip, description }: { userId: number, ip: string, description: string }): Promise<AxiosResponse<any>> => {
  try {
    const res = await apiAxios({
      url: "/api/user-ip",
      method: "post",
      data: {
        userId,
        ip,
        description,
      },
    });

    return res
  } catch (error) {
    throw error;
  }
}


const putUserRole = async ({ userId, newRole }: { userId: number, newRole: string }): Promise<AxiosResponse<any>> => {
  try {
    const res = await apiAxios({
      url: `/api/user/role/${userId}?newRole=${newRole}`,
      method: "put",
    });
    return res
  } catch (error) {
    throw error;
  }
}

const getFileSearch = async ({ keyword, resourceParentId }: { keyword: string, resourceParentId: number }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/search",
      method: "get",
      params: {
        keyword: keyword,
        resourceParentId: resourceParentId,
      },
    });
    return res
  } catch (error) {
    throw error;
  }
}

const getFileFilters = async (): Promise<AxiosResponse<{ filterName: string, filterValue: string }[]>> => {
  try {
    const res = await apiAxios({
      url: "/api/file/filters",
      method: "get",
    });
    return res
  } catch (error) {
    throw error;
  }
}

const postFileFilter = async ({ filterName, filterValue }: { filterName: string, filterValue: string }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/filter",
      method: "post",
      data: {
        filterName: filterName,
        filterValue: filterValue,
      },
    });
    return res
  } catch (error) {
    throw error;
  }
}

const postFileTransferOwnership = async ({ fromUserId, toUserId }: { fromUserId: number, toUserId: number }) => {
  try {
    const res = await apiAxios({
      url: "/api/file/transfer-ownership",
      method: "post",
      data: {
        fromUserId: fromUserId,
        toUserId: toUserId,
      },
    });
    return res
  } catch (error) {
    throw error;
  }
}

const patchUserUpdate = async ({ userId, userName, position, department }: { userId: number, userName: string, position: string, department: string }) => {
  try {
    const res = await apiAxios({
      url: "/api/user/update",
      method: "patch",
      data: {
        userId: userId,
        userName: userName,
        position: position,
        department: department,
      },
    });
    return res
  } catch (error) {
    throw error;
  }
}



const apiController = {
  postAuthRefresh,
  getUserAll,
  postLogin,
  patchLogout,
  postCreateUser,
  deleteUser,
  postDirectory,
  getDiskSpace,
  postFolderCreate,
  getFileDownload,
  getFileDownloadFolder,
  postFileUpload,
  postFileRename,
  postFileMove,
  patchChangePasword,
  listenUploadProgress,
  listenDownloadProgress,
  postMoveToTrash,
  postTrashDeleteForce,
  getTrashCheckOtherOwners,
  getTrashList,
  deleteTrashDelete,
  deleteTrashDeleteAll,
  patchTrashRestore,
  postFileGrant,
  deleteFileGrant,
  patchFilePrivacy,
  getfileGrantedUserDetail,
  getFileFolderSize,

  getLogsUser,
  getLogsResource,
  getUserIp,
  deleteUserIp,
  getUserRole,
  postUserIpAdd,
  putUserRole,
  getFileSearch,
  getFileFilters,
  postFileFilter,
  postFileTransferOwnership,
  patchUserUpdate,
}

export default apiController