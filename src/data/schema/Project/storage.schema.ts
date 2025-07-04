import { Permission } from "@/data/enums/permisson.enum";
import { z } from "zod";
// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const storageSchema = z.object({
  id: z.number().optional(),
  isFile: z.boolean().optional(),
  name: z.string().optional(),
  createdAt: z.string().optional(),
  createdBy: z.string().optional(),
  nameCreatedBy: z.string().optional(),
  projectId: z.number().optional(),
  parentId: z.number().optional(),
  tagNames: z.array(z.string()).optional(),
  urlImage: z.string().optional(),
});

export type Storage = z.infer<typeof storageSchema>;
export const storageDefault: Storage = {};

export type PathItemResult = {
  name: string;
  folderId: number;
};

export interface UpdateStoragePermissionRequest {
  id: number;
  isFile: boolean;
  access: Permission;
  targetPermission: Record<number, Permission>;
}

export interface CopyStorageRequest {
  id: number;
  isFile: boolean;
}

export interface DeletedStorage {
  id: number;
  isFile: boolean;
  name: string;
  url: string;
  deletedAt: string;
  deletedBy: string;
}
