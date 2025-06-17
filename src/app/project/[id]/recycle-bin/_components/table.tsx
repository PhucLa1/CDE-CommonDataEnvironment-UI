import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { DeletedStorage } from "@/data/schema/Project/storage.schema";
import {
  ChevronUpIcon
} from "lucide-react";
import StorageItem from "./storage-item";

interface Props {
  projectId: number;
  deletedStorage: DeletedStorage[];
}

export default function RecycleBinTable({ deletedStorage,projectId }: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">
              Tên <ChevronUpIcon className="inline-block ml-2 h-4 w-4" />
            </TableHead>
            <TableHead>Xóa vào</TableHead>
            <TableHead>Xóa bởi</TableHead>
            <TableHead className="text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deletedStorage.map((item, index) => (
            <StorageItem deletedStorage={item} projectId={projectId} key={index}/>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
