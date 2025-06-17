import storageApiRequest from "@/apis/storage.api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  isOpenRestore: boolean;
  setIsOpenRestore: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmRestore({
  node,
  projectId,
  id,
  isFile,
  isOpenRestore,
  setIsOpenRestore,
  setIsOpen,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["restore-storage"],
    mutationFn: () =>
      storageApiRequest.restoreStorage({
        projectId,
        id,
        isFile,
      }),
    onSuccess: () => {
      setIsOpenRestore(false);
      handleSuccessApi({
        title: "Khôi phục thành công",
        message: "Lưu trữ đã được khôi phục thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["get-delete-storage"] });
      setIsOpen(false);
    },
  });

  return (
    <AlertDialog open={isOpenRestore} onOpenChange={setIsOpenRestore}>
      <AlertDialogTrigger asChild>{node}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn khôi phục không?</AlertDialogTitle>
          <AlertDialogDescription>
            Tệp hoặc thư mục này sẽ được khôi phục lại. Bạn có chắc chắn tiếp tục không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => mutate()}>
            {isPending ? "Đang khôi phục..." : "Khôi phục"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
