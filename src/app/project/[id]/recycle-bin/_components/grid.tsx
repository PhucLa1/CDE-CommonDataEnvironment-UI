import { DeletedStorage } from "@/data/schema/Project/storage.schema";
import React from "react";
import DeletedItemCard from "./delete-item";

interface Props {
  items: DeletedStorage[];
  projectId: number
}
export default function Grid({items, projectId} : Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {items.map((item) => (
        <DeletedItemCard
          key={item.id}
          deletedStorage={item}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
