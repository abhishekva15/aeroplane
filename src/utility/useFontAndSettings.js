// src/hooks/useFontAndSettings.js
import { useEffect, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { defaultSettings } from '../aviatoranimation/animeSettings';


const useFontAndSettings = (fontName) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [settingsLoaded, setSettingsLoaded] = useState(true); // Default to true since settings are static
    const [settings, setSettings] = useState(defaultSettings);

    useEffect(() => {
        const font = new FontFaceObserver(fontName);
        font.load().then(() => {
            setFontLoaded(true);
            setSettings(true)
            setSettingsLoaded(true)
        }).catch(() => {
            console.error(`Failed to load font: ${fontName}`);
            setFontLoaded(true); 
            setSettings(true)
            setSettingsLoaded(true)
            // Proceed even if font fails to load
        });
    }, [fontName]);

    return { fontLoaded, settingsLoaded, settings };
};

export default useFontAndSettings;
