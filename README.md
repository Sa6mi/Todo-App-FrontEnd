# Todo App - Modern React Task Management

Todo App is a comprehensive task management application built with React, TypeScript, and Redux. It offers an intuitive interface for managing tasks, tracking progress, and visualizing productivity metrics.

## Features

### Dashboard
- **Task Statistics** - At-a-glance view of tasks by status (Not Started, In Progress, Completed)
- **Timeline View** - Chronological display of upcoming deadlines
- **Priority Distribution** - Interactive donut chart showing task breakdown by priority
- **Progress Tracking** - Visual progress bars for overall task completion
- **Overdue Detection** - Automatic highlighting of tasks past their deadlines with time remaining indicators

### Task Management
- **Multi-view Task List** - Organized view of all tasks with details
- **Priority System** - Color-coded priority levels (Extreme, Moderate, Low)
- **Status Tracking** - Follow tasks through their lifecycle (Not Started, In Progress, Completed)
- **Quick Actions** - Edit and delete tasks from the list view
- **Task Details** - View comprehensive task information including description and metadata

### Task Creation & Editing
- **Intuitive Forms** - User-friendly interface for adding task information
- **Deadline Management** - Calendar selection for setting due dates
- **Priority Assignment** - Simple selection of task importance
- **Rich Text Description** - Add detailed context to tasks
- **Image Attachments** - Upload images to provide visual context ( Not Implemented Yet )

### User Experience
- **Responsive Design** - Works seamlessly across desktop and tablet devices
- **Animations** - Smooth transitions and interactions throughout the interface
- **Interactive Elements** - Hover effects and visual feedback on actions
- **Snackbar Notifications** - Informative feedback on all user actions

### Account Management
- **User Authentication** - Secure login and registration system
- **Account Settings** - Update personal information (name, profile details)
- **Security Settings** - Password management with validation

### Visual Design
- **Clean Interface** - Minimalist, distraction-free design
- **Color Coding** - Visual indicators of task priority and status
- **Consistent Typography** - Readable text hierarchy throughout the application

## Technologies Used

- **Frontend**
  - React 19+ with Functional Components and Hooks
  - TypeScript for type safety
  - Redux Toolkit for state management
  - React Router for navigation
  - SCSS for advanced styling
  - Lucide React for consistent iconography

- **Developer Experience**
  - ESLint for code quality
  - Prettier for code formatting
  - React Developer Tools for debugging

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/taskflow.git

# Navigate to project directory
cd taskflow/frontend

# Install dependencies
npm install

# Start the development server
npm start
```
## Usage Guide
** Getting Started **
Register a new account or login with existing credentials
The dashboard will show your task overview and upcoming deadlines
Use the navigation menu to access different sections of the application
Managing Tasks
View Tasks: Navigate to the "All Tasks" section
Create Task: Click the "Add Task" button and fill the form
Edit Task: Click the edit icon on any task to modify its details
Delete Task: Use the trash icon to remove a task
Change Status: Update progress through the status dropdown
Tracking Progress
The dashboard displays your overall task completion rate
Use the priority distribution chart to balance your workload
Monitor upcoming deadlines through the timeline view
Account Settings
Access your profile settings through the settings icon
Update your personal information in the Personal Information section
Change your password in the Security section

frontend/
├── public/              # Static files
├── src/
│   ├── Components/      # React components
│   │   ├── Modals/      # Modal dialogs (Add, Edit, Progress)
│   │   ├── Routes/      # Page components (Dashboard, Tasks, Settings)
│   │   └── Common/      # Reusable UI components
│   ├── Store/           # Redux store configuration
│   │   └── Slices/      # Redux state slices
│   ├── Services/        # API and utility services
│   └── Assets/          # Images, icons and other static assets
└── package.json         # Project dependencies and scripts

