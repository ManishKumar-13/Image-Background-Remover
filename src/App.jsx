import React, { useState } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image_file", selectedFile);

    try {
      const response = await fetch(
        "https://api.remove.bg/v1.0/removebg",
        {
          method: "POST",
          headers: {
            "X-Api-Key": "W3jHfmDAwEES2Kh7yWyQN7wm",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error processing image");
      }

      const result = await response.blob();
      setProcessedImage(URL.createObjectURL(result));
      setLoading(false);
    } catch (error) {
      setError("Error processing image. Please try again.");
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url("https://source.unsplash.com/random/1600x900/?image-manipulation,background-removal")` }}>
      <div className="w-full max-w-2xl p-8 m-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          BackgroundErase: Instant Background Removal
        </h1>
        <div className="mb-6">
          <input
            id="upload"
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleFileChange}
            accept="image/*"
          />
          <label
            htmlFor="upload"
            className="cursor-pointer block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg w-full mt-4"
          >
            Choose Image
          </label>
        
        </div>
        <button
          className={`w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Processing..." : "Remove Background"}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {processedImage && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Processed Image:</h2>
            <img src={processedImage} alt="Processed" className="w-full rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;