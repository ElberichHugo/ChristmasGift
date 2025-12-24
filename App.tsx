import React, { useState, useCallback, useEffect } from 'react';
import { AppState } from './types'; // 确保类型定义存在

// 动态导入 public/images/ 下的所有图片
const imageModules = import.meta.glob('/images/*.{jpg,jpeg,png,webp,gif}', { eager: true, as: 'url' });

// 将图片路径转为对象数组
const generateImageList = () => {
  return Object.entries(imageModules).map(([path, url], index) => ({
    id: `img${index}`,
    url: url as string,
    alt: `Surprise Image ${index + 1}`,
  }));
};

interface SurpriseImage {
  id: string;
  url: string;
  alt: string;
}

const App: React.FC = () => {
  const [allImages, setAllImages] = useState<SurpriseImage[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.CLOSED);
  const [revealedImage, setRevealedImage] = useState<SurpriseImage | null>(null);

  // 在组件挂载时生成图片列表
  useEffect(() => {
    setAllImages(generateImageList());
  }, []);

  const handleOpen = useCallback(() => {
    if (allImages.length === 0) return;

    // 使用加密安全的随机数生成器
    const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % allImages.length;
    setRevealedImage(allImages[randomIndex]);

    setAppState(AppState.OPENING);

    setTimeout(() => {
      setAppState(AppState.OPENED);
    }, 700);
  }, [allImages]);

  const handleReset = useCallback(() => {
    setAppState(AppState.CLOSED);
    setRevealedImage(null);
  }, []);

  if (allImages.length === 0) {
    return <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-purple-900">Loading images...</div>;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
      {/* Snowfall effect - using CSS only for simplicity */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Background Decor */}
      <div className="fixed top-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 text-6xl">🎄</div>
        <div className="absolute bottom-10 right-10 text-6xl">🎅</div>
        <div className="absolute top-1/4 right-20 text-4xl">🎁</div>
        <div className="absolute bottom-1/4 left-20 text-4xl">🦌</div>
      </div>

      <header className="mb-12 text-center z-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wider drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
          Christmas Surprise!
        </h1>
        <p className="text-red-300 mt-4 text-lg md:text-xl animate-pulse">
          {appState === AppState.CLOSED ? "Click the box to open your gift..." : "Merry Christmas!"}
        </p>
      </header>

      <main className="relative flex items-center justify-center z-20">
        {/* The Gift Box - Simplified version for demo */}
        <div 
          className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-2xl cursor-pointer flex items-center justify-center relative transform transition-transform hover:scale-105 active:scale-95"
          onClick={handleOpen}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-12 bg-gradient-to-r from-red-700 to-red-900 rounded-t-lg"></div>
          <div className="text-6xl">🎁</div>
          <div className="absolute w-full h-2 bg-yellow-400 top-1/3"></div>
          <div className="absolute h-full w-2 bg-yellow-400 left-1/2 transform -translate-x-1/2"></div>
        </div>

        {/* The Revealed Image */}
        {appState === AppState.OPENED && revealedImage && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-4 animate-in fade-in zoom-in duration-500">
            <div className="relative max-w-4xl w-full max-h-[90vh] bg-white p-2 rounded-lg shadow-2xl overflow-hidden group">
              {/* 图片容器 - 确保不超过屏幕 */}
              <div className="flex justify-center p-2">
                <img 
                  src={revealedImage.url} 
                  alt={revealedImage.alt}
                  className="max-h-[70vh] max-w-full object-contain rounded-md border-4 border-red-500 shadow-inner transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Confetti Effect Simulation */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`absolute w-2 h-2 rounded-full ${['bg-yellow-400', 'bg-red-500', 'bg-green-500', 'bg-blue-400'][i % 4]}`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `confetti-pop ${Math.random() * 2 + 1}s ease-out forwards`,
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 flex flex-col items-center gap-4 p-4">
                <h2 className="text-red-600 text-2xl md:text-3xl font-bold text-center">
                  You found a Christmas Surprise!
                </h2>
                <button 
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg md:text-xl transition-all hover:scale-105 active:scale-95 shadow-lg border-b-4 border-red-800"
                >
                  Open Another Box 🎁
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CSS Animations */}
      <style>{`
        @keyframes confetti-pop {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .animate-in {
          animation: animate-in 0.5s ease-out;
        }
        @keyframes animate-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;



