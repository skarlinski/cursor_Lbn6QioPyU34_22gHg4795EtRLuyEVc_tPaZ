'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function UploadForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const statusFromQuery = searchParams.get('status');
    if (statusFromQuery) {
      setStatus(statusFromQuery);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!status || !image) {
      setError('Please provide both a status code and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('status', status);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3001/api/statuses', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        setError('');
        setStatus('');
        setImage(null);
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
        router.refresh();
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
        setMessage('');
      }
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <nav className="w-full">
        <Link href="/" className="text-white">{`< Back to Home`}</Link>
      </nav>
      <div className="w-full max-w-md mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload a New Status Cat</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-[--interactive] p-8 rounded-lg shadow-lg">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-white">
              Status Code
            </label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-white">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
        {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      </div>
    </div>
  );
}

