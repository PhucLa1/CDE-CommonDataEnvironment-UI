import { Button } from "@/components/custom/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { DeletedStorage } from "@/data/schema/Project/storage.schema";
import { FolderIcon, MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DeletePermanent from "./delete-permanent";
import ConfirmRestore from "./restore-dialog";

interface Props {
  deletedStorage: DeletedStorage;
  projectId: number;
}
export default function StorageItem({ deletedStorage, projectId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenRestore, setIsOpenRestore] = useState<boolean>(false);
  return (
    <TableRow className="">
      <TableCell className="font-medium cursor-pointer">
        <div className="flex items-center gap-2">
          {deletedStorage.isFile ? (
            <img className="h-6 w-6" src={deletedStorage.url} />
          ) : (
            <FolderIcon className="h-6 w-6 text-blue-500" />
          )}
          {deletedStorage.name}
        </div>
      </TableCell>
      <TableCell>{deletedStorage.deletedAt}</TableCell>
      <TableCell>{deletedStorage.deletedBy}</TableCell>
      <TableCell className="text-center">
        <div className="relative inline-block">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          {isOpen ? (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white border shadow-lg py-1 z-50">
              <ConfirmRestore
                isOpenRestore={isOpenRestore}
                setIsOpenRestore={setIsOpenRestore}
                setIsOpen={setIsOpen}
                node={
                  <div className="flex w-full items-center px-4 py-2 text-green-600 hover:bg-gray-100 cursor-pointer">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Khôi phục
                  </div>
                }
                id={deletedStorage.id}
                isFile={deletedStorage.isFile}
                projectId={projectId}
              />
              <DeletePermanent
                isOpenDelete={isOpenDelete}
                setIsOpenDelete={setIsOpenDelete}
                setIsOpen={setIsOpen}
                node={
                  <div className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa vĩnh viễn
                  </div>
                }
                id={deletedStorage.id}
                isFile={deletedStorage.isFile}
                projectId={projectId}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
