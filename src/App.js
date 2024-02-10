import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [currentDoc, setCurrentDoc] = useState('0001');
    const [currentLang, setCurrentLang] = useState('en');
    const [text, setText] = useState('');

    // Function to fetch text based on document number and language
    const fetchText = async (docNumber, lang) => {
        try {
            const url = `https://sw7d.s3.us-east-2.amazonaws.com/nara/T/77/R619/${lang}/${docNumber}-${lang}.txt`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            // Note: 'no-cors' mode can lead to "opaque" responses, which means you cannot read the body
            // If you're not getting the expected text, you will need to handle cors on the server or use a proxy
            const textData = await response.text();
            setText(textData);
        } catch (error) {
            console.error('Fetch error: ', error);
            setText('Failed to load text data.');
        }
    };

    // Effect hook to fetch text when document or language changes
    useEffect(() => {
        fetchText(currentDoc, currentLang);
    }, [currentDoc, currentLang]);

    // Function to handle clicking on an image thumbnail
    const handleThumbnailClick = (docNumber) => {
        setCurrentDoc(docNumber);
    };

    return (
        <div className="container">
            <header className="text-right my-3">Captured German Archives, T77 R 619</header>
            <div className="row">
                <div className="col-md-6">
                    <img
                        className="img-fluid"
                        src={`https://sw7d.s3.us-east-2.amazonaws.com/nara/T/77/R619/images/${currentDoc}.jpg`}
                        alt={`Document ${currentDoc}`}
                    />
                </div>
                <div className="col-md-6">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentLang === 'en' ? 'active' : ''}`}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentLang('en');
                                }}
                            >
                                English
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${currentLang === 'ger' ? 'active' : ''}`}
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentLang('ger');
                                }}
                            >
                                German
                            </a>
                        </li>
                    </ul>
                    <div className="text-display mt-3">
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="image-carousel d-flex overflow-auto">
                        {Array.from({ length: 1061 }, (_, i) => (i + 1).toString().padStart(4, '0'))
                            .map((docNumber) => (
                                <img
                                    key={docNumber}
                                    src={`https://sw7d.s3.us-east-2.amazonaws.com/nara/T/77/R619/images/${docNumber}.jpg`}
                                    alt={`Thumbnail ${docNumber}`}
                                    className="img-thumbnail mx-1"
                                    style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                    onClick={() => handleThumbnailClick(docNumber)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
