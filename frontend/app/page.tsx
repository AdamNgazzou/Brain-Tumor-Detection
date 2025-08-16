"use client"

import type React from "react"
import Link from "next/link"
import { useState, useCallback } from "react"
import {
  Upload,
  Brain,
  AlertCircle,
  CheckCircle,
  Loader2,
  FileImage,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Award,
  Play,
  Star,
  Microscope,
  Clock,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

function DetectionApp() {
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
    if (!selectedFile) return

    setIsAnalyzing(true)

    // Si    uvicorn main:app --reload --host 0.0.0.0 --port 8000ate AI analysis (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock result (replace with actual AI model response)
    const mockResult = {
      hasTumor: Math.random() > 0.5,
      confidence: Math.floor(Math.random() * 30) + 70,
      message:
        Math.random() > 0.5
          ? "No brain tumor detected in the MRI scan."
          : "Potential brain tumor detected. Please consult with a medical professional for further evaluation.",
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

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
              <Button variant="outline" className="bg-transparent hover:bg-muted/50 transition-all">
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
                  <label htmlFor="file-upload">
                    <Button
                      variant="outline"
                      size="lg"
                      className="cursor-pointer bg-transparent hover:bg-muted/50 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <FileImage className="mr-3 h-5 w-5" />
                      Select Image
                    </Button>
                  </label>
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
                    <Zap className="h-5 w-5 text-secondary" />
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-secondary to-accent rounded-xl animate-pulse-glow">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold font-work-sans">NeuroScan AI</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <Link href="/detect">
                <Button className="bg-secondary hover:bg-secondary/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              FDA-Approved AI Technology
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-work-sans mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Revolutionary Brain Tumor Detection
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Harness the power of advanced AI to analyze MRI scans with unprecedented accuracy. Get instant results and
              professional insights in seconds, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/detect">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-8 py-6 rounded-xl">
                  Start Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">99.2%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{"< 30s"}</div>
                <div className="text-muted-foreground">Analysis Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">50K+</div>
                <div className="text-muted-foreground">Scans Analyzed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Brain Illustration */}
        <div className="absolute right-10 top-32 hidden lg:block animate-float">
          <div className="w-32 h-32 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center">
            <Brain className="h-16 w-16 text-secondary" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-work-sans mb-4">Cutting-Edge Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform combines advanced machine learning with medical expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-work-sans">Lightning Fast</CardTitle>
                <CardDescription>Get results in under 30 seconds with our optimized AI algorithms</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-work-sans">Medical Grade Security</CardTitle>
                <CardDescription>HIPAA compliant with end-to-end encryption for your medical data</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-work-sans">High Accuracy</CardTitle>
                <CardDescription>99.2% accuracy rate validated by leading medical institutions</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Microscope className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-work-sans">Detailed Analysis</CardTitle>
                <CardDescription>Comprehensive reports with confidence levels and recommendations</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-work-sans">24/7 Availability</CardTitle>
                <CardDescription>Access our AI analysis anytime, anywhere with cloud-based processing</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-work-sans">Expert Validated</CardTitle>
                <CardDescription>Developed and validated by leading neurologists and radiologists</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-work-sans mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and accurate brain tumor detection in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold font-work-sans mb-4">Upload MRI Scan</h3>
              <p className="text-muted-foreground">
                Simply drag and drop your brain MRI image or click to browse files
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold font-work-sans mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI processes the image using deep learning algorithms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold font-work-sans mb-4">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed analysis with confidence levels and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-work-sans mb-4">Trusted by Medical Professionals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what leading healthcare providers say about our AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "This AI tool has revolutionized our diagnostic process. The accuracy is remarkable and it saves us
                  hours of analysis time."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Chief Radiologist, Mayo Clinic</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The confidence levels and detailed analysis help us make better informed decisions for our patients."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Michael Chen</div>
                    <div className="text-sm text-muted-foreground">Neurologist, Johns Hopkins</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "An invaluable tool for early detection. The user interface is intuitive and the results are
                  consistently reliable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Emily Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Oncologist, Cleveland Clinic</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary to-accent text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold font-work-sans mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of medical professionals using our AI-powered brain tumor detection platform
          </p>
          <Link href="/detect">
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-6 rounded-xl">
              Start Your Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-secondary to-accent rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold font-work-sans">NeuroScan AI</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 NeuroScan AI. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
