# woom Research Assistant - Local Development Setup

This guide will help you set up and run the woom Research Assistant locally for development and testing.

## 🚀 Quick Start

1. **Configure API Keys** (Required)
2. **Run the startup script**

```bash
./start_dev.sh
```

That's it! The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## 📋 Prerequisites

- Python 3.8+ 
- Node.js 16+ and npm
- API Keys (see Configuration section)

## ⚙️ Configuration

### 1. API Keys Setup

Edit `PromptEngineering/API_KEY.py` and add your API keys:

```python
# Google Gemini API Key
# Get from: https://makersuite.google.com/app/apikey
API_KEY = "your_google_gemini_api_key_here"

# ElevenLabs API Key  
# Get from: https://elevenlabs.io/app/settings/api-keys
ELEVENLABS_API_KEY = "your_elevenlabs_api_key_here"

# Google Cloud Speech API Key (optional, for Hindi speech recognition)
# Get from: https://console.cloud.google.com/iam-admin/serviceaccounts
GOOGLE_CLOUD_CREDENTIALS_PATH = "path_to_your_service_account_key.json"
```

### 2. Required API Keys

- **Google Gemini API**: For AI text generation and analysis
- **ElevenLabs API**: For text-to-speech and speech-to-text functionality

## 🛠️ Manual Setup (Alternative)

If you prefer to start the servers manually:

### Backend Server
```bash
cd PromptEngineering
python3 -m pip install -r requirements.txt
python3 app.py
```

### Frontend Server
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
woom-main/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── lang/           # Language support
│   └── package.json
├── PromptEngineering/       # Flask backend
│   ├── app.py              # Main Flask application
│   ├── rag.py              # RAG (Retrieval Augmented Generation)
│   ├── requirements.txt    # Python dependencies
│   └── API_KEY.py          # API keys configuration
└── start_dev.sh            # Development startup script
```

## 🔧 Features

- **PDF Research Paper Analysis**: Upload and analyze research papers
- **AI-Powered Q&A**: Ask questions about the loaded paper
- **Voice Interaction**: Speak questions and get audio responses
- **Multilingual Support**: English and Hindi language support
- **Mind Map Generation**: Visual representation of paper content
- **ArXiv Search**: Search and load papers from ArXiv

## 🐛 Troubleshooting

### Backend Issues
- Ensure Python dependencies are installed: `pip install -r requirements.txt`
- Check API keys are properly configured
- Verify port 5001 is available

### Frontend Issues
- Ensure Node.js dependencies are installed: `npm install`
- Check port 3000 is available
- Clear browser cache if needed

### Common Issues
1. **API Key Errors**: Make sure all required API keys are configured
2. **Port Conflicts**: Change ports in the respective configuration files
3. **CORS Issues**: The backend is configured to allow CORS from localhost:3000

## 📝 Development Notes

- Backend runs on Flask with CORS enabled
- Frontend uses Create React App
- PDF processing uses PyMuPDF and pdfplumber
- Vector database uses ChromaDB
- AI models: Google Gemini for text generation

## 🎯 Testing the Application

1. Open http://localhost:3000 in your browser
2. Search for a research paper using ArXiv search
3. Load a PDF and try the various features:
   - Ask questions about the paper
   - Use voice interaction
   - Generate mind maps
   - Highlight text for analysis

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all API keys are correctly configured
3. Ensure all dependencies are installed
4. Check that both servers are running on the correct ports

