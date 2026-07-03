export const getFlagFromCode = (phone: string): string => {
  if (!phone || !phone.startsWith('+')) return '🌍';
  
  // Mapping of common Southern African and Global codes
  const codeMap: { [key: string]: string } = {
    '+265': '🇲🇼', // Malawi
    '+27': '🇿🇦',  // South Africa
    '+260': '🇿🇲', // Zambia
    '+263': '🇿🇼', // Zimbabwe
    '+255': '🇹🇿', // Tanzania
    '+254': '🇰🇪', // Kenya
    '+256': '🇺🇬', // Uganda
    '+250': '🇷🇼', // Rwanda
    '+234': '🇳🇬', // Nigeria
    '+233': '🇬🇭', // Ghana
    '+1': '🇺🇸',   // USA/Canada
    '+44': '🇬🇧',  // UK
    '+86': '🇨🇳',  // China
    '+91': '🇮🇳',  // India
    '+971': '🇦🇪', // UAE
    '+20': '🇪🇬',  // Egypt
  };

  // Check from longest prefix to shortest
  const codes = Object.keys(codeMap).sort((a, b) => b.length - a.length);
  for (const code of codes) {
    if (phone.startsWith(code)) {
      return codeMap[code];
    }
  }

  return '🌐'; // Default for other codes
};
