export type JobCategory =
  | "Plumbing"
  | "Electrical"
  | "Painting"
  | "Joinery"
  | "Roofing"
  | "Gardening"
  | "Cleaning"
  | "Other"
  | "All";

export type JobStatus = "Open" | "In Progress" | "Closed" | "All";

export interface JobRequest {
  _id: string;
  title: string;
  description: string;
  category: JobCategory;
  location: string;
  contactName: string;
  contactEmail: string;
  status: Exclude<JobStatus, "All">;
  createdAt: string;
  updatedAt?: string;
}

export interface JobFilters {
  category?: JobCategory;
  status?: JobStatus;
}