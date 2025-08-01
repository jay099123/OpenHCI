"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { usePlanets } from "@/hooks/usePlanets";

interface BookPage {
  id: string;
  imageUrl: string;
  text: string;
  pageNumber: number;
}

interface Book {
  id: string;
  title: string;
  coverImage: string;
  sourceImage?: string;
  pages: BookPage[];
  createdAt: string;
  color: string;
}

export default function BookPage() {
  const { planets, loading, error } = usePlanets();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  // Convert planets to books
  const books: Book[] = planets.map(planet => ({
    id: planet.id,
    title: planet.story?.title || planet.name,
    coverImage: planet.story?.sourceImage || '/book-cover-default.png',
    sourceImage: planet.story?.sourceImage,
    pages: planet.story?.pages ? 
      Object.values(planet.story.pages)
        .sort((a, b) => a.pageNumber - b.pageNumber)
        .map((page, index) => ({
          id: `${planet.id}-page-${page.pageNumber || index + 1}`, // Generate ID from planet ID + page number
          imageUrl: page.imageUrl || '/placeholder.png',
          text: page.text || '',
          pageNumber: page.pageNumber || index + 1
        })) : [],
    createdAt: planet.story?.createdAt || planet.createdAt,
    color: planet.color
  }));

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setCurrentPageIndex(0);
  };

  const handlePageFlip = (direction: 'next' | 'prev') => {
    if (isFlipping || !selectedBook) return;
    
    setIsFlipping(true);
    setFlipDirection(direction);
    
    setTimeout(() => {
      if (direction === 'next' && currentPageIndex < selectedBook.pages.length - 1) {
        setCurrentPageIndex(prev => prev + 1);
      } else if (direction === 'prev' && currentPageIndex > 0) {
        setCurrentPageIndex(prev => prev - 1);
      }
      setIsFlipping(false);
    }, 300);
  };

  const getImageSrc = (url: string) => {
    if (url?.startsWith('https://firebasestorage.googleapis.com')) {
      return url;
    }
    if (url?.startsWith('/')) {
      return url;
    }
    return '/placeholder.png';
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-white mt-4">載入書籍中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <p className="text-red-400 text-center px-6">載入失敗: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen px-6 py-6 overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {!selectedBook ? (
        // Book Library View
        <div className="flex flex-col h-full relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2"
                style={{
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              📚 莉莉的故事書
            </h1>
            <p className="text-white/80 text-lg">點選書本開始閱讀</p>
          </motion.div>

          {/* Books Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-6 pb-6">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="relative cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookSelect(book)}
                >
                  {/* Book Cover */}
                  <div 
                    className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg relative"
                    style={{
                      background: `linear-gradient(135deg, ${book.color}40, ${book.color}80)`,
                      border: `2px solid ${book.color}60`
                    }}
                  >
                    {/* Conditional rendering based on sourceImage availability */}
                    {book.sourceImage && book.sourceImage !== '/book-cover-default.png' ? (
                      // Show actual cover image
                      <Image
                        src={getImageSrc(book.coverImage)}
                        alt={book.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Hide the broken image and show fallback content
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            parent.classList.add('show-fallback');
                          }
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback content for books without sourceImage */}
                    <div 
                      className={`absolute inset-0 flex flex-col items-center justify-center text-white ${
                        !book.sourceImage || book.sourceImage === '/book-cover-default.png' ? '' : 'hidden show-fallback:flex'
                      }`}
                    >
                      {/* Decorative background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                        <div className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full"></div>
                        <div className="absolute bottom-8 left-12 w-6 h-6 border border-white rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white rounded-full opacity-30"></div>
                      </div>
                      
                      {/* Main content */}
                      <div className="relative z-10 text-center">
                        <div className="text-4xl mb-3">📖</div>
                        <p className="text-lg font-bold mb-1 px-2 leading-tight">{book.title}</p>
                        <p className="text-sm opacity-90">{book.pages.length} 頁故事</p>
                      </div>
                    </div>
                    
                    {/* Overlay - only show when there's an actual image */}
                    {book.sourceImage && book.sourceImage !== '/book-cover-default.png' && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    )}
                    
                    {/* Book Spine Effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/30" />
                    
                    {/* Book Icon */}
                    <div className="absolute top-2 right-2">
                      <MenuBookIcon className="text-white drop-shadow-lg" />
                    </div>
                  </div>

                  {/* Book Title */}
                  <motion.h3 
                    className="text-white font-bold text-center mt-3 px-2"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
                  >
                    {book.title}
                  </motion.h3>
                  
                  {/* Page Count */}
                  <p className="text-white/70 text-sm text-center">
                    {book.pages.length} 頁
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Book Reading View
        <div className="flex flex-col h-full relative z-10">
          {/* Book Header */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="flex items-center text-white hover:text-white/80 transition-colors"
            >
              <ArrowBackIcon className="mr-2" />
              <span>返回書庫</span>
            </button>
            
            <h2 className="text-2xl font-bold text-white text-center flex-1"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
              {selectedBook.title}
            </h2>
            
            <div className="text-white/70 text-sm">
              {currentPageIndex + 1} / {selectedBook.pages.length}
            </div>
          </motion.div>

          {/* Book Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              {/* Book Container */}
              <motion.div
                className="relative aspect-[3/4] mx-auto"
                style={{ perspective: "1000px" }}
              >
                {/* Current Page */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPageIndex}
                    className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
                    initial={{ 
                      rotateY: flipDirection === 'next' ? 90 : -90,
                      opacity: 0 
                    }}
                    animate={{ 
                      rotateY: 0,
                      opacity: 1 
                    }}
                    exit={{ 
                      rotateY: flipDirection === 'next' ? -90 : 90,
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                      border: '3px solid #e9ecef',
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {selectedBook.pages[currentPageIndex] && (
                      <>
                        {/* Page Image */}
                        <div className="relative h-2/3">
                          <Image
                            src={getImageSrc(selectedBook.pages[currentPageIndex].imageUrl)}
                            alt={`第 ${currentPageIndex + 1} 頁`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.png';
                            }}
                          />
                        </div>
                        
                        {/* Page Text */}
                        <div className="h-1/3 p-4 bg-white/90 backdrop-blur-sm">
                          <p className="text-gray-800 text-sm leading-relaxed font-medium">
                            {selectedBook.pages[currentPageIndex].text}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Page Shadow */}
                <div className="absolute inset-0 rounded-xl shadow-2xl pointer-events-none"
                     style={{ 
                       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset -5px 0 10px -5px rgba(0, 0, 0, 0.1)' 
                     }} />
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <motion.button
                  onClick={() => handlePageFlip('prev')}
                  disabled={currentPageIndex === 0 || isFlipping}
                  className="flex items-center px-6 py-3 bg-white/20 text-white rounded-full 
                           hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed
                           backdrop-blur-sm border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowBackIcon className="mr-2" />
                  上一頁
                </motion.button>

                <motion.button
                  onClick={() => handlePageFlip('next')}
                  disabled={currentPageIndex === selectedBook.pages.length - 1 || isFlipping}
                  className="flex items-center px-6 py-3 bg-white/20 text-white rounded-full 
                           hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed
                           backdrop-blur-sm border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  下一頁
                  <ArrowForwardIcon className="ml-2" />
                </motion.button>
              </div>

              {/* Page Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {selectedBook.pages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      index === currentPageIndex 
                        ? 'bg-white' 
                        : 'bg-white/40'
                    }`}
                    onClick={() => {
                      if (index !== currentPageIndex) {
                        setFlipDirection(index > currentPageIndex ? 'next' : 'prev');
                        setCurrentPageIndex(index);
                      }
                    }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 1.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}