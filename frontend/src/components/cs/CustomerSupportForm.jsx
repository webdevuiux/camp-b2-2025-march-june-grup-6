import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const CustomerSupportForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    problemTitle: '',
    description: '',
    attachment: null,
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('Sending your message...');

    const dataToSend = new FormData();
    dataToSend.append('problemTitle', formData.problemTitle);
    dataToSend.append('description', formData.description);
    if (formData.attachment) {
      dataToSend.append('attachment', formData.attachment);
    }

    try {
      const response = await fetch('http://localhost:5000/api/cs/submit', {
        method: 'POST',
        body: dataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Message sent successfully!');
        navigate('/customer-service/success');
      } else {
        setError(result.message || 'Failed to send message.');
        setMessage('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please try again.');
      setMessage('');
    }
  };

  return (
    <main className="min-h-screen bg-[#FBE8D3]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-black font-semibold mb-6"
        >
          ←
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-black mb-8">
          Create your message
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Title */}
          <div>
            <label className="block text-lg font-semibold text-black mb-1">
              Your Problem
            </label>
            <input
              type="text"
              name="problemTitle"
              value={formData.problemTitle}
              onChange={handleChange}
              placeholder="Your Problem"
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-[#EFE2D3] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-black mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write Here"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-[#EFE2D3] focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-lg font-semibold text-black mb-1">
              Attachment
            </label>
            {formData.attachment && (
              <p className="text-sm text-gray-700 mb-2">{formData.attachment.name}</p>
            )}
            <label className="block w-full border border-gray-400 bg-[#EFE2D3] rounded-md p-4 text-gray-600 text-sm cursor-pointer hover:bg-[#e2d4c6]">
              <span className="font-semibold">Add Photos or Videos</span><br />
              <span>Click here or drag to upload</span>
              <input
                type="file"
                name="attachment"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Error/Success Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#242424] text-white text-lg font-semibold py-3 rounded-md hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default CustomerSupportForm;
