# DataFlow Dashboard

## Current State
Single-page React app with a sidebar that has navigation links (Dashboard, Customers, Transactions, Settings) that are purely visual — clicking them does nothing. All content is on one page.

## Requested Changes (Diff)

### Add
- Active page state management (which nav item is selected)
- Customers page: table of customer data with name, email, status, join date
- Transactions page: full transactions list with filters for status
- Settings page: profile settings form (name, email, notifications toggles)

### Modify
- Sidebar nav items: clicking them switches the active page and updates the highlighted item
- Header title: updates to reflect current page name
- Main content area: renders the correct page based on active nav item

### Remove
- Nothing removed

## Implementation Plan
1. Add `activePage` state to App component (`'dashboard' | 'customers' | 'transactions' | 'settings'`)
2. Pass `activePage` and `setActivePage` to Sidebar so nav items update state on click
3. Create CustomersPage component with mock customer data table
4. Create TransactionsPage component with full transaction list and status filter tabs
5. Create SettingsPage component with profile form and notification toggles
6. Conditionally render page components in main content area based on `activePage`
7. Update header title to reflect current page
