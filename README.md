# Little Lemon Restaurant Mobile App with react-native

Little Lemon is a fully functional mobile application designed for a fictional restaurant. This project is part of my portfolio and showcases features like user authentication, dynamic data synchronization, offline capabilities, and more. The app has been built using **React Native** and **Expo CLI**.

## Features
1. **Welcome Screen**
   - Displays a welcome message.

2. **Sign-Up Screen**
   - Fields: Name, Email, and Password.
   - Allows users to create an account.

3. **Login Screen**
   - Fields: Email and Password.
   - Enables users to log in to the app.

4. **Home Screen**
   - **Hero Section**: Includes a working search field.
   - **Section List**:
     - Dynamically fetches food items from an online JSON file.
     - Stores fetched data in a local SQL database.
     - Works offline by utilizing the locally stored data.
     - Detects changes in the JSON file and updates the local database accordingly.

5. **Profile Screen**
   - Features:
     - Working **image picker** for avatar upload, saved using **AsyncStorage**.
     - Editable fields: Name, Email, and Phone Number.
     - Notification settings via picker switches.
     - **Save and Continue** button to store changes.
     - **Logout** button for user session management.
     - **Discard All Saved User Details** button to clear profile data.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/saaqi/restaurant-mobile-app-react-native.git
cd restaurant-mobile-app-react-native
bun install expo
bun start
```

### Build Your Own Version
To build your custom app you will need to install EAS CLI globally:
```bash
bun install -g eas-cli
eas build:configure
eas login
eas build --profile preview --platform android
```


## Technical Highlights

### Offline Capability:
The app stores data locally using an SQL database, enabling offline access.
Changes in the online JSON file are detected, and the database is updated seamlessly.

### Dynamic Avatar:
The profile screen allows users to upload a profile picture using an image picker. The data is stored locally using AsyncStorage.

### Modern UI:
Developed using React Native and styled with a clean and intuitive design.


## Tools and Technologies:
- React Native
- Expo CLI
- Bun (for faster package management)
- EAS CLI (for build management)
- AsyncStorage (for persistent data storage)
- SQLite (for offline database)


## Color scheme, #1A1A19, #31511E, #859F3D, #F6FCDF
![Color Scheme Used in the project](/assets/Color_Palette.png "Color Scheme Used in the project.")

##   Screen Shots
![Welcome Screen](/assets/1-Welcome.jpg "Welcome Screen.")
![Signup Screen](/assets/2-Signup.jpg "Signup Screen.")
![Login Screen](/assets/3-Login.jpg "Login Screen.")
![Home Screen](/assets/4-Home.jpg "Home Screen.")
![Profile Screen](/assets/5-Profile.jpg "Profile Screen.")


## Credits

This Repository is created and maintained by [Saqib Islam](https://saqibtech.com "Saqib Islam - UI/UX Designer & Fullstack Developer.").

## License

This Repository is licensed under the MIT License. You are free to use, modify, and distribute this template for personal or commercial purposes as long as you include the original license in your distribution.
