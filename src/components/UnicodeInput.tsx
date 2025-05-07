
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface UnicodeInputProps {
  onTextSubmit: (text: string) => void;
}

const UnicodeInput: React.FC<UnicodeInputProps> = ({ onTextSubmit }) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const textParam = params.get('text');
    if (textParam) {
      setInputText(textParam);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onTextSubmit(inputText);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to analyze..."
            className="w-full h-14 pl-4 pr-12 text-lg bg-white border-unicode-blue/30 rounded-xl shadow-md focus:ring-2 focus:ring-unicode-blue focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-unicode-blue" />
          </div>
        </div>
        <Button 
          type="submit" 
          className="h-14 px-8 text-lg font-medium bg-unicode-blue hover:bg-unicode-darkblue text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          CHECK
        </Button>
      </form>
    </div>
  );
};

export default UnicodeInput;
