'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { FileUpload } from '@/components/file-upload'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [essayFile, setEssayFile] = useState<File | null>(null)
  const [webinarFile, setWebinarFile] = useState<File | null>(null)

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitting files:', { essayFile, webinarFile })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8">
        <Card className="w-full max-w-2xl mx-auto bg-white shadow-md">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-2xl font-semibold text-center text-blue-600">Upload Your Content</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Upload your essay and webinar content for grading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <FileUpload
              label="Upload Essay"
              acceptedFileTypes=".pdf,.doc,.docx"
              onFileSelect={(file) => setEssayFile(file)}
            />
            <FileUpload
              label="Upload Webinar Content"
              acceptedFileTypes=".pdf,.doc,.docx,.ppt,.pptx"
              onFileSelect={(file) => setWebinarFile(file)}
            />
          </CardContent>
          <CardFooter className="border-t border-gray-200 pt-6">
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600 transition-all duration-300"
            >
              Submit for Grading
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

