# React Native Authentication App (Expo)

A simple **authentication flow** built with **React Native (Expo)**, **React Context API**, and **React Navigation**.  
It demonstrates login, signup, logout, and session persistence using AsyncStorage.

---

## ✨ Features

- **Auth Context (Context API)**
  - `login(email, password)`
  - `signup(name, email, password)`
  - `logout()`
  - `user` state (stores current user info)
- **Screens**
  - **Login**
    - Email + Password inputs
    - Validations: invalid email, invalid password format (min 6), incorrect credentials
    - "Go to Signup" navigation
  - **Signup**
    - Name + Email + Password inputs
    - Validations: missing fields, invalid email, password length < 6
    - "Go to Login" navigation
  - **Home**
    - Displays logged-in user’s name and email
    - "Logout" button
- **Persist Auth (Optional)**
  - `AsyncStorage` keeps user logged in across app restarts
- **Navigation**
  - `@react-navigation/native` stack navigator
- **UI**
  - Clean inputs and buttons
  - Inline error messages
  - Password visibility toggle (eye icon)

---


- **AuthContext.js** → Provides `login`, `signup`, `logout`, and `user` with persistence.
- **RootNavigator.js** → Decides between Auth flow (Login/Signup) or Home.
- **Screens** → UI and form validation for login, signup, and home.
- **TextField.js** → Input component with error state and password eye toggle.
- **validation.js** → Simple email validator.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS)
- npm / yarn
- Expo CLI (bundled via `npx`)
- For device testing: **Expo Go** (iOS/Android app)

### Setup Instructions

```bash
# 1) Create an Expo project (if you don’t already have one)
npx create-expo-app rn-auth-app
cd rn-auth-app

# 2) Install dependencies
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install expo-vector-icons

# 3) Copy project files
# Copy /src folder and App.js into this project

# 4) Start project
npm run start
# Then press: a (Android), i (iOS on Mac), or w (Web)

🔐 Demo Authentication

    1. Login → Accepts any email with password secret123

    2. Signup → Saves user locally and logs you in immediately

    3. No backend included yet → AuthContext contains mock logic

🛠 Tech Stack

    1. React Native (Expo)

    2. React Navigation (Native Stack)

    3. React Context API

    4. AsyncStorage

    5. expo-vector-icons (eye icon for password toggle)

✅ Requirement Coverage

    1. Auth Context → AuthContext.js (login, signup, logout, user state)

    2. Login screen → Email/Password inputs, validation, incorrect creds error, “Go to Signup”

    3. Signup screen → Name/Email/Password inputs, validation, “Go to Login”

    4. Home screen → Displays name/email, logout

    5. Persist auth → AsyncStorage implemented

    6. Navigation → React Navigation stack

    7. UI → Styled fields, inline errors, password eye toggle