# Gamgee

A Chrome browser extension that transcribes audio from your browser tab and microphone using Deepgram's Speech Recognition API. The extension appears as a sidebar on the right side of your browser window.

![Screenshot showing a webpage with a video and a sidebar extension on the right. It has an options button, and buttons to start, stop and clear transcription. Below that are a couple of sentences which were spoken in the video.](./screenshot.png)

## Setup

### Development Setup
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start both webpack and the Tailwind compiler in watch mode
4. Open [chrome://extensions/](chrome://extensions/) from your address bar
5. Turn on developer mode in the top right
6. Click "Load unpacked", and select the `dist` directory

### Development Workflow
1. Make changes to files in the `src` directory
2. Keep `npm run dev` running to automatically compile changes
3. Go to [chrome://extensions/](chrome://extensions/)
4. Find the "Gamgee" extension card
5. Click the circular refresh/reload icon (🔄) on the extension card
6. Your changes will now be available in the extension

Note: You'll need to reload the extension (step 5) whenever you make changes to the code. If you're modifying the sidebar or options pages, you'll also need to close and reopen them to see your changes.

### Build for Production
Run `npm run build` to create a production build in the `dist` directory.

## Usage

1. Click the extension icon in your browser toolbar to open the sidebar
2. Enter a [Deepgram API Key](https://console.deepgram.com/signup?jump=keys) in the options page
3. On the tab you want to transcribe audio from, click "Start transcription" and select the tab - you must share both tab audio and microphone access for this extension to work
4. The transcript will appear in the sidebar in real-time as audio is transcribed

## Code Structure

### Build System
The project uses webpack to bundle JavaScript and React components, and Tailwind CSS for styling. The build process:
- Compiles React JSX files
- Processes CSS with Tailwind
- Bundles all JavaScript
- Copies static assets to the dist folder

### `manifest.json`
The manifest file is required for Chrome extensions. The provided `permissions` allow for storage (of transcripts and your API Key), access to tab data, the ability to execute our transcription script, and the sidebar functionality. The `host_permissions` allow for this extension to run on any URL - you can change it if you want to limit its usage to only specific websites.

### React Components

#### `components/Sidebar.jsx`
The main React component for the sidebar interface. It handles:
- Displaying and updating the transcript
- Starting and stopping transcription
- Clearing the transcript
- Opening the options page
- Managing Chrome extension messaging and storage

The component uses Tailwind CSS for styling, providing a modern and responsive interface.

### `sidebar.html` and `sidebar.js`
The sidebar entry points that load the React application. The HTML file provides the root element and loads the necessary styles and scripts, while the JS file initializes the React application.

### `styles.css`
Contains the Tailwind CSS directives that are compiled into the final CSS used by the application.

### `options.html` and `options.js`
The options pane gets and displays the existing Deepgram API key from storage, if it exists. It can also be used to save a new key.

### `content-script.js`
This script is executed when the user clicks the start button in the sidebar.

The script retrieves the Deepgram API Key from storage (set in the options pane), and asks the user to select a tab to share. If audio is not shared as part of this, the script will not continue.

The script also requests microphone access, and both the tab audio and microphone input are mixed into a single audio source for transcription.

The transcription then takes place every 250ms using Deepgram's Speech Recognition API, and as transcripts are returned, they are saved into storage, and a `transcriptavailable` message is sent to the sidebar, prompting it to update the displayed value.

When the stop message is sent from the sidebar, the transcription session is closed.
