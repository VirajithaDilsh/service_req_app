import axios from "axios";
import { JobRequest, JobFilters, JobStatus } from "../types";

const API = axios.create({
  baseURL:
    "https://refactored-goldfish-pj669p7xwprwh7j9p-5000.app.github.dev/api",
});

export const listJobs = async (
  filters?: JobFilters
): Promise<JobRequest[]> => {
  const params: Record<string, string> = {};

  if (filters?.category && filters.category !== "All") {
    params.category = filters.category;
  }

  if (filters?.status && filters.status !== "All") {
    params.status = filters.status;
  }

  const res = await API.get("/jobs", { params });

  return res.data.data;
};

export const getJob = async (id: string): Promise<JobRequest> => {
  const res = await API.get(`/jobs/${id}`);
  return res.data.data;
};

export const createJob = async (
  jobData: Omit<JobRequest, "_id" | "status" | "createdAt" | "updatedAt">
): Promise<JobRequest> => {
  const res = await API.post("/jobs", jobData);
  return res.data.data;
};

export const updateJobStatus = async (
  id: string,
  status: JobStatus
): Promise<JobRequest> => {
  const res = await API.patch(`/jobs/${id}`, { status });
  return res.data.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await API.delete(`/jobs/${id}`);
};

export default API;