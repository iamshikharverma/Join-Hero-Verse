import React, { useState } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Hero } from '../types';

export function UploadForm({ onHeroAdded }: { onHeroAdded: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !image) return;

    setUploading(true);
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      if (image) formData.append('image', image);

      const response = await fetch('/api/upload-hero', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload');

      onHeroAdded();
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
      <h3 className="font-black uppercase text-xl mb-4">Upload Hero Form</h3>
      <label className="block text-xs font-black uppercase mb-1">Upload HTML/CSS/JSV file:</label>
      <input type="file" accept=".html" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-4 w-full border-2 border-black p-2" />
      
      <label className="block text-xs font-black uppercase mb-1">Upload image of filled form:</label>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="mb-4 w-full border-2 border-black p-2" />
      <button type="submit" disabled={uploading} className="bg-yellow-400 font-black uppercase w-full p-3 border-4 border-black">
        {uploading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
}
