'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { FileUpload } from '@/components/file-upload';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export default function Home() {
  const [essayFile, setEssayFile] = useState<File | null>(null);
  const [webinarFile, setWebinarFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, `${auth.currentUser?.uid}/${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    if (!essayFile || !webinarFile || !auth.currentUser) return;

    setLoading(true);
    try {
      // Upload files to Firebase Storage
      await Promise.all([
        uploadFile(essayFile, 'essays'),
        uploadFile(webinarFile, 'webinars')
      ]);

      // Process files for grading
      const formData = new FormData();
      formData.append('essay', essayFile);
      formData.append('webinar', webinarFile);

      const response = await fetch('/api/grade', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-lg text-gray-600">Please sign in to use the essay grading system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-2xl font-semibold text-center text-blue-600">
              Upload Your Content
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Upload your essay and webinar content for grading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <FileUpload
              label="Upload Essay"
              acceptedFileTypes=".pdf,.txt"
              onFileSelect={(file) => setEssayFile(file)}
            />
            <FileUpload
              label="Upload Webinar Content"
              acceptedFileTypes=".pdf,.txt"
              onFileSelect={(file) => setWebinarFile(file)}
            />
            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{result.analysis}</pre>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-gray-200 pt-6">
            <Button 
              onClick={handleSubmit}
              disabled={!essayFile || !webinarFile || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            >
              {loading ? 'Analyzing...' : 'Submit for Grading'}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}