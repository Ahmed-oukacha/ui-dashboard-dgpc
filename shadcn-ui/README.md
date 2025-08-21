# File Management Dashboard

A professional, multilingual file management dashboard built with React, TypeScript, and Tailwind CSS. This application supports Arabic, French, and English languages with proper RTL/LTR text direction handling.

## 🚀 Features

- **Multi-language Support**: Arabic (RTL), French, and English
- **File Management**: Upload, rename, delete, and organize files in folders
- **Drag & Drop**: Intuitive file upload with drag and drop functionality
- **File Type Support**: PDF, Word documents, Excel sheets, and text files
- **User Management**: View and manage user accounts with roles and permissions
- **Reports & Analytics**: Storage usage charts and activity tracking
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Grid/List Views**: Toggle between different file viewing modes
- **Search & Filter**: Find files and users quickly
- **Context Menus**: Right-click actions for files and folders

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Main header with language switcher
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── modals/
│   │   ├── Modal.tsx           # Base modal component
│   │   ├── NewFolderModal.tsx  # Create new folder modal
│   │   ├── RenameModal.tsx     # Rename items modal
│   │   ├── ConfirmDeleteModal.tsx # Delete confirmation modal
│   │   └── FilePreviewModal.tsx # File preview modal
│   ├── pages/
│   │   ├── DashboardPage.tsx   # Main dashboard view
│   │   ├── ManageFilesPage.tsx # File management interface
│   │   ├── UsersPage.tsx       # User management
│   │   ├── ReportsPage.tsx     # Analytics and reports
│   │   └── PlaceholderPage.tsx # Generic placeholder page
│   └── ui/
│       ├── Icon.tsx            # SVG icon component
│       ├── Toast.tsx           # Toast notifications
│       └── ContextMenu.tsx     # Right-click context menu
├── hooks/
│   ├── useFileManagement.ts    # File operations hook
│   └── useToast.ts             # Toast notifications hook
├── locales/
│   └── translations.ts         # All translation strings
├── types/
│   ├── index.ts                # Main type definitions
│   └── translations.ts         # Translation type definitions
├── utils/
│   └── fileUtils.ts            # File utility functions
├── constants/
│   └── fileTypes.ts            # Allowed file types
└── App.tsx                     # Main application component
```

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **Vite** - Fast build tool and dev server

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd file-management-dashboard
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Build for production:
```bash
pnpm run build
```

5. Run linting:
```bash
pnpm run lint
```

## 🌍 Internationalization

The application supports three languages:

- 🇺🇸 **English** (en) - Left-to-right
- 🇫🇷 **French** (fr) - Left-to-right  
- 🇸🇦 **Arabic** (ar) - Right-to-left

Language switching is available in the header dropdown. The interface automatically adjusts text direction and layout for RTL languages.

## 📁 File Management Features

### Supported File Types
- PDF documents (.pdf)
- Microsoft Word (.doc, .docx)
- Microsoft Excel (.xls, .xlsx)
- Plain text files (.txt)

### File Operations
- **Upload**: Drag & drop or click to select files
- **Create Folders**: Organize files in custom folders
- **Rename**: Edit file and folder names
- **Delete**: Remove files and folders (with confirmation)
- **Preview**: View file information and icons
- **Navigation**: Breadcrumb navigation through folder structure

## 👥 User Management

- View user accounts with profile information
- Role-based permissions (Admin, Editor, Viewer)
- User status tracking (Active, Invited)
- Search and filter users
- User avatar display

## 📊 Reports & Analytics

- Storage usage visualization
- File type distribution charts
- Activity timeline
- Storage capacity tracking
- Interactive charts and graphs

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Automatic theme adaptation
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: WCAG compliant components
- **Toast Notifications**: User feedback for actions
- **Context Menus**: Right-click functionality
- **Grid/List Toggle**: Multiple viewing modes

## 🔧 Development

### Code Organization

- **Components**: Reusable UI components following atomic design
- **Hooks**: Custom React hooks for state management
- **Types**: Comprehensive TypeScript definitions
- **Utils**: Helper functions and utilities
- **Constants**: Application constants and configurations

### Best Practices

- TypeScript strict mode enabled
- ESLint for code quality
- Consistent component structure
- Proper error handling
- Performance optimizations with useMemo and useCallback

## 🚀 Deployment

The application is ready for deployment to any modern hosting platform:

```bash
pnpm run build
```

The built files will be in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.