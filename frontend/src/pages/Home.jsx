import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://url-shortener-1-4d1j.onrender.com/api/shorten",
      {
        longUrl,
      }
    );
    setShortUrl(res.data.shortUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Shorten Your Link
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex">
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="flex-1 border rounded-l-lg p-3 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 rounded-r-lg hover:bg-indigo-700"
        >
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
          <p className="text-gray-700">Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 font-semibold"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
