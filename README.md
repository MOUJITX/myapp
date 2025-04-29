This is a React Native project by MOUJITX.

# Tech

- React Native
- Redux

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

# Build

## For Android

Step 0: clean history build

```bash
rm -rf android/.gradle android/app/build android/app/.cxx
# Also
yarn buildClean
```

Step 1: general build key

```bash
keytool -genkey -v -keystore android/app/my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
# Also
yarn buildKey
```

Step 2: Edit android/gradle.properties

```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=yourpassword
MYAPP_RELEASE_KEY_PASSWORD=yourpassword
```

Step 3: Edit android/app/build.gradle

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

Step 4: Build APK

```bash
yarn build
```

Step 5: Find APK in android/app/build/outputs/apk/release/app-release.apk

# Release

## Release Only

X.Y.Z means {major}.{minor}.{patch}

```bash
# Upgrade major versions
yarn release major
# Upgrade minor version
yarn release minor
# Upgrade patch version
yarn release patch # or
yarn release

# Upgrade pre-release version
yarn release --preRelease alpha
yarn release --preRelease beta
yarn release --preRelease rc
```

## Release and Build

### For Android

```bash
# Upgrade patch version and build
yarn release && yarn build
# Also
yarn rab
```

# environment

```bash
# .env
OSS_ACCESS_KEY=${OSS_ACCESS_KEY}
OSS_SECRET_KEY=${OSS_SECRET_KEY}
OSS_BUCKET=${OSS_BUCKET}

PUB_API_APP_ID=${PUB_API_APP_ID}
PUB_API_APP_SECRET=${PUB_API_APP_SECRET}
```
