
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CharacterInfo {
  char: string;
  codePoint: string;
  name?: string;
  block?: string;
  category?: string;
  htmlEntity?: string;
  utf8Binary?: string;
  description?: string;
}

interface CharacterCardProps {
  info: CharacterInfo;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const decimalCodePoint = parseInt(info.codePoint, 16);
  const htmlDecimalEntity = `&#${decimalCodePoint};`;
  const htmlHexEntity = `&#x${info.codePoint};`;
  const utf8Hex = `0x${info.codePoint.toLowerCase()} (${info.codePoint.toLowerCase()})`;
  const utf16Hex = `0x${info.codePoint.padStart(4, '0')} (${info.codePoint.padStart(4, '0')})`;
  const utf32Hex = `0x${'0'.repeat(8-info.codePoint.length)}${info.codePoint} (${info.codePoint.toLowerCase()})`;
  
  const upperCasePoint = info.char.toUpperCase() !== info.char 
    ? `U+${info.char.toUpperCase().charCodeAt(0).toString(16).toUpperCase()}`
    : 'N/A';
  
  return (
    <div className="character-card-container">
      <Card 
        className={`character-card p-4 flex flex-col items-center hover:bg-white transition-all duration-300 
                   border border-unicode-blue/20 ${isOpen ? 'bg-unicode-lightlavender/20' : ''} h-full min-h-[100px] flex justify-center`}
        onClick={() => setIsOpen(true)}
      >
        <div className="text-3xl mb-2 font-bold text-unicode-darkblue min-h-[36px] flex items-center">{info.char}</div>
        <div className="text-sm font-medium text-unicode-blue">U+{info.codePoint}</div>
      </Card>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-card border-unicode-blue/30 rounded-xl shadow-xl p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-unicode-darkblue min-h-[48px] flex items-center">{info.char}</span>
              <span className="text-xl text-unicode-blue">U+{info.codePoint}</span>
              <span className="text-lg text-unicode-darkblue/70">{info.name || 'Unknown Character'}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <h3 className="font-bold text-xl text-unicode-darkblue border-b border-unicode-lightlavender pb-2 mb-4">Unicode Data</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 text-lg">
              <div className="font-medium text-unicode-darkblue">Name:</div>
              <div className="text-unicode-blue">{info.name || 'Unknown'}</div>
              
              <div className="font-medium text-unicode-darkblue">Block:</div>
              <div className="text-unicode-blue">{info.block || 'Unknown'}</div>
              
              <div className="font-medium text-unicode-darkblue">Category:</div>
              <div className="text-unicode-blue">{info.category || 'Unknown'}</div>
              
              <div className="font-medium text-unicode-darkblue">Combine:</div>
              <div className="text-unicode-blue">0</div>
              
              <div className="font-medium text-unicode-darkblue">BIDI:</div>
              <div className="text-unicode-blue">Left-to-Right [L]</div>
              
              <div className="font-medium text-unicode-darkblue">Mirror:</div>
              <div className="text-unicode-blue">N</div>
              
              <div className="font-medium text-unicode-darkblue">Upper case:</div>
              <div className="text-unicode-blue">{upperCasePoint}</div>
              
              <div className="font-medium text-unicode-darkblue">Title case:</div>
              <div className="text-unicode-blue">{upperCasePoint}</div>
            </div>
            
            <h3 className="font-bold text-xl text-unicode-darkblue border-b border-unicode-lightlavender pb-2 mb-4">Encodings</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-lg">
              <div className="font-medium text-unicode-darkblue">HTML Entity (decimal):</div>
              <div className="text-unicode-blue font-mono">{htmlDecimalEntity}</div>
              
              <div className="font-medium text-unicode-darkblue">HTML Entity (hex):</div>
              <div className="text-unicode-blue font-mono">{htmlHexEntity}</div>
              
              <div className="font-medium text-unicode-darkblue">How to type in Windows:</div>
              <div className="text-unicode-blue font-mono">
                Alt +{info.codePoint}<br />
                Alt 0{decimalCodePoint}<br />
                Alt {decimalCodePoint}
              </div>
              
              <div className="font-medium text-unicode-darkblue">UTF-8 (hex):</div>
              <div className="text-unicode-blue font-mono">{utf8Hex}</div>
              
              <div className="font-medium text-unicode-darkblue">UTF-8 (binary):</div>
              <div className="text-unicode-blue font-mono">{info.utf8Binary}</div>
              
              <div className="font-medium text-unicode-darkblue">UTF-16 (hex):</div>
              <div className="text-unicode-blue font-mono">{utf16Hex}</div>
              
              <div className="font-medium text-unicode-darkblue">UTF-16 (decimal):</div>
              <div className="text-unicode-blue font-mono">{decimalCodePoint}</div>
              
              <div className="font-medium text-unicode-darkblue">UTF-32 (hex):</div>
              <div className="text-unicode-blue font-mono">{utf32Hex}</div>
              
              <div className="font-medium text-unicode-darkblue">UTF-32 (decimal):</div>
              <div className="text-unicode-blue font-mono">{decimalCodePoint}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterCard;
