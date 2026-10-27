# **Sierra** - A Real-Time Multimedia Chat Application

Sierra is a modern, feature-rich chat application built with React Native. It provides a seamless messaging experience with support for text, images, videos, and audio messages. The app also includes a dark mode, real-time typing indicators.

## Features

- **Real-time Messaging**: Send and receive messages instantly with real-time updates.

- **Multimedia Support**: Share images, videos, and audio files within chats.

- **Dark Mode**: Switch between light and dark themes for a personalized experience.

- **Typing Indicators**: See when the other person is typing.

- **Push Notifications**: Get notified when a new message arrives.

- **User Profiles**: View and edit user profiles with profile pictures and bios.

- **Chat Management**: Delete chats and manage conversations easily.

- **Emoji Support**: Use emojis to express yourself in chats.

## Installation

- Make sure to have **AVD (Android Virtual Device) / iOS Simulator** installed or physical device with **Expo Go** connected
- To run **Sierra** locally follow these steps

1. **Clone the repository**:

```bash
git clone https://github.com/PHNXOM/sierra.git
cd sierra
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the app**:

```bash
npm start
```

## Tech Stack

### Frontend

- React Native with Expo
- React Native Paper for Material UI
- React Navigation

### Backend

- Spring Boot
- WebSocket (STOMP protocol)
- Cloudinary
- FCM (Firebase Cloud Messaging) for push notifications

### Authentication

- Spring Security
- JWT
- Bcrypt

### Database

- MySQL
