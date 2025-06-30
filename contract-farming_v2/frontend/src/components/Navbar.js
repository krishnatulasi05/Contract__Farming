import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../utils/logout';


// Descriptions for links
const descriptions = {
  "/dashboard": "This link takes you to the dashboard where you can view your activity and statistics.",
  "/contract": "This link leads to the contracts section where you can manage your contracts.",
  "/create-contract": "This link allows you to create a new contract.",
  "/login": "This link redirects to the login page.",
  "/register": "This link takes you to the registration page.",
  "logout": "This button logs you out of your account."
};

const Navbar = () => {
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi'); // Default language: Hindi

  const toggleTTS = () => {
    setIsTTSEnabled(!isTTSEnabled);
  };

  const translateWithChatGPT = async (text, targetLanguage) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Access API key from environment variables
    const prompt = `Translate the following text to ${targetLanguage}: "${text}"`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          max_tokens: 60
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error translating text with ChatGPT:', error);
      return text; // Fallback to original text if translation fails
    }
  };

  const speakDescription = (text) => {
    if (isTTSEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const handleMouseEnter = async (e, description) => {
    const languageMapping = {
      'hi': 'Hindi',
      'bn': 'Bengali',
      'gu': 'Gujarati',
      'or': 'Odia'
    };
    const translatedText = await translateWithChatGPT(description, languageMapping[selectedLanguage]);
    speakDescription(translatedText);
  };

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard" onMouseEnter={(e) => handleMouseEnter(e, descriptions["/dashboard"])}>Dashboard</Link></li>
        <li><Link to="/contract" onMouseEnter={(e) => handleMouseEnter(e, descriptions["/contract"])}>Contracts</Link></li>
        <li><Link to="/create-contract" onMouseEnter={(e) => handleMouseEnter(e, descriptions["/create-contract"])}>Create Contract</Link></li>
        <li><Link to="/login" onMouseEnter={(e) => handleMouseEnter(e, descriptions["/login"])}>Login</Link></li>
        <li><Link to="/register" onMouseEnter={(e) => handleMouseEnter(e, descriptions["/register"])}>Register</Link></li>
        <li><button onMouseEnter={(e) => handleMouseEnter(e, descriptions["logout"])} onClick={logout}>Logout</button></li>
        <li>
          <label>
            <input type="checkbox" checked={isTTSEnabled} onChange={toggleTTS} />
            Enable TTS
          </label>
        </li>
        <li>
          <label>
            Select Language: 
            <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option value="or">Odia</option>
              <option value="bn">Bengali</option>
              <option value="gu">Gujarati</option>
              <option value="hi">Hindi</option>
            </select>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
