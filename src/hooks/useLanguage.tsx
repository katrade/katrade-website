import { useState } from 'react';

export default function useLanguage() {
    const [ language , setLanguage ] = useState(true);
    return [ language, setLanguage ];
}