# Sidebar Navigation Component

## Overview
This directory contains the sidebar navigation components for the application. The sidebar is designed to be responsive, collapsible, and provides navigation links to different sections of the application.

## Components

### Sidebar.jsx
The main sidebar component that renders the navigation menu, user profile, and handles responsive behavior.

**Features:**
- Collapsible sidebar for desktop view
- Mobile-responsive with a slide-out menu
- Active link highlighting
- User profile display
- Smooth transitions and animations

### MainLayout.jsx
A wrapper component that integrates the sidebar with the main content area.

**Features:**
- Conditionally renders the sidebar based on authentication status
- Adjusts the main content area based on sidebar state
- Provides consistent layout across the application

### OnlineUsers.jsx
A component that displays a list of online users, as shown in the design mockup.

## Usage

```jsx
// In your route component
import MainLayout from '../Components/layout/MainLayout';

function YourComponent() {
  return (
    <MainLayout>
      {/* Your page content */}
    </MainLayout>
  );
}
```

## Styling
The sidebar uses a combination of Tailwind CSS classes and custom CSS defined in `Sidebar.css` for styling.

## Responsive Behavior
- **Desktop:** Expandable/collapsible sidebar that stays visible
- **Mobile:** Hidden by default, can be toggled with a button in the top-left corner

## Integration
The sidebar is integrated with the application through the `ApplicationContainer` component, which wraps all routes with the `MainLayout` component.