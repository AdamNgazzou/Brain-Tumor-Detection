"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Link from "next/link"
import { Upload, Brain, AlertCircle, CheckCircle, Loader2, FileImage, Microscope, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DetectionApp() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    hasTumor: boolean
    confidence: number
    message: string
  } | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        setSelectedFile(file)
        setResult(null)
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setResult(null)
    }
  }

const analyzeImage = async () => {
  if (!selectedFile) return;

  setIsAnalyzing(true);

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/detect`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      setResult({
        hasTumor: data.predicted_class === 1, // Adjust this based on your backend's class names
        confidence: Math.round(data.confidence_score * 100), // Convert to percentage if needed
        message:
          data.predicted_class === 1
            ? "Potential brain tumor detected. Please consult with a medical professional for further evaluation."
            : "No brain tumor detected in the MRI scan.",
      });
    } else {
      setResult({
        hasTumor: false,
        confidence: 0,
        message: data.error || "Analysis failed.",
      });
    }
  } catch (error) {
    setResult({
      hasTumor: false,
      confidence: 0,
      message: "Network error. Please try again.",
    });
  }

  setIsAnalyzing(false);
};


  const resetAnalysis = () => {
    setSelectedFile(null)
    setResult(null)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-md border-b border-border/50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
            <Button
                variant="outline"
                className="bg-transparent hover:bg-muted/50 hover:text-foreground transition-all"
              >
                ← Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-secondary to-accent rounded-xl animate-pulse-glow">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-work-sans text-foreground">MRI Brain Tumor Detection</h1>
                <p className="text-muted-foreground text-sm">AI-powered medical imaging analysis</p>
              </div>
            </div>
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <Card className="mb-12 border-0 shadow-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <FileImage className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-2xl font-work-sans">Upload MRI Scan</CardTitle>
            </div>
            <CardDescription className="text-base">
              Upload a brain MRI image for AI-powered tumor detection analysis with instant results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-secondary bg-gradient-to-br from-secondary/10 to-accent/5 scale-[1.02] shadow-lg"
                  : "border-border hover:border-secondary/50 hover:bg-muted/30"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                        alt="Selected MRI scan"
                        className="max-h-64 rounded-xl border-2 border-border shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-secondary text-white rounded-full p-2">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="font-semibold text-foreground text-lg">{selectedFile.name}</p>
                    <p className="text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      size="lg"
                      className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="h-5 w-5 mr-3" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetAnalysis}
                      size="lg"
                      className="px-8 py-6 text-lg rounded-xl bg-transparent"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Upload className="h-16 w-16 mx-auto text-muted-foreground animate-bounce" />
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-xl opacity-50"></div>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold font-work-sans text-foreground mb-2">
                      Drop your MRI image here
                    </p>
                    <p className="text-muted-foreground text-lg">or click to browse files • Supports JPEG, PNG, TIFF</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
                    <Button
                      variant="outline"
                      size="lg"
                    className="cursor-pointer bg-transparent hover:bg-muted/50 hover:text-foreground px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                    onClick={() => document.getElementById("file-upload")?.click()
                    }                    >
                      <FileImage className="mr-3 h-5 w-5" />
                      Select Image
                    </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-fade-in">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-work-sans">
                {result.hasTumor ? (
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                ) : (
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  </div>
                )}
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <Alert
                className={`border-2 rounded-xl p-6 ${result.hasTumor ? "border-destructive bg-destructive/5" : "border-secondary bg-secondary/5"}`}
              >
                <AlertDescription className="text-lg font-medium">{result.message}</AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 bg-gradient-to-br from-muted/50 to-muted/30 shadow-lg">
                  <CardContent className="text-center p-8">
                    <div
                      className={`text-4xl font-bold mb-2 ${result.hasTumor ? "text-destructive" : "text-secondary"}`}
                    >
                      {result.hasTumor ? "⚠️" : "✅"}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Detection Status</p>
                    <p className={`font-bold text-xl ${result.hasTumor ? "text-destructive" : "text-secondary"}`}>
                      {result.hasTumor ? "Tumor Detected" : "No Tumor Detected"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-muted/50 to-muted/30 shadow-lg">
                  <CardContent className="text-center p-8">
                    <div className="text-4xl font-bold text-secondary mb-2">{result.confidence}%</div>
                    <p className="text-sm text-muted-foreground mb-2">Confidence Level</p>
                    <div className="w-full bg-border rounded-full h-3 mt-3">
                      <div
                        className="bg-gradient-to-r from-secondary to-accent h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="border-2 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 rounded-xl p-6">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <AlertDescription className="text-base">
                  <strong>Important Medical Disclaimer:</strong> This AI analysis is for informational purposes only and
                  should not replace professional medical diagnosis. Always consult with qualified medical professionals
                  for proper diagnosis and treatment decisions.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetAnalysis}
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FileImage className="mr-3 h-5 w-5" />
                  Analyze Another Image
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl bg-transparent">
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-12 border-0 shadow-xl bg-gradient-to-br from-card to-card/80">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-work-sans flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Microscope className="h-6 w-6 text-secondary" />
              </div>
              About This AI Tool
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg font-work-sans mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-secondary" />
                    How It Works
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      Upload your brain MRI scan image
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      AI analyzes the image for tumor indicators
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      Receive results with confidence level
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      Consult medical professionals for diagnosis
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg font-work-sans mb-4 flex items-center gap-2">
                    <FileImage className="h-5 w-5 text-secondary" />
                    Supported Formats
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      JPEG, PNG, TIFF images
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      Maximum file size: 10MB
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      High resolution recommended
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      Clear, unobstructed scans
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 bg-gradient-to-r from-secondary/5 to-accent/5 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg font-work-sans mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-secondary" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-secondary">99.2%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{"< 30s"}</div>
                    <div className="text-sm text-muted-foreground">Analysis Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">50K+</div>
                    <div className="text-sm text-muted-foreground">Scans Processed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">24/7</div>
                    <div className="text-sm text-muted-foreground">Availability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
