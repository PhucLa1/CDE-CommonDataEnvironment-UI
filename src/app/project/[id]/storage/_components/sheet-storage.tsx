import fileApiRequest from "@/apis/file.api";
import folderApiRequest from "@/apis/folder.api";
import storageApiRequest from "@/apis/storage.api";
import { Button } from "@/components/custom/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Role } from "@/data/enums/role.enum";
import { handleSuccessApi } from "@/lib/utils";
import { downloadFolderAsZip } from "@/lib/zipUtil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CopyIcon,
  DownloadIcon,
  FolderIcon,
  MoveLeftIcon,
  Pencil,
  Trash,
  TrashIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";
import CreateFileComment from "./create-file-comment";
import CreateFolderComment from "./create-folder-comment";
import DeleteFolder from "./delete-folder";
import DeleteForm from "./delete-form";
import FileHistoryPage from "./file-history";
import FolderHistoryPage from "./folder-history";
import { SheetFolderDestination } from "./sheet-folder-destination";
import { UpdateFile } from "./update-file";
import UpdateFileComment from "./update-file-comment";
import { UpdateFolder } from "./update-folder";
import UpdateFolderComment from "./update-folder-comment";
import { UserCog } from "lucide-react";
import DialogPermissions from "./dialog-permission";
import teamApiRequest from "@/apis/team.api";
import { Permission } from "@/data/enums/permisson.enum";
import { useRole } from "@/hooks/use-role";
type FormProps = {
  node: ReactNode;
  id: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  projectId: number;
  isFile: boolean;
};
export default function SheetStorage({
  node,
  id,
  isOpen,
  setIsOpen,
  projectId,
  isFile,
}: FormProps) {
  const queryClient = useQueryClient()
  console.log(isFile);
  const [updateComment, setUpdateComment] = useState<number>(0);
  const [openFolderDes, setOpenFolderDes] = useState<boolean>(false);
  const [isOpenPermissions, setIsOpenPermissions] = useState<boolean>(false);
  const { data: dataFolder, isLoading: isLoadingFolder } = useQuery({
    queryKey: ["get-detail-folder", id],
    queryFn: () => folderApiRequest.getDetail(id),
    enabled: id !== 0 && isFile == false,
  });
  const { data: dataFile, isLoading: isLoadingFile } = useQuery({
    queryKey: ["get-detail-file", id],
    queryFn: () => fileApiRequest.getDetail(id),
    enabled: id !== 0 && isFile,
  });

  const { data: dataTarget, isLoading: isLoadingTarget } = useQuery({
    queryKey: ["get-targets-by-project", projectId],
    queryFn: () => teamApiRequest.GetAllTarget(projectId),
  });

  const { mutate } = useMutation({
    mutationKey: ["get-tree-storage"],
    mutationFn: () => storageApiRequest.getTreeStorage(id),
    onSuccess: (data) => {
      downloadFolderAsZip(data.data, data.data.name);
      handleSuccessApi({
        title: "Bắt đầu tải xuống",
        message: "...............",
      });
    },
  });
  const { mutate: mutateCopyStorage } = useMutation({
    mutationKey: ["copy-storage-storage"],
    mutationFn: () => storageApiRequest.copyStorage({id: id, isFile: isFile}),
    onSuccess: () => {
      handleSuccessApi({
        title: "Sao chép thành công",
        message: "...............",
      });
      queryClient.invalidateQueries({queryKey: ['storage']})
    },
  });

  const { roleDetail } = useRole();
  const downloadItem = async (fileUrl: string, fileName: string) => {
    try {
      console.log(fileName, fileUrl);
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // Đặt tên file tải về
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url); // Giải phóng bộ nhớ
    } catch (error) {
      console.error("Lỗi tải xuống:", error);
    }
  };

  //const downloadFolderAsZip = async (folderId: string)

  if (isLoadingFile || isLoadingFolder || isLoadingTarget) return <></>;
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{node}</SheetTrigger>
      <SheetContent className="overflow-y-auto min-w-[450px]">
        <SheetHeader>
          <SheetTitle>Thông tin chi tiết</SheetTitle>
          <SheetDescription>
            Tạo ra những thay đổi của bạn ở đâyy.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold">
              {isFile ? dataFile?.data.name : dataFolder?.data.name}
            </span>
            {roleDetail?.role !== Role.Admin &&
            (isFile ? dataFile : dataFolder)?.data.createdBy !==
              roleDetail?.id ? (
              <></>
            ) : isFile ? (
              <UpdateFile
                file={dataFile!.data}
                projectId={projectId}
                node={<Pencil className="h-5 w-5" />}
              />
            ) : (
              <UpdateFolder
                folder={dataFolder!.data}
                projectId={projectId}
                node={<Pencil className="h-5 w-5" />}
              />
            )}
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-center">
            {isFile ? (
              <img
                src={dataFile?.data.thumbnail}
                className="w-10 h-10 font-semibold"
                alt=""
              />
            ) : (
              <FolderIcon className="w-10 h-10 font-semibold" />
            )}
          </div>
          <Separator className="my-" />
          <div className="flex h-5 items-center justify-center space-x-10 text-sm">
            {isFile && (
              <Button
                onClick={() => {
                  console.log("id", id);
                  window.open(
                    `../view-file/file/${id}?url=${dataFile?.data.url}`,
                    "_blank"
                  );
                }}
              >
                Xem file
              </Button>
            )}
            {roleDetail?.role == Role.Admin ||
            ((isFile ? dataFile : dataFolder)?.data.access ==
              Permission.Write &&
              (isFile ? dataFile : dataFolder)?.data.storagePermissionResults
                ?.length === 0) ||
            (isFile
              ? dataFile
              : dataFolder
            )?.data.storagePermissionResults?.find(
              (item) => item.targetId === roleDetail?.id
            )?.access === Permission.Write ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => {
                      if (isFile) {
                        downloadItem(
                          dataFile?.data.url ?? "",
                          dataFile?.data.name ?? ""
                        );
                      } else {
                        mutate();
                      }
                    }}
                    asChild
                  >
                    <div className="flex items-center gap-1">
                      <DownloadIcon className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tải {isFile ? "tệp" : "thư mục"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <></>
            )}
            {roleDetail?.role == Role.Admin ||
            ((isFile ? dataFile : dataFolder)?.data.access ==
              Permission.Write &&
              (isFile ? dataFile : dataFolder)?.data.storagePermissionResults
                ?.length === 0) ||
            (isFile
              ? dataFile
              : dataFolder
            )?.data.storagePermissionResults?.find(
              (item) => item.targetId === roleDetail?.id
            )?.access === Permission.Write ? (
              <div
                onClick={() => setOpenFolderDes(true)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <MoveLeftIcon className="h-5 w-5" />
              </div>
            ) : (
              <></>
            )}
            {openFolderDes == true && (
              <SheetFolderDestination
                isFile={isFile}
                isOpen={openFolderDes}
                setIsOpen={setOpenFolderDes}
                folderIds={isFile ? [] : [dataFolder?.data.id ?? 0]}
                fileIds={!isFile ? [] : [dataFile?.data.id ?? 0]}
              />
            )}

            {roleDetail?.role == Role.Admin ? (
              <DeleteFolder
                setSheetOpen={setIsOpen}
                node={
                  <div className="flex items-center gap-1 text-red-500 cursor-pointer">
                    <TrashIcon className="h-5 w-5" />
                  </div>
                }
                isFile={isFile}
                file={{
                  id: id,
                  name: "",
                  projectId: projectId,
                }}
                folder={{
                  id: id,
                  name: "",
                  projectId: projectId,
                }}
              />
            ) : (
              <></>
            )}
            {roleDetail?.role == Role.Admin ? (
              <DialogPermissions
                storagePermissionResults={
                  (isFile ? dataFile : dataFolder)?.data
                    .storagePermissionResults ?? []
                }
                isOpenPermissions={isOpenPermissions}
                setIsOpenPermissions={setIsOpenPermissions}
                isFile={isFile}
                id={id}
                access={
                  (isFile ? dataFile : dataFolder)?.data.access ??
                  Permission.Write
                }
                targets={dataTarget?.data ?? []}
                node={
                  <div className="flex items-center gap-1 cursor-pointer">
                    <UserCog className="h-5 w-5" />
                  </div>
                }
              />
            ) : (
              <></>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={() => mutateCopyStorage()} asChild>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <CopyIcon  className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="mr-20">
                  <p>Sao chép {isFile ? "tệp" : "thư mục"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Separator className="my-2" />
          <div>
            <h5 className="font-bold">Chi tiết {isFile ? "tệp" : "thư mục"}</h5>
            <div className="text-[12px]">
              <div className="mt-2">
                <span>Phiên bản</span>
                {isFile ? (
                  <FileHistoryPage
                    node={
                      <p className="hover:cursor-pointer hover:text-gray-600 font-bold underline">
                        {dataFile?.data.fileHistoryResults?.length} phiên bản
                        trước đó
                      </p>
                    }
                    fileHistories={dataFile?.data.fileHistoryResults ?? []}
                  />
                ) : (
                  <FolderHistoryPage
                    node={
                      <p className="hover:cursor-pointer hover:text-gray-600 font-bold underline">
                        {dataFolder?.data.folderHistoryResults?.length} phiên
                        bản trước đó
                      </p>
                    }
                    folderHistories={
                      dataFolder?.data.folderHistoryResults ?? []
                    }
                  />
                )}
              </div>
              <div className="mt-2">
                <span>Ngày tạo</span>
                <p>
                  {isFile
                    ? dataFile?.data.createdAt
                    : dataFolder?.data.createdAt}
                </p>
              </div>
              <div className="mt-2">
                <span>Được tạo bởi</span>
                <p>
                  {isFile
                    ? dataFile?.data.nameCreatedBy
                    : dataFolder?.data.nameCreatedBy}
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-2" />
          <div>
            <h5 className="font-bold">Phân quyền</h5>
            <div className="text-[12px]">
              <div className="mt-2">
                <span>Mặc định cho mọi người trong dự án</span>
                <strong>
                  <div className="">
                    <strong>
                      {(isFile ? dataFile : dataFolder)?.data.access ===
                      Permission.Write
                        ? "Quyền ghi"
                        : (isFile ? dataFile : dataFolder)?.data.access ===
                          Permission.Read
                        ? "Chỉ đọc"
                        : "Không có quyền"}
                    </strong>
                  </div>
                </strong>
              </div>
              <div className="mt-4">
                <span className="mt-2">Phân quyền riêng</span>
                {(isFile
                  ? dataFile
                  : dataFolder
                )?.data.storagePermissionResults?.map((item, index) => {
                  return (
                    <div key={index} className="mt-1">
                      <span>
                        {item.email} -{" "}
                        <strong>
                          {item.access === Permission.Write
                            ? "Quyền ghi"
                            : item.access === Permission.Read
                            ? "Chỉ đọc"
                            : "Không có quyền"}
                        </strong>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Separator className="my-2" />
          <div>
            <h5 className="font-bold">Nhãn dán</h5>
            <ul className="flex flex-wrap">
              {(isFile
                ? dataFile?.data.tagResults
                : dataFolder?.data.tagResults
              )?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center bg-[#eaeaef] rounded-3xl text-[#6a6976] h-8 justify-between mt-2 min-h-8 overflow-hidden pl-3 w-auto mr-2 mb-2 max-w-[16rem] px-2"
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <Separator className="my-2" />
          <div>
            <h5 className="font-bold">Bình luận</h5>
            <div className="mt-2">
              {(isFile
                ? dataFile?.data.userCommentResults
                : dataFolder?.data.userCommentResults
              )?.map((item, index) => {
                if (updateComment != item.id!) {
                  return (
                    <Card key={index} className="mb-4 p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="mr-3">
                            <Avatar>
                              <AvatarImage src={item.avatarUrl} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="text-xs">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.updatedAt}
                            </p>
                            <p className="mt-2">{item.content}</p>
                          </div>
                        </div>
                        <div className="flex justify-end items-center">
                          <DeleteForm
                            node={
                              <Trash className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-900" />
                            }
                            id={item.id!}
                            projectId={projectId}
                            storageId={id}
                            isFile={isFile}
                          />

                          <Pencil
                            onClick={() => setUpdateComment(item.id!)}
                            className="w-4 h-4 ml-2 cursor-pointer text-gray-500 hover:text-gray-900"
                          />
                        </div>
                      </div>
                    </Card>
                  );
                } else {
                  return isFile ? (
                    <UpdateFileComment
                      key={index}
                      setUpdateComment={setUpdateComment}
                      fileComment={{
                        content: item.content,
                        id: item.id,
                        projectId: projectId,
                        fileId: id,
                      }}
                    />
                  ) : (
                    <UpdateFolderComment
                      key={index}
                      setUpdateComment={setUpdateComment}
                      folderComment={{
                        content: item.content,
                        id: item.id,
                        projectId: projectId,
                        folderId: id,
                      }}
                    />
                  );
                }
              })}
              {isFile ? (
                <CreateFileComment id={id} projectId={projectId} />
              ) : (
                <CreateFolderComment id={id} projectId={projectId} />
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
