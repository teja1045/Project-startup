# DevServices Mobile - React Native App

Modern glassmorphism mobile app for iOS and Android with admin dashboard access.

## 🚀 Features

- ✨ Modern Glassmorphism UI Design
- 📱 Native iOS & Android Support
- 🔐 Admin Authentication & Dashboard
- 💬 Quote Request Form
- 📅 Consultation Booking
- 🎨 Beautiful Animations
- 🌐 API Integration with Backend
- 🔄 Pull-to-Refresh
- 📊 Real-time Stats

## 📋 Prerequisites

- Node.js >= 18
- React Native development environment
- For iOS: Xcode 14+ and CocoaPods
- For Android: Android Studio and Android SDK

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd /app/mobile
yarn install
```

### 2. iOS Setup (Mac only)

```bash
cd ios
pod install
cd ..
```

### 3. Android Setup

No additional setup required. Android dependencies are automatically managed.

## 🏃 Running the App

### iOS

```bash
yarn ios
# or
npx react-native run-ios
```

### Android

```bash
yarn android
# or
npx react-native run-android
```

### Start Metro Bundler

```bash
yarn start
# or
npx react-native start
```

## 🎨 UI Components

### Glass Card
Transparent card with backdrop blur effect
```tsx
import GlassCard from '@/components/GlassCard';

<GlassCard>
  <Text>Content</Text>
</GlassCard>
```

### Glass Button
Modern button with glassmorphism
```tsx
import GlassButton from '@/components/GlassButton';

<GlassButton
  title=\"Click Me\"
  onPress={handlePress}
  variant=\"primary\" // or \"outline\"
/>
```

### Glass Input
Input field with glass effect
```tsx
import GlassInput from '@/components/GlassInput';

<GlassInput
  label=\"Name\"
  value={value}
  onChangeText={setValue}
  placeholder=\"Enter name\"
/>
```

## 📱 Screens

1. **Home Screen** - Landing page with services showcase
2. **Quote Screen** - Request quote form
3. **Consultation Screen** - Book consultation form
4. **Admin Login** - Password-protected admin access
5. **Admin Dashboard** - Manage quotes and consultations

## 🔧 Configuration

### Backend URL

Update the API URL in `src/services/api.ts`:

```typescript
const API_URL = 'https://your-backend-url.com/api';
```

### Admin Password

Default password: `admin123`

Change in backend `.env` file:
```
ADMIN_PASSWORD=your-secure-password
```

## 📦 Build for Production

### iOS

```bash
# Create release build
yarn ios --configuration Release

# For App Store
# Open ios/DevServicesMobile.xcworkspace in Xcode
# Product > Archive
```

### Android

```bash
# Create release APK
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk

# Create AAB for Play Store
./gradlew bundleRelease
```

## 🎯 Key Features

### Glassmorphism Design
- Transparent cards with backdrop blur
- Subtle gradients and glows
- Smooth animations
- Modern color palette (Indigo/Violet)

### Admin Features
- View all quotes and consultations
- Approve/Reject requests
- Real-time stats
- Secure authentication with JWT

### User Experience
- Pull-to-refresh
- Loading states
- Error handling
- Form validation
- Native navigation

## 🔐 Security

- JWT token authentication
- Secure storage with AsyncStorage
- Token expiration handling
- Protected admin routes

## 📝 API Integration

All API calls are centralized in `src/services/api.ts`:

- `authAPI` - Login, logout, authentication
- `quotesAPI` - Quote CRUD operations
- `consultationsAPI` - Consultation CRUD operations
- `statsAPI` - Dashboard statistics

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
yarn start --reset-cache
```

### iOS Build Issues
```bash
cd ios
pod deintegrate
pod install
```

### Android Build Issues
```bash
cd android
./gradlew clean
```

## 📄 License

Private - DevServices Mobile App

## 🚀 Deployment

### iOS App Store
1. Configure signing in Xcode
2. Archive the app
3. Upload to App Store Connect
4. Submit for review

### Google Play Store
1. Generate signed AAB
2. Upload to Play Console
3. Create store listing
4. Submit for review

---

Built with ❤️ using React Native & Modern Design Principles
