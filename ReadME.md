# SyncPAD

## Features :

1. **Real-Time Collaboration:**

- Allows multiple users to edit the same text document simultaneously in real time.

2. **Room-Based Collaboration:**

- Users can create a unique "SyncPAD room" for private or group collaboration.

3. **Shareable Access:**

- A unique link is generated for each SyncPAD, which can be shared with friends or team members to join the same room.

4. **Text Editing Capabilities:**

- Users can write, edit, and format text in real time with live updates visible to all participants.

5. **Collaborative Environment:**

- Designed to foster teamwork by allowing users to brainstorm, edit documents, or take shared notes seamlessly.

6. **Instant Updates:**

- Changes made by one user are instantly reflected for all participants in the room.

## Frontend :

### **Installation**

To get started with this project, you'll need to have **Node.js** and **npm** (or **yarn**) installed.

1. **Clone the Repository**:
   Clone the repository and navigate to the project directory:

```bash
 git clone https://github.com/imranN74/SyncPad.git
 cd client
```

2. **Installing Dependencies**:
   Once you're inside the project directory, install the dependencies by running:

```bash
npm install
```

Or, if you're using **yarn**:

```bash
yarn install
```

3. **Start the app**:
   Run the app locally using the following command:

```bash
npm run dev
```

Or, if you're using **yarn**:

```bash
yarn dev
```

## Backend

1. **Navigate to backend dir** :

```bash
cd backend
```

2. **Installing Dependencies**:
   Once you're inside the project directory, install the dependencies by running:

```bash
npm install
```

Or, if you're using **yarn**:

```bash
yarn install
```

2. **Database Setup** :

- Download prostgreSQL

```bash
psql -U postgres
CREATE DATABASE syncpad;
```

- Migrate Schema

```bash
npx prisma migrate
```

3. **Start the server** :

```bash
npm run dev
```

Or, if you prefer **yarn**:

```bash
yarn dev
```
