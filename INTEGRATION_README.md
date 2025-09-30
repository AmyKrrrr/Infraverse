# Digital Classroom - Quiz/ESRGAN Integration

This document describes the integration of Quiz Generation and ESRGAN Image Enhancement REST client functionality into the Digital Classroom application.

## 🚀 Overview

The integration adds two major features to the existing digital classroom platform:
1. **AI-Powered Quiz Generation**: Generate quizzes using external AI services
2. **ESRGAN Image Enhancement**: Enhance images using Super-Resolution GAN technology

## 🏗 Architecture

### Backend Integration
- **Framework**: Spring Boot 3.2.0 with WebFlux for reactive programming
- **REST Clients**: WebClient for non-blocking HTTP communications
- **Database**: PostgreSQL for storing quizzes and transcripts
- **Fallback Strategy**: Built-in fallback responses when external services are unavailable

### Frontend Integration
- **Framework**: React 19.1.1 with React Router for navigation
- **API Layer**: Centralized API service for backend communication
- **UI Components**: New components for quiz generation and image enhancement
- **Responsive Design**: Mobile-friendly interface with CSS Grid/Flexbox

## 📁 Project Structure

```
D:\PROJECTS\Infra\
├── digital-classroom-api\          # Spring Boot Backend
│   └── src\main\java\com\digitalclassroom\api\
│       ├── config\                 # Configuration classes
│       │   └── WebClientConfig.java
│       ├── client\                 # External service clients
│       │   ├── QuizGeneratorClient.java
│       │   └── ESRGANClient.java
│       ├── dto\                    # Data Transfer Objects
│       │   ├── QuizGenerationRequest.java
│       │   ├── GeneratedQuizResponse.java
│       │   ├── ImageEnhancementRequest.java
│       │   └── ImageEnhancementResponse.java
│       ├── controller\             # Enhanced controllers
│       │   ├── QuizController.java (enhanced)
│       │   └── ImageController.java (enhanced)
│       └── entity\                 # Existing entities
│           ├── Quiz.java
│           └── Transcript.java
└── frontend\                       # React Frontend
    └── src\
        ├── services\               # API service layer
        │   └── api.js
        ├── StuDash\               # Enhanced components
        │   ├── Quizzes.jsx (enhanced)
        │   ├── ImageEnhancer.jsx (new)
        │   └── StuDash.css (enhanced)
        └── Dashboard\
            └── StudentDashboard.jsx (enhanced)
```

## 🔧 Backend Features

### Quiz Generation Service Integration

#### New API Endpoints
```http
POST   /api/quizzes/generate              # Generate quiz using AI
POST   /api/quizzes/generate-and-save     # Generate and save quiz
GET    /api/quizzes/generator/health      # Check AI service health
```

#### Features
- **AI-Powered Generation**: Connect to external quiz generation services
- **Customizable Parameters**: Subject, difficulty, topic, question count, question type
- **Fallback Mechanism**: Provides sample quizzes when service is unavailable
- **Database Integration**: Save generated quizzes to PostgreSQL

### Image Enhancement Service Integration

#### New API Endpoints
```http
POST   /api/images/enhance              # Enhance image file
POST   /api/images/enhance-base64       # Enhance base64 encoded image
GET    /api/images/esrgan/health        # Check ESRGAN service health
GET    /api/images/esrgan/info          # Get service information
```

#### Features
- **ESRGAN Integration**: Super-resolution image enhancement
- **Multiple Scale Factors**: 2x, 4x, 8x enhancement options
- **Quality Settings**: Low, medium, high quality processing
- **Format Support**: PNG, JPG, JPEG image formats
- **Base64 Support**: Direct base64 image processing

### Configuration

#### External Service URLs
```yaml
external:
  services:
    quiz-generator:
      url: ${QUIZ_SERVICE_URL:http://localhost:8081}
      timeout: 30000
    esrgan:
      url: ${ESRGAN_SERVICE_URL:http://localhost:8082}
      timeout: 60000
```

## 🎨 Frontend Features

### Enhanced Quiz Management

#### New Components
- **Quiz Generator Form**: Interactive form for AI quiz generation
- **Generated Quiz Preview**: Preview questions before saving
- **Quiz Grid Display**: Card-based quiz listing with metadata

#### Features
- **Real-time Generation**: Asynchronous quiz generation with loading states
- **Form Validation**: Client-side validation for quiz parameters
- **Error Handling**: User-friendly error messages and retry options
- **Responsive Design**: Works on desktop and mobile devices

### Image Enhancement Tool

#### New Component: ImageEnhancer
- **File Upload Interface**: Drag-and-drop file selection
- **Enhancement Settings**: Scale factor and quality selection
- **Side-by-side Comparison**: Original vs enhanced image display
- **Download Functionality**: Save enhanced images locally

#### Features
- **Real-time Preview**: Immediate image preview after selection
- **Processing Status**: Visual feedback during enhancement
- **Service Information**: Display ESRGAN service capabilities
- **Error Recovery**: Graceful handling of service failures

### API Service Layer

#### Centralized API Management
```javascript
// Example API calls
apiService.generateQuiz(request)
apiService.enhanceImage(file, scaleFactor, quality)
apiService.checkQuizGeneratorHealth()
```

#### Features
- **Singleton Pattern**: Single API service instance across app
- **Error Handling**: Centralized error processing
- **Type Safety**: Consistent request/response handling
- **Environment Configuration**: Configurable API base URL

## 🚀 Getting Started

### Backend Setup

1. **Dependencies**: Added WebFlux and Jackson to pom.xml
2. **Configuration**: Update application.yml with service URLs
3. **Environment Variables**:
   ```bash
   QUIZ_SERVICE_URL=http://your-quiz-service:8081
   ESRGAN_SERVICE_URL=http://your-esrgan-service:8082
   ```

### Frontend Setup

1. **Environment Variables**: Create `.env` file
   ```bash
   VITE_API_BASE_URL=http://localhost:8080
   ```
2. **Dependencies**: All required dependencies are already in package.json
3. **Start Development**: Run `npm run dev`

## 🔗 API Integration Examples

### Generate Quiz
```javascript
const request = {
  subject: "Mathematics",
  difficulty: "MEDIUM",
  topic: "Algebra",
  questionCount: 10,
  questionType: "multiple_choice"
};

const quiz = await apiService.generateQuiz(request);
```

### Enhance Image
```javascript
const file = document.getElementById('upload').files[0];
const enhanced = await apiService.enhanceImage(file, 4, 'high');
```

## 🛡 Error Handling & Fallbacks

### Backend Fallbacks
- **Quiz Generation**: Returns sample quiz when service unavailable
- **Image Enhancement**: Returns original image with error message
- **Health Checks**: Graceful degradation with status indicators

### Frontend Error Handling
- **Network Errors**: User-friendly error messages
- **Loading States**: Visual feedback during processing
- **Retry Mechanisms**: Automatic and manual retry options

## 📊 Performance Considerations

### Backend Optimizations
- **Reactive Programming**: Non-blocking I/O with WebFlux
- **Connection Pooling**: Efficient HTTP client connections
- **Timeout Management**: Configurable timeouts for external services

### Frontend Optimizations
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Efficient image handling and display
- **State Management**: Optimized React state updates

## 🧪 Testing

### Backend Testing
- **Unit Tests**: Service and controller layer testing
- **Integration Tests**: External service client testing
- **Mock Services**: WireMock for service simulation

### Frontend Testing
- **Component Tests**: React component testing
- **API Integration Tests**: Service layer testing
- **E2E Tests**: Full user workflow testing

## 🔒 Security Considerations

- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: File type and size restrictions
- **CORS Configuration**: Proper cross-origin request handling
- **Error Information**: Sanitized error messages to users

## 📈 Monitoring & Health Checks

### Built-in Health Endpoints
- `/api/quizzes/generator/health` - Quiz service status
- `/api/images/esrgan/health` - ESRGAN service status
- `/api/images/health` - Image service status

### Metrics & Logging
- **Request Logging**: All API calls logged
- **Performance Metrics**: Response time tracking
- **Error Tracking**: Comprehensive error logging

## 🔮 Future Enhancements

### Potential Improvements
1. **Real-time Notifications**: WebSocket integration for status updates
2. **Batch Processing**: Multiple image/quiz processing
3. **User Analytics**: Usage tracking and analytics
4. **Caching Layer**: Redis integration for performance
5. **Authentication**: JWT-based user authentication
6. **Rate Limiting**: API rate limiting and throttling

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow existing project conventions
2. **Testing**: Add tests for new features
3. **Documentation**: Update documentation for changes
4. **Error Handling**: Implement proper error handling

### Deployment Notes
1. **Environment Variables**: Configure all required environment variables
2. **Service Dependencies**: Ensure external services are available
3. **Database Migration**: Run database updates if schema changes
4. **Health Checks**: Verify all health endpoints after deployment

---

## 📝 Summary

This integration successfully adds AI-powered quiz generation and ESRGAN image enhancement capabilities to the Digital Classroom platform while maintaining the existing codebase integrity. The solution provides:

- ✅ **Non-breaking Changes**: All existing functionality preserved
- ✅ **Robust Error Handling**: Graceful degradation when services unavailable  
- ✅ **Modern Architecture**: Reactive programming with fallback mechanisms
- ✅ **User-Friendly Interface**: Intuitive UI for new features
- ✅ **Scalable Design**: Easy to extend with additional services

The implementation follows best practices for microservice integration and provides a solid foundation for future enhancements.