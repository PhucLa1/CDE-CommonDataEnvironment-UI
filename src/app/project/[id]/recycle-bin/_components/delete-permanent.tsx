import storageApiRequest from "@/apis/storage.api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { handleSuccessApi } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
interface Props {
  node: ReactNode;
  projectId: number;
  id: number;
  isFile: boolean;
  isOpenDelete: boolean;
  setIsOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DeletePermanent({
  node,
  projectId,
  id,
  isFile,
  isOpenDelete,
  setIsOpenDelete,
  setIsOpen
}: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-permanent"],
    mutationFn: () =>
      storageApiRequest.deletedStorages({
        projectId: projectId,
        id: id,
        isFile: isFile,
      }),
    onSuccess: () => {
      setIsOpenDelete(false);
      handleSuccessApi({
        title: "Xóa thành công",
        message: "Xóa thành công lưu trữ này",
      });
      queryClient.invalidateQueries({ queryKey: ["get-delete-storage"] });
      setIsOpen(false)
    },
  });
  return (
    <AlertDialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
      <AlertDialogTrigger asChild>{node}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa vĩnh viễn ? Cần cẩn thận khi nhấn đồng ý !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => mutate()}>
            {isPending ? "Đang xóa..." : "Tiếp tục"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
