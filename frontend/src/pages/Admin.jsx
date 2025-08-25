import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    setLoading(true);
    const res = await axios.get("https://url-shortener-1-4d1j.onrender.com/api/admin/urls");
    setUrls(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      await axios.delete(`https://url-shortener-1-4d1j.onrender.com/api/admin/urls/${id}`);
      fetchUrls(); // Refresh list
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Admin Dashboard
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : urls.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <h3 className="text-xl font-semibold text-gray-600">No URLs found</h3>
          <p className="text-gray-500">
            Start by shortening a link on the Home page.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-4 py-2">Long URL</th>
                <th className="px-4 py-2">Short URL</th>
                <th className="px-4 py-2">Clicks</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id} className="border-t">
                  <td className="px-4 py-2 truncate max-w-xs">{url.longUrl}</td>
                  <td className="px-4 py-2">
                    <a
                      href={`https://url-shortener-1-4d1j.onrender.com/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600"
                    >
                      {`https://url-shortener-1-4d1j.onrender.com/${url.shortCode}`}
                    </a>
                  </td>
                  <td className="px-4 py-2 text-center">{url.clicks}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(url.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(url._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
