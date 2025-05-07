
// Map for common Unicode categories
const categoryMap: Record<string, string> = {
  Lu: "Uppercase Letter",
  Ll: "Lowercase Letter",
  Lt: "Titlecase Letter",
  Lm: "Modifier Letter",
  Lo: "Other Letter",
  Mn: "Nonspacing Mark",
  Mc: "Spacing Mark",
  Me: "Enclosing Mark",
  Nd: "Decimal Number",
  Nl: "Letter Number",
  No: "Other Number",
  Pc: "Connector Punctuation",
  Pd: "Dash Punctuation",
  Ps: "Open Punctuation",
  Pe: "Close Punctuation",
  Pi: "Initial Punctuation",
  Pf: "Final Punctuation",
  Po: "Other Punctuation",
  Sm: "Math Symbol",
  Sc: "Currency Symbol",
  Sk: "Modifier Symbol",
  So: "Other Symbol",
  Zs: "Space Separator",
  Zl: "Line Separator",
  Zp: "Paragraph Separator",
  Cc: "Control",
  Cf: "Format",
  Cs: "Surrogate",
  Co: "Private Use",
  Cn: "Unassigned"
};

// Block ranges for common Unicode blocks
const unicodeBlocks: Array<[string, number, number]> = [
  ["Basic Latin", 0x0000, 0x007F],
  ["Latin-1 Supplement", 0x0080, 0x00FF],
  ["Latin Extended-A", 0x0100, 0x017F],
  ["Latin Extended-B", 0x0180, 0x024F],
  ["IPA Extensions", 0x0250, 0x02AF],
  ["Greek and Coptic", 0x0370, 0x03FF],
  ["Cyrillic", 0x0400, 0x04FF],
  ["Cyrillic Supplement", 0x0500, 0x052F],
  ["General Punctuation", 0x2000, 0x206F],
  ["Currency Symbols", 0x20A0, 0x20CF],
  ["Letterlike Symbols", 0x2100, 0x214F],
  ["Mathematical Operators", 0x2200, 0x22FF],
  ["Miscellaneous Technical", 0x2300, 0x23FF],
  ["Box Drawing", 0x2500, 0x257F],
  ["Block Elements", 0x2580, 0x259F],
  ["Geometric Shapes", 0x25A0, 0x25FF],
  ["Miscellaneous Symbols", 0x2600, 0x26FF],
  ["Dingbats", 0x2700, 0x27BF],
  ["Emoji", 0x1F600, 0x1F64F],
  ["Transport and Map Symbols", 0x1F680, 0x1F6FF]
];

// Character names for common ASCII characters
const commonCharNames: Record<string, string> = {
  ' ': 'SPACE',
  '!': 'EXCLAMATION MARK',
  '"': 'QUOTATION MARK',
  '#': 'NUMBER SIGN',
  '$': 'DOLLAR SIGN',
  '%': 'PERCENT SIGN',
  '&': 'AMPERSAND',
  "'": 'APOSTROPHE',
  '(': 'LEFT PARENTHESIS',
  ')': 'RIGHT PARENTHESIS',
  '*': 'ASTERISK',
  '+': 'PLUS SIGN',
  ',': 'COMMA',
  '-': 'HYPHEN-MINUS',
  '.': 'FULL STOP',
  '/': 'SOLIDUS',
  ':': 'COLON',
  ';': 'SEMICOLON',
  '<': 'LESS-THAN SIGN',
  '=': 'EQUALS SIGN',
  '>': 'GREATER-THAN SIGN',
  '?': 'QUESTION MARK',
  '@': 'COMMERCIAL AT',
  '[': 'LEFT SQUARE BRACKET',
  '\\': 'REVERSE SOLIDUS',
  ']': 'RIGHT SQUARE BRACKET',
  '^': 'CIRCUMFLEX ACCENT',
  '_': 'LOW LINE',
  '`': 'GRAVE ACCENT',
  '{': 'LEFT CURLY BRACKET',
  '|': 'VERTICAL LINE',
  '}': 'RIGHT CURLY BRACKET',
  '~': 'TILDE'
};

const getCharacterBlock = (codePoint: number): string => {
  for (const [name, start, end] of unicodeBlocks) {
    if (codePoint >= start && codePoint <= end) {
      return name;
    }
  }
  return "Unknown";
};

const getCharacterName = (char: string, codePoint: number): string => {
  if (commonCharNames[char]) {
    return commonCharNames[char];
  }
  
  if (codePoint >= 0x0041 && codePoint <= 0x005A) {
    return `LATIN CAPITAL LETTER ${String.fromCodePoint(codePoint)}`;
  } else if (codePoint >= 0x0061 && codePoint <= 0x007A) {
    return `LATIN SMALL LETTER ${String.fromCodePoint(codePoint)}`;
  } else if (codePoint >= 0x0030 && codePoint <= 0x0039) {
    return `DIGIT ${String.fromCodePoint(codePoint)}`;
  }
  
  return "Character name not available";
};

const getCharacterCategory = (char: string): string => {
  const code = char.charCodeAt(0);
  
  if (/^[A-Z]$/.test(char)) return categoryMap["Lu"];
  if (/^[a-z]$/.test(char)) return categoryMap["Ll"];
  if (/^[0-9]$/.test(char)) return categoryMap["Nd"];
  if (/^[!?,.:;'"()\\[\]{}|\\/-]$/.test(char)) return categoryMap["Po"];
  if (/^\s$/.test(char)) return categoryMap["Zs"];
  if (code < 32 || (code >= 127 && code <= 159)) return categoryMap["Cc"];
  
  return "Unknown Category";
};

const getHtmlEntity = (char: string, codePoint: number): string => {
  const namedEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
    ' ': '&nbsp;',
    '¢': '&cent;',
    '£': '&pound;',
    '¥': '&yen;',
    '€': '&euro;',
    '©': '&copy;',
    '®': '&reg;'
  };
  
  if (namedEntities[char]) {
    return namedEntities[char];
  }
  
  return `&#x${codePoint.toString(16).toUpperCase()};`;
};

const getUtf8Binary = (char: string): string => {
  const codePoint = char.codePointAt(0) || 0;
  
  if (codePoint <= 0x7F) {
    // 1 byte: 0xxxxxxx
    return `0${codePoint.toString(2).padStart(7, '0')}`;
  } else if (codePoint <= 0x7FF) {
    // 2 bytes: 110xxxxx 10xxxxxx
    const byte1 = 0xC0 | (codePoint >> 6);
    const byte2 = 0x80 | (codePoint & 0x3F);
    return `${byte1.toString(2).padStart(8, '0')} ${byte2.toString(2).padStart(8, '0')}`;
  } else if (codePoint <= 0xFFFF) {
    // 3 bytes: 1110xxxx 10xxxxxx 10xxxxxx
    const byte1 = 0xE0 | (codePoint >> 12);
    const byte2 = 0x80 | ((codePoint >> 6) & 0x3F);
    const byte3 = 0x80 | (codePoint & 0x3F);
    return `${byte1.toString(2).padStart(8, '0')} ${byte2.toString(2).padStart(8, '0')} ${byte3.toString(2).padStart(8, '0')}`;
  } else {
    // 4 bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    const byte1 = 0xF0 | (codePoint >> 18);
    const byte2 = 0x80 | ((codePoint >> 12) & 0x3F);
    const byte3 = 0x80 | ((codePoint >> 6) & 0x3F);
    const byte4 = 0x80 | (codePoint & 0x3F);
    return `${byte1.toString(2).padStart(8, '0')} ${byte2.toString(2).padStart(8, '0')} ${byte3.toString(2).padStart(8, '0')} ${byte4.toString(2).padStart(8, '0')}`;
  }
};

export interface CharacterInfo {
  char: string;
  codePoint: string;
  name: string;
  block: string;
  category: string;
  htmlEntity: string;
  utf8Binary: string;
  description?: string;
}

export const getCharacterInfo = (char: string): CharacterInfo => {
  const codePoint = char.codePointAt(0) || 0;
  const hexCodePoint = codePoint.toString(16).toUpperCase().padStart(4, '0');
  
  return {
    char,
    codePoint: hexCodePoint,
    name: getCharacterName(char, codePoint),
    block: getCharacterBlock(codePoint),
    category: getCharacterCategory(char),
    htmlEntity: getHtmlEntity(char, codePoint),
    utf8Binary: getUtf8Binary(char),
    description: codePoint < 128 ? `ASCII character (${codePoint})` : undefined
  };
};

export const analyzeText = (text: string): CharacterInfo[] => {
  const result: CharacterInfo[] = [];
  
  for (const char of text) {
    result.push(getCharacterInfo(char));
  }
  
  return result;
};
