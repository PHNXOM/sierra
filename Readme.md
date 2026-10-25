# **Sierra** - A Real-Time Multimedia Chat Application

Sierra is a modern, feature-rich chat application built with React Native. It provides a seamless messaging experience with support for text, images, videos, and audio messages. The app also includes a dark mode, real-time typing indicators, and a built-in AI chatbot for enhanced user interaction

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
git clone https://github.com/RaidenOM/sierra.git
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
- StyleSheet and LinearGradient
- React Navigation

### Backend

- Node.js with Express.js
- Socket.io
- Cloudinary with Multer
- FCM (Firebase Cloud Messaging) for push notifications

### Authentication

- JWT
- Bcrypt

### Database

- MongoDB

## Project Structure

```
App.js                  Providers + navigation container
constants/              Colors/themes, API url, socket events, country codes
context/                Global state: Theme, Auth, Socket, Sound, Chat
services/               Everything that talks to the outside world
                        (backend API, socket, contacts, notifications, pickers)
utils/                  Pure helper functions (dates, phone numbers, forms, chat list)
navigation/             Route names, stacks, tabs, header options
components/
  ui/                   Reusable building blocks (Button, Input, Avatar, Card, ...)
  auth/ chat/ media/    Components grouped by feature
  contacts/ profile/
screens/                One folder per feature; each screen only wires things together
  auth/ chats/ contacts/ profile/ settings/ media/
```

How data flows: **screen -> service -> backend**. Screens never build URLs or
headers themselves, and shared state lives in `context/`.
