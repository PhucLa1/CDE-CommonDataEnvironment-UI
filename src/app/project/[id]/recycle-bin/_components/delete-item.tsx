import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DeletedStorage } from "@/data/schema/Project/storage.schema";
import { FolderIcon, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import DeletePermanent from "./delete-permanent";
import ConfirmRestore from "./restore-dialog";

interface Props {
  deletedStorage: DeletedStorage;
  projectId: number;
}
export default function DeletedItemCard({ deletedStorage, projectId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenRestore, setIsOpenRestore] = useState<boolean>(false);
  console.log(isOpen);
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-3">
        <div className="mb-3 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border dark:bg-blue-900/30">
            {deletedStorage.isFile ? (
              <img className="h-8 w-8" src={deletedStorage.url} />
            ) : (
              <FolderIcon className="h-8 w-8 text-blue-500" />
            )}
          </div>
          <div className="min-w-0 flex-1 text-center">
            <h3 className="truncate text-sm font-medium" title="Sample Folder">
              {deletedStorage.name}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Xóa vào:</span>
            <span>{deletedStorage.deletedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Xóa bởi:</span>
            <span className="text-amber-600 dark:text-amber-500">
              {deletedStorage.deletedBy}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-2 bg-accent/80 backdrop-blur-sm transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        <ConfirmRestore
          isOpenRestore={isOpenRestore}
          setIsOpenRestore={setIsOpenRestore}
          setIsOpen={setIsOpen}
          node={
            <Button
              size="sm"
              variant="secondary"
              className="w-full gap-1.5 text-xs h-7"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Khôi phục</span>
            </Button>
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
            <Button
              size="sm"
              variant="destructive"
              className="gap-1.5 text-xs h-7"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          }
          id={deletedStorage.id}
          isFile={deletedStorage.isFile}
          projectId={projectId}
        />
      </CardFooter>
    </Card>
  );
}
