This is a React Native project by MOUJITX.

# Tech

- React Native
- Redux

# Version

- 0.0.1 init project
- 0.1.20241224 add first page

# Todo

- [x] INIT main page
- [ ] RECORD train ticket
- [ ] RECORD id/credit/... card
- [x] RECORD food shelf life
- [x] RECORD medicine shelf life

# issue

- [ ] Some components under the bottom navigation bar after setting the statusBar to translucent.
- [x] Go back gesture can't be used in the bottomSheet to close it.
- [ ] SVG support failed. (branch: `feat/202502091752-svg-support`)
- [ ] First bottomSheet will be closed when the second bottomSheet is opened.
- [x] Swipe another swipeable view after swiping the first one, the first one can not close automatic.

# Folder Structure

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
