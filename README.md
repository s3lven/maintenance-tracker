# Maintenance Tracking System

## Overview
Create a simple maintenance tracking system that allows technicians to log maintenance activities on equipment and visualize basic maintenance metrics.

## Setup Instructions

### Prerequisites
- Node.js (version 20+)
- npm (version 10+)

### Installation steps
1. Clone the repository:
    ```bash
    git clone https://github.com/s3lven/maintenance-tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd maintenance-tracker
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### How to run the application
```bash
npm run dev
```

### How to run tests
```bash
npm run test:e2e
```

## Features Implementation

### List of completed features
- Equipment and Maintenance Forms
  - Uses Server Actions and useFormState for form handling.
  - Zod validation in Server Actions.
- Equipment Table
  - Displays all fields from schema.
  - Status-based row coloring.
  - Global filtering (Search Bar).
  - Filter by department and status outside of table.
  - Sort by ascending and descending.
  - Bulk Edit Status through checkbox select
- Maintenance Records Table
  - Displays all fields from schema.
  - Selects equipment from equipment table.
  - Global filtering (Search Bar).
  - Filter by maintenance date range, type, status, and priority inside of table.
  - Sort by ascending and descending.
  - Grouping by equipment name into consolidated rows,
  - Expand rows from equipment name to view maintenance records of specific equipment.
- Dashboard
  - Pie chart for equipment status breakdown
  - Bar chart for maintenance hours by department (from equipments table)
  - Recent Maintenance Log from 5 most recent logs submitted

## Testing Approach

### Testing strategy
- End-to-end tests 

### What is tested
- Forms: Ensures correct rendering, validation (browser-side and server-side), and keeping inputs on invalid submissions.
- Tables: Ensures correct rendering (data, no data, filtered data), ensures bulk status makes correct edits to affected rows.`

## Technical Decisions

### Key libraries used and why
- React and TailwindCSS: For building the user interface
- Next.js: For Server Actions (data fetching and modification)
- Tanstack Table: For creating full-featured tables
- Recharts: For creating chart visualizations
- Zod: For server-side validation (with Server Actions)

### Architecture decisions
- Component-based architecture for reusability (form inputs)
- Data fetching and modification through Server Actions
- Separated features and components by entity (equipment, maintenance record, dashboard)
- Data is stored server side in server actions (for simplicity)

### State management approach
- Used useState for tracking table states (sorting, grouping, filtering)

## Known Issues/Limitations

### Current bugs or limitations
- Cannot mock server actions. Filtering cannot be accurately tested because data gets changed from form testing and does not get reset to original, consistent data. 


### Future improvements
- Routing: Dashboard as homepage, equipment table and form as another page, and maintenance table and form as last page. Navigated through Navbar. 
- User Experience: Improve responsiveness of charts and tables, hover states, and loading states for asynchronous operations.