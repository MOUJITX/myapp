This is a React Native project by MOUJITX.

# Tech

- React Native
- Redux

# Version

- 0.0.1 init project
- 0.1.20241224 add first page

# Todo

- [x] INIT main page
- [x] RECORD train ticket
- [ ] RECORD id/credit/... card
- [x] RECORD food shelf life
- [x] RECORD medicine shelf life

# issue

- [x] Some components under the bottom navigation bar after setting the statusBar to translucent.
- [x] Go back gesture can't be used in the bottomSheet to close it.
- [ ] SVG support failed. (branch: `feat/202502091752-svg-support`)
- [ ] First bottomSheet will be closed when the second bottomSheet is opened.
- [x] Swipe another swipeable view after swiping the first one, the first one can not close automatic.

<!-- # Folder Structure

```
App
├── userProfile
    ├── loginScreen
    └── userInfoScreen
├── expireReminder
    ├── reminderAddScreen
    ├── reminderListScreen
        ├── totalList
        └── filterList
    └── reminderDetailScreen
├── travelTicket
    ├── ticketListScreen
    └── ticketDetailScreen
└── ...
``` -->

# Package

```bash
# dev
com.moujitx.myapp.dev
# prod
com.moujitx.myapp
```

# Start

```bash
# Step 0: Install dependencies
yarn install

# Step 1: Start Metro Server
yarn start

# Step 2: Start Application
yarn android # For Android
yarn ios     # For iOS
```

# Release

## For Android

Step 0: general release key

```bash
keytool -genkey -v -keystore android/app/my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Step 1: Edit android/gradle.properties

```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=yourpassword
MYAPP_RELEASE_KEY_PASSWORD=yourpassword
```

Step 2: Edit android/app/build.gradle

```java
android {
    // ... existing code ...
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            // ... existing code ...
            signingConfig signingConfigs.release
        }
    }
}
// ... existing code ...
```

Step 3: Build APK

```bash
yarn release
```

Step 4: Find APK in android/app/build/outputs/apk/release/app-release.apk
