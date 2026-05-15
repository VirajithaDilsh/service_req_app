"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Mail,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { getJob, updateJobStatus, deleteJob } from "../../../services/jobs";

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

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJob(id);
        setJob(data);
      } catch (err) {
        setError("Job not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!job) return;

    const newStatus = e.target.value as "Open" | "In Progress" | "Closed";

    try {
      setUpdating(true);

      const updatedJob = await updateJobStatus(job._id, newStatus);

      setJob(updatedJob);
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!job) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteJob(job._id);

      router.push("/");
    } catch (error) {
      alert("Failed to delete job");
      setDeleting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!job || error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />

        <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>

        <p className="text-gray-500 mb-6">{error}</p>

        <Link href="/" className="text-blue-600 hover:underline">
          Back to Jobs
        </Link>
      </div>
    );
  }
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
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Link>

      <div className="bg-white rounded-xl shadow border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h1 className="text-3xl font-bold">{job.title}</h1>

            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDate(job.createdAt)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>

            <p className="text-gray-700 whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border">
            <h2 className="font-semibold mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-blue-600" />

                <span>{job.contactName}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />

                <a
                  href={`mailto:${job.contactEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {job.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="font-medium">Update Status:</label>

            <select
              value={job.status}
              onChange={handleStatusChange}
              disabled={updating}
              className="border rounded-md px-3 py-2"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            {updating && <Loader2 className="w-4 h-4 animate-spin" />}
          </div>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
}
