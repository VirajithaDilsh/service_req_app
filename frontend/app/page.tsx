"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../services/jobs";
import { Clock, MapPin } from "lucide-react";

type Job = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: string;
  createdAt: string;
};

const CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
  "Roofing",
  "Gardening",
  "Cleaning",
  "Other",
];
const STATUSES = ["All", "Open", "In Progress", "Closed"];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const params: {
        category?: string;
        status?: string;
      } = {};

      if (categoryFilter !== "All") params.category = categoryFilter;
      if (statusFilter !== "All") params.status = statusFilter;

      const res = await API.get("/jobs", { params });

      setJobs(res.data.data);
    } catch (error) {
      console.log("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const params: {
          category?: string;
          status?: string;
        } = {};

        if (categoryFilter !== "All") params.category = categoryFilter;
        if (statusFilter !== "All") params.status = statusFilter;

        const res = await API.get("/jobs", { params });

        setJobs(res.data.data);
      } catch (error) {
        console.log("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [categoryFilter, statusFilter]);
  const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-green-100 text-green-700";

    case "In Progress":
      return "bg-yellow-100 text-yellow-700";

    case "Closed":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};
  return (
    <main>
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>

          <p className="text-gray-600 mt-1">
            Browse and manage service job requests
          </p>
        </div>

        <div className="flex gap-4 text-gray-700">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-md bg-white"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded-md bg-white"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Statuses" : status}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-gray-600">No jobs found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 px-4">
          {jobs.map((job) => (
            <Link
              key={job._id}
              href={`/jobs/${job._id}`}
              className="group bg-white rounded-lg border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              <div className="flex justify-between mb-3">
                <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>

                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {job.category}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {job.title}
              </h2>

              <p className="text-gray-600 mt-2">{job.description}</p>

              <div className="mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
