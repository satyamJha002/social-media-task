import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Pagination from "./Pagination";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = submissions.slice(startIndex, endIndex);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }
      const data = await response.json();
      console.log(data);
      setSubmissions(data.users || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
  };

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="flex flex-col gap-4">
        <Link to="/">
          <Button>Go to Submission form</Button>
        </Link>
        <Link to="/admin">
          <Button onClick={handleLogout}>Logout</Button>
        </Link>
      </div>
      <h1>User Submissions Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Uploaded Images</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((submission, index) => (
            <tr key={index}>
              <td>{submission.name}</td>
              <td>{submission.socialMediaHandle}</td>
              <td>
                <div className="image-thumbnails">
                  {submission.uploadedImages?.length > 0 ? (
                    submission.uploadedImages.map((image, idx) => (
                      <img
                        key={idx}
                        src={
                          `http://localhost:5000${image.url}` ||
                          "/placeholder.svg"
                        }
                        alt={`${submission.name}'s upload ${idx + 1}`}
                        onClick={() => handleImageClick(image)}
                        className="thumbnail"
                      />
                    ))
                  ) : (
                    <span>No images uploaded</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminDashboard;
