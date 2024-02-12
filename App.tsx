import React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView 
      originWhitelist={['*']}
      source={{ html: `
        <title>Chiai・WaifuOTW</title>
        <base target="_blank">
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#f4b88b">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Chiai from Waifu On The Web">
        <meta property="og:site_name" content="Chat with me!">
        <meta property="og:description" content="Hello world! My name is Chiai, I'm a web-based AI with Natural Language Processing and a Live2D model!">
        <meta property="twitter:image" content="https://sglkc.github.io/waifu-otw/assets/thumbnail.png">
        <script src="scripts/live2d.min.js" defer></script>
        <script src="scripts/live2dcubismcore.min.js" defer></script>
        <link rel="icon" type="image/png" href="favicon.png">
        <link rel="stylesheet" href="style.css">
        <main id="container">
          <div id="live">
            <nav id="menu">
              <a href="https://github.com/sglkc/waifu-otw">
                <img src="assets/github.svg" width="40" height="40">
              </a>
              <button id="help">
                <img src="assets/question.svg" width="40" height="40">
              </button>
              <button id="recognition">
                <img width="40" height="40">
              </button>
              <button id="recognition-lang">EN</button>
            </nav>
          </div>
        </main>
      ` }}
    />
  );
}