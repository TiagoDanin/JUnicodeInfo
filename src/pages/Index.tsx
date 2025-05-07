
import { useState, useRef, useEffect } from 'react';
import { analyzeText, CharacterInfo } from '@/services/unicodeService';
import UnicodeInput from '@/components/UnicodeInput';
import CharacterCard from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Linkedin, Youtube, Code, Heart } from 'lucide-react';

const Index = () => {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const textParam = params.get('text');
    if (textParam) {
      handleTextSubmit(textParam);
    }
  }, []);

  const handleTextSubmit = (text: string) => {
    setInputText(text);
    
    const url = new URL(window.location.href);
    url.searchParams.set('text', text);
    window.history.pushState({}, '', url);
    
    const result = analyzeText(text);
    setCharacters([]);
    
    if (result.length > 0) {
      let index = 0;
      
      const interval = setInterval(() => {
        index++;
        if (index >= result.length) {
          clearInterval(interval);
          setCharacters(result);
        } else {
          setCharacters(prev => [...prev, result[index - 1]]);
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (resultRef.current && characters.length > 0) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [characters.length]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-8 flex flex-col items-center">
        <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 text-unicode-darkblue">
          <span className="text-unicode-blue">J</span>Unicode<span className="text-unicode-lavender">Info</span>
        </div>
        <p className="text-lg md:text-xl text-center mb-8 text-unicode-darkblue/80 max-w-3xl">
          Enter any text to analyze Unicode characters, get code points, HTML entities, and more
        </p>
        
        {/* Main input */}
        <UnicodeInput onTextSubmit={handleTextSubmit} />
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {characters.length > 0 && (
          <div ref={resultRef} className="rounded-xl p-6 md:p-8 mb-8 max-w-6xl mx-auto border border-unicode-blue/20 bg-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-unicode-darkblue">
              Results for: <span className="text-unicode-blue font-bold">"{inputText}"</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {characters.map((charInfo, index) => (
                <div 
                  key={index} 
                  className={`character-appear`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <CharacterCard info={charInfo} />
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => {
                  const textToCopy = characters.map(c => `Character: ${c.char} (U+${c.codePoint})`).join('\n');
                  navigator.clipboard.writeText(textToCopy);
                }}
                className="bg-unicode-blue hover:bg-unicode-darkblue text-white"
              >
                Copy Results to Clipboard
              </Button>
            </div>
          </div>
        )}
        
        {characters.length === 0 && (
          <div className="rounded-xl p-6 md:p-8 my-8 max-w-4xl mx-auto text-center border border-unicode-blue/20 bg-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-unicode-darkblue">
              Welcome to JUnicodeInfo
            </h2>
            <p className="text-lg text-unicode-darkblue/80 mb-6">
              Enter any text in the search box above to see detailed Unicode information for each character.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => handleTextSubmit("Hello, 世界! 👋")}
                className="bg-unicode-blue hover:bg-unicode-darkblue text-white"
              >
                Try with "Hello, 世界! 👋"
              </Button>
              <Button 
                onClick={() => handleTextSubmit("©®™€£¥$¢")}
                className="bg-unicode-lavender hover:bg-unicode-blue text-white"
              >
                Try with "©®™€£¥$¢"
              </Button>
              <Button 
                onClick={() => handleTextSubmit("αβγδεζηθ")}
                className="bg-unicode-lightlavender hover:bg-unicode-lavender text-unicode-darkblue"
              >
                Try with "αβγδεζηθ"
              </Button>
            </div>
          </div>
        )}
        
        {/* Features section */}
        <section className="max-w-4xl mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl p-6 text-center border border-unicode-blue/20 bg-white">
              <h3 className="text-xl font-semibold mb-3 text-unicode-darkblue">Character Details</h3>
              <p className="text-unicode-darkblue/80">
                Get comprehensive information about each Unicode character including code point, UTF-8 representation, and HTML entities.
              </p>
            </div>
            <div className="rounded-xl p-6 text-center border border-unicode-blue/20 bg-white">
              <h3 className="text-xl font-semibold mb-3 text-unicode-darkblue">Unicode Blocks</h3>
              <p className="text-unicode-darkblue/80">
                Discover which Unicode block each character belongs to, helping you understand character origins and classifications.
              </p>
            </div>
            <div className="rounded-xl p-6 text-center border border-unicode-blue/20 bg-white">
              <h3 className="text-xl font-semibold mb-3 text-unicode-darkblue">Visual Analysis</h3>
              <p className="text-unicode-darkblue/80">
                See your text broken down character by character with a beautiful interface that makes Unicode exploration fun.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-unicode-blue/20 py-12">
        <div className="container mx-auto space-y-8">
          <div className="grid grid-cols-1 gap-8 text-center">
            <div className="flex justify-center gap-6">
              <a className="text-unicode-darkblue/80 hover:text-unicode-darkblue" href="/">Home</a>
              <a className="text-unicode-darkblue/80 hover:text-unicode-darkblue" href="/projects">Projects</a>
              <a className="text-unicode-darkblue/80 hover:text-unicode-darkblue" href="/blog">Blog</a>
              <a className="text-unicode-darkblue/80 hover:text-unicode-darkblue" href="/timeline">Timeline</a>
              <a className="text-unicode-darkblue/80 hover:text-unicode-darkblue" href="/sitemap">Site Map</a>
            </div>
            <div>
              <h3 className="text-sm text-unicode-darkblue/60 mb-4">Follow me on social media:</h3>
              <div className="flex justify-center">
                <div className="flex gap-4">
                  <a href="https://github.com/tiagodanin" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-unicode-blue/20 text-unicode-darkblue h-12 w-12">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href="https://instagram.com/tiagodanin" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-unicode-blue/20 text-unicode-darkblue h-12 w-12">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://linkedin.com/in/tiagodanin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-unicode-blue/20 text-unicode-darkblue h-12 w-12">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCC2wpNWwPLPq0vjpOtGcajw" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-unicode-blue/20 text-unicode-darkblue h-12 w-12">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-unicode-darkblue/60">
            <Code className="h-4 w-4 text-unicode-blue" />
            <span>with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by</span>
            <span className="font-medium">Tiago Danin</span>
            <span>|</span>
            <span>Built with</span>
            <span className="font-medium">React</span>
            <span>and</span>
            <span className="font-medium">Tailwind</span>
            <span>|</span>
            <span>Hosted on</span>
            <span className="font-medium">GitHub Pages</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
