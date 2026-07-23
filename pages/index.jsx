import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Upload, Download, Loader, ChevronRight } from 'lucide-react';

export default function Home() {
  const [step, setStep] = useState('welcome');
  const [property, setProperty] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [style, setStyle] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const properties = [
    {
      id: 'barn',
      name: 'The Barn',
      location: 'Mountain View',
      description: 'Front drive with mountain backdrop',
      imageUrl: 'https://images.unsplash.com/photo-1500595046891-ff5bc8d37f51?w=1200&h=800&fit=crop',
      prompt: 'Stand on the front drive facing the mountains. Capture the view with the barn framed naturally.'
    },
    {
      id: 'lodge',
      name: 'The Lodge',
      location: 'Back Deck',
      description: 'Panoramic mountain views',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      prompt: 'Step onto the back deck facing the mountains. Take a selfie with the panoramic view behind you.'
    }
  ];

  const styles = [
    { id: 'oil', name: 'Oil Painting', description: 'Rich, textured brushstrokes', emoji: '🎨' },
    { id: 'watercolor', name: 'Watercolor', description: 'Soft, flowing artistic', emoji: '🌊' },
    { id: 'impressionist', name: 'Impressionist', description: 'Light, dreamy aesthetic', emoji: '✨' },
    { id: 'rustic', name: 'Rustic Cabin Art', description: 'Warm, earthy tones', emoji: '🏡' }
  ];

  const handlePropertySelect = (prop) => {
    setProperty(prop);
    setStep('upload');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result);
        setStep('style');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleSelect = async (selectedStyle) => {
    setStyle(selectedStyle);
    setStep('generating');
    setIsGenerating(true);

    // TODO: Replace with actual Replicate API call
    setTimeout(() => {
      setGeneratedImage(uploadedImage);
      setIsGenerating(false);
      setStep('result');
    }, 3000);
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `dahlonega-keepsake-${property?.id}-${Date.now()}.png`;
      link.click();
    }
  };

  const resetFlow = () => {
    setStep('welcome');
    setProperty(null);
    setUploadedImage(null);
    setStyle(null);
    setGeneratedImage(null);
  };

  return (
    <>
      <Head>
        <title>Dahlonega Lodge & Barn - Personalized Keepsake</title>
        <meta name="description" content="Transform your vacation photo into a timeless work of art" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#F5F1E8]" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* Header */}
        <div className="border-b border-[#B8860B]/20 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D5016] to-[#B8860B] flex items-center justify-center text-white text-xs font-bold">
                🏞️
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#2D5016]" style={{ fontFamily: 'Lora, serif' }}>
                  Dahlonega Lodge & Barn
                </h1>
                <p className="text-xs text-[#2D5016]/60">Your Personalized Keepsake</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12">
          {step === 'welcome' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-[#2D5016]" style={{ fontFamily: 'Lora, serif' }}>
                  Capture Your Moment
                </h2>
                <p className="text-lg text-[#2D5016]/70">Transform your vacation photo into a timeless work of art</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {properties.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => handlePropertySelect(prop)}
                    className="group relative overflow-hidden rounded-lg border-2 border-[#2D5016]/20 hover:border-[#B8860B] transition-all"
                  >
                    <div className="aspect-square bg-[#F5F1E8] relative overflow-hidden">
                      <img
                        src={prop.imageUrl}
                        alt={prop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D5016]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Lora, serif' }}>
                          {prop.name}
                        </h3>
                        <p className="text-sm text-white/80">{prop.location}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-[#2D5016]/5 border border-[#2D5016]/20 rounded-lg p-6 space-y-2">
                <p className="font-semibold text-[#2D5016]">How it works</p>
                <ol className="space-y-1 text-sm text-[#2D5016]/70">
                  <li>✓ Choose your property</li>
                  <li>✓ Upload your vacation photo</li>
                  <li>✓ Select an artistic style</li>
                  <li>✓ AI transforms it into a painting</li>
                  <li>✓ Download your keepsake</li>
                </ol>
              </div>
            </div>
          )}

          {step === 'upload' && property && (
            <div className="space-y-8 animate-fade-in">
              <button
                onClick={() => setStep('welcome')}
                className="flex items-center gap-2 text-[#2D5016] hover:text-[#B8860B] transition-colors text-sm font-medium"
              >
                ← Back to properties
              </button>

              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-[#2D5016]" style={{ fontFamily: 'Lora, serif' }}>
                  {property.name}
                </h2>
                <p className="text-[#2D5016]/70">{property.description}</p>
              </div>

              <div className="rounded-lg overflow-hidden border-2 border-[#B8860B]/30 shadow-lg">
                <img src={property.imageUrl} alt={property.name} className="w-full h-auto" />
              </div>

              <div className="bg-[#2D5016]/10 border border-[#2D5016]/30 rounded-lg p-6">
                <p className="font-semibold text-[#2D5016] mb-2">📸 Photo Tip</p>
                <p className="text-sm text-[#2D5016]/80">{property.prompt}</p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-[#B8860B] rounded-lg p-12 bg-[#F5F1E8]/50 hover:bg-[#F5F1E8] transition-colors cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#B8860B]/20 flex items-center justify-center group-hover:bg-[#B8860B]/30 transition-colors">
                    <Upload className="w-8 h-8 text-[#B8860B]" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-[#2D5016]">Click to upload your photo</p>
                    <p className="text-sm text-[#2D5016]/60 mt-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-[#2D5016]/50">JPG, PNG up to 10MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {uploadedImage && (
                <div className="rounded-lg overflow-hidden border-2 border-[#2D5016]/20">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-auto" />
                </div>
              )}
            </div>
          )}

          {step === 'style' && (
            <div className="space-y-8 animate-fade-in">
              <button
                onClick={() => setStep('upload')}
                className="flex items-center gap-2 text-[#2D5016] hover:text-[#B8860B] transition-colors text-sm font-medium"
              >
                ← Back to upload
              </button>

              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-[#2D5016]" style={{ fontFamily: 'Lora, serif' }}>
                  Choose Your Style
                </h2>
                <p className="text-[#2D5016]/70">How would you like your keepsake to look?</p>
              </div>

              {uploadedImage && (
                <div className="rounded-lg overflow-hidden border-2 border-[#2D5016]/20">
                  <img src={uploadedImage} alt="Your photo" className="w-full h-auto" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleStyleSelect(s)}
                    className="group relative bg-white border-2 border-[#2D5016]/20 hover:border-[#B8860B] rounded-lg p-4 text-left transition-all hover:shadow-lg"
                  >
                    <div className="w-full aspect-square bg-[#F5F1E8] rounded-md mb-3 flex items-center justify-center overflow-hidden text-4xl">
                      {s.emoji}
                    </div>
                    <h3 className="font-bold text-[#2D5016]" style={{ fontFamily: 'Lora, serif' }}>
                      {s.name}
                    </h3>
                    <p className="text-xs text-[#2D5016]/60 mt-1">{s.description}</p>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-5 h-5 text-[#B8860B]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'generating' && (
            <div className="space-y-8 py-12 animate-fade-in">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2D5016] to-[#B8860B] flex items-center justify-center animate-spin">
                    <Loader className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2D5016]" style={{ fontFamily: 'Lora, serif' }}>
                    Creating Your Keepsake
                  </h2>
                  <p className="text-[#2D5016]/70 mt-2">Transforming your photo into a {style?.name.toLowerCase()}...</p>
                </div>
              </div>
            </div>
          )}

          {step === 'result' && generatedImage && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-[#2D5016]" style={{ fontFamily: 'Lora, serif' }}>
                  Your Keepsake is Ready
                </h2>
                <p className="text-[#2D5016]/70">Transformed with {style?.name} style</p>
              </div>

              <div className="rounded-lg overflow-hidden border-2 border-[#B8860B] shadow-2xl">
                <img src={generatedImage} alt="Final artwork" className="w-full h-auto" />
              </div>

              <div className="bg-[#2D5016]/5 border border-[#2D5016]/20 rounded-lg p-6">
                <p className="text-sm text-[#2D5016]/80">
                  💡 <strong>Love it?</strong> Share your keepsake on social media and tag us <strong>@DahlogegaLodgeBarn</strong>
                </p>
              </div>

              <button
                onClick={downloadImage}
                className="w-full bg-gradient-to-r from-[#2D5016] to-[#1a3010] hover:from-[#1a3010] hover:to-[#0f1f08] text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download Your Keepsake
              </button>

              <button
                onClick={resetFlow}
                className="w-full border-2 border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016]/5 font-semibold py-3 rounded-lg transition-colors"
              >
                Create Another Keepsake
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
