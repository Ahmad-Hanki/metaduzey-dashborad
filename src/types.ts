export type Image = {
    id: string
    key:string
    name: string
    customId: string | null
    status: "Deletion Pending" | "Failed" | "Uploaded" | "Uploading"
  }