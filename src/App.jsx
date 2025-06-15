import React from 'react'
import { useState } from 'react';
import './index.css';

const styles = [
  '1980s photo',
  'film noir',
  'cyberpunk anime',
  'storybook watercolor',
];

export default function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [style, setStyle] = useState(styles[0]);
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Simulate GPT + DALL·E placeholder logic
      const styledPrompt = `A scene in the style of ${style}: ${userPrompt}`;
      setRefinedPrompt(styledPrompt);
      const dummyImage = "https://placehold.co/600x600?text=AI+Image";
      setTimeout(() => {
        setImageURL(dummyImage);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      <div className="w-full md:w-1/2 p-6 space-y-4">
        <h1 className="text-2xl font-bold">AI Scene Styler</h1>
        <textarea
          placeholder="Describe your scene..."
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
          rows={4}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <select
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {styles.map(s => <option key={s}>{s}</option>)}
        </select>
        <button
          onClick={handleGenerate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
        {refinedPrompt && <p className="text-sm italic mt-2">Prompt: {refinedPrompt}</p>}
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        {imageURL && <img src={imageURL} alt="Generated" className="rounded shadow-lg max-h-[70vh]" />}
      </div>
    </div>
  );
}
