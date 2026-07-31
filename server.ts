import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import admin from "firebase-admin";

// Initialize Firebase Admin (this is just for demonstration, you need to set up the service account key properly in real env)
// The guideline says to use environment variables for keys.
// For now, I will assume it's initialized via default credentials if the environment is set up.
// Or I should instruct the user to setup credentials.
// Actually, I can use the same project ID as in lib/firebase.ts.

// For the backend, I need to setup multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.post("/api/upload-hero", upload.fields([{ name: 'file' }, { name: 'image' }]), async (req: Request, res: Response) => {
    try {
      // 1. Get files
      const files = (req as any).files as { [fieldname: string]: any[] };
      const file = files['file']?.[0];
      const image = files['image']?.[0];

      if (!file && !image) {
        return res.status(400).json({ error: "Missing files" });
      }

      // 2. Call Gemini API to process the files
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

      // For demonstration, let's just analyze the file/image and generate a mock hero card for now
      // This is where you would send the file content to Gemini
      const prompt = `Analyze this ${file ? 'code' : 'image'} and extract hero details (name, heroName, superpowers, dreamCareer, mission, message) in JSON format.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      console.log(response.text);
      
      res.json({ message: "Hero processed successfully (mocked for now)", result: response.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to process hero" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
