
import { Service } from "@/data/enums/service.enum";
import { CopyStorageRequest, DeletedStorage, PathItemResult, Storage, UpdateStoragePermissionRequest } from "@/data/schema/Project/storage.schema";
import { ApiResponse } from "@/data/type/response.type";
import http from "@/lib/http";
import { FolderItem } from "@/lib/zipUtil";

const storageApiRequest = {
    getList: (projectId: number, parentId: number) => http.get<ApiResponse<Storage[]>>(`storage/${projectId}/${parentId}`, undefined, Service.ProjectService),
    getFullPath: (folderId: number) => http.get<ApiResponse<PathItemResult[]>>(`storage/${folderId}/full-path`, undefined, Service.ProjectService),
    getTreeStorage: (id: number) => http.get<ApiResponse<FolderItem>>(`storage/tree-storage/${id}`, undefined, Service.ProjectService),
    updateStoragePermission: (updateStorageRequest: UpdateStoragePermissionRequest) => http.put<ApiResponse<boolean>>(`storage/update-permission`, updateStorageRequest, undefined, Service.ProjectService),
    copyStorage: (copyStorageRequest: CopyStorageRequest) => http.post<ApiResponse<boolean>>(`storage/copy-storage`, copyStorageRequest, undefined, Service.ProjectService),
    getDeletedStorages:(projectId: number) => http.get<ApiResponse<DeletedStorage[]>>(`storage/${projectId}/deleted-storages`, undefined, Service.ProjectService),
    deletedStorages:(storage: Storage) => http.delete<ApiResponse<boolean>>(`storage/delete-storages`, storage, undefined, Service.ProjectService),
    restoreStorage:(storage: Storage) => http.put<ApiResponse<boolean>>(`storage/restore-storage`, storage, undefined, Service.ProjectService),
}
export default storageApiRequest;