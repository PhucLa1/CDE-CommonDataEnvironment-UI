"use client";
import storageApiRequest from "@/apis/storage.api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import RecycleBinTable from "./_components/table";
import AppBreadcrumb, { PathItem } from "@/components/custom/_breadcrumb";
import { LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import Grid from "./_components/grid";

const pathList: Array<PathItem> = [
  {
    name: "Thùng rác",
    url: "#",
  },
];
export default function Page({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewModeData") || "table"
  );

  const handleViewModeChange = (mode: "table" | "grid") => {
    localStorage.setItem("viewModeData", mode);
    setViewMode(mode); // Cập nhật state để component re-render
  };
  const { data, isLoading } = useQuery({
    queryKey: ["get-delete-storage"],
    queryFn: () => storageApiRequest.getDeletedStorages(Number(params.id)),
  });
  if (isLoading) return <></>;
  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Thùng rác</h2>
          <AppBreadcrumb pathList={pathList} className="mt-2" />
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleViewModeChange("table")}
            className={viewMode === "table" ? "bg-accent" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleViewModeChange("grid")}
            className={viewMode === "grid" ? "bg-accent" : ""}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row">
        {localStorage.getItem("viewModeData") === "table" && ( //+
          <RecycleBinTable
            deletedStorage={data?.data ?? []}
            projectId={Number(params.id)}
          />
        )}
        {localStorage.getItem("viewModeData") === "grid" && (
          <Grid items={data?.data ?? []} projectId={Number(params.id)} />
        )}
      </div>
    </>
  );
}
