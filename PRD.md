# Gamgee Meeting Assistant - Product Requirements Document

## Overview
Gamgee is a Chrome extension that provides real-time meeting intelligence through a sidebar interface. It helps users achieve their meeting goals by providing live transcription, contextual conversation suggestions, and meeting analytics.

## Core Features

### Meeting Management
- Sidebar interface accessible via Chrome extension icon
- Meeting header displaying:
  - Customizable meeting title (with smart defaults)
  - Current date and time
  - Options dropdown (API keys configuration)
  - Record/Stop recording button
- Meeting goal input field for free-text entry

### Live Transcription
- Real-time audio transcription using Deepgram API
- Speaker segmentation
- Transcript displayed chronologically below meeting goal
- Auto-scroll with new content
- Clear visual hierarchy between speakers

### Conversation Intelligence
- Dynamic generation of 3-5 "Interesting Avenues" based on:
  - Current meeting transcript
  - Stated meeting goal
  - Meeting context
- Each avenue presented as an actionable button
- Clicking an avenue creates a "provocation" in the transcript
- Provocations show sample questions on hover
- Uses OpenAI API for conversation analysis

### User Interface
- Clean, minimal design
- Top third: Meeting controls and goal
- Middle third: Live transcript
- Bottom third: Interesting avenues
- Clear visual distinction between sections

## Technical Requirements

### APIs
- Deepgram API for transcription
- OpenAI API for conversation intelligence
- Chrome Extension APIs for:
  - Audio capture
  - Sidebar rendering
  - Storage
  - Tab management

### Data Management
- Local storage for:
  - API keys
  - Meeting transcripts
  - Meeting goals
  - User preferences
- No server-side storage required

### Performance
- Real-time transcription with < 1s latency
- Conversation suggestions updated every 30s
- Smooth scrolling and rendering of long transcripts

## User Flow

1. **Meeting Setup**
   - Open Chrome extension
   - Verify/enter API keys if needed
   - Set meeting goal
   - Click record

2. **During Meeting**
   - View live transcript
   - Monitor interesting avenues
   - Click avenues to create provocations
   - Hover on provocations for question suggestions

3. **Post Meeting**
   - Stop recording
   - Review transcript
   - Export/save if needed (future feature)

## Future Features

### Analytics
- Speaker balance analysis
- Talk-time distribution
- Topic coverage
- Meeting effectiveness metrics

### Enhanced Intelligence
- Pre-meeting agenda analysis
- Post-meeting summary
- Action item extraction
- Follow-up suggestions

### Collaboration
- Shared meeting spaces
- Team insights
- Meeting templates
- Best practices library

## Success Metrics
- Meeting goal achievement rate
- Provocation usage rate
- Avenue relevance (via user feedback)
- Transcript accuracy
- User retention 