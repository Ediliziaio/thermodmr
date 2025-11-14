# RLS Policy Test Suite Documentation

## Overview

The RLS (Row Level Security) Test Suite is a comprehensive testing tool that verifies access control policies across all database tables for different user roles. It ensures that users can only access data they're authorized to see.

## Accessing the Test Suite

1. **Authentication Required**: You must be logged in as a `super_admin` user
2. **Navigation**: Click on "RLS Test" in the sidebar menu
3. **Route**: `/rls-test`

## What Gets Tested

The test suite validates access permissions across:

### User Roles
- `super_admin` - Full system access
- `commerciale` - Sales representative access
- `rivenditore` - Dealer/reseller access

### Database Tables
1. **profiles** - User profile information
2. **user_roles** - User role assignments
3. **dealers** - Dealer/reseller information
4. **orders** - Order records
5. **order_lines** - Order line items
6. **payments** - Payment transactions
7. **clients** - End customer information
8. **attachments** - Order attachments and files
9. **commissions** - Commission calculations

## Test Process

When you run the test suite, it performs the following steps:

1. **Creates Test Users**: Generates temporary users for each role with unique email addresses
2. **Creates Test Data**: Sets up sample dealers, orders, and related records
3. **Runs Access Tests**: For each role, attempts to access each table and verifies the expected behavior
4. **Reports Results**: Displays pass/fail status for each test
5. **Cleanup**: Automatically removes all test users and data

## Expected Behavior

### Super Admin
- ✅ Can view and manage ALL records across ALL tables
- ✅ No access restrictions

### Commerciale (Sales Rep)
- ✅ Can view their own profile
- ✅ Can view their own role
- ✅ Can view and manage dealers assigned to them
- ✅ Can view orders for their dealers
- ✅ Can view order lines for accessible orders
- ✅ Can view payments for accessible orders
- ✅ Can view clients for their dealers
- ✅ Can view attachments for their orders
- ✅ Can view their own commissions
- ❌ Cannot view other commerciali's data

### Rivenditore (Dealer)
- ✅ Can view their own profile
- ✅ Can view their own role
- ❌ Cannot view dealers table
- ✅ Can view orders they created
- ✅ Can view order lines for their orders
- ✅ Can view payments for their orders
- ✅ Can view clients for accessible dealers
- ✅ Can view attachments for their orders
- ❌ Cannot view commissions

## Test Results

Each test displays:
- **Status Badge**: PASS (green), FAIL (red), or SKIP (yellow)
- **Icon**: Visual indicator of test status
- **Test Name**: Description of what's being tested
- **Table**: Which database table is being tested
- **Role**: Which user role is being tested
- **Message**: Explanation of the result
- **Details** (optional): Additional error information if test failed

## Running the Tests

1. Navigate to `/rls-test` or click "RLS Test" in the sidebar
2. Click the "Run All Tests" button
3. Wait for tests to complete (typically 30-60 seconds)
4. Review results for any failures

## Test Statistics

The test results page displays:
- **Total Tests**: Number of tests executed
- **Passed**: Number of successful tests
- **Failed**: Number of failed tests (requires attention)
- **Skipped**: Number of tests that were skipped
- **Progress**: Real-time progress indicator during test execution

## Interpreting Failures

If tests fail, it indicates:

1. **RLS Policy Issues**: The Row Level Security policies may be incorrectly configured
2. **Permission Problems**: Users may have access to data they shouldn't, or be blocked from data they should access
3. **Data Integrity**: Test data may not have been created properly

### Common Failure Causes
- Missing or incorrect RLS policies
- Database triggers not firing correctly
- Foreign key constraints preventing test data creation
- Edge functions not accessible or returning errors

## Security Considerations

⚠️ **Important Notes:**
- Tests create temporary users with the pattern `test-{role}-{timestamp}@test.com`
- All test data is automatically cleaned up after completion
- Test suite requires super_admin privileges to execute
- Tests do not affect production data
- Always run tests in a development/staging environment first

## Troubleshooting

### Test Suite Won't Start
- Verify you're logged in as super_admin
- Check browser console for errors
- Ensure edge functions are deployed and accessible

### All Tests Failing
- Check Supabase connection
- Verify RLS policies are enabled on tables
- Check that `has_role` function exists

### Cleanup Issues
- Test users may remain if cleanup fails
- Manually delete test users from Supabase Auth panel
- Test dealers/orders will cascade delete with users

## Technical Details

### Test Architecture
- **Frontend**: React component at `/pages/RLSTest.tsx`
- **Hook**: Custom hook at `/hooks/useRLSTests.ts`
- **Backend**: Uses Supabase edge functions for user management

### Test Flow
1. Authenticate as super_admin
2. Create test users via `create-commerciale` edge function
3. Create test data (dealer, orders)
4. Switch between user sessions to test access
5. Verify expected data visibility
6. Clean up via `delete-commerciale` edge function

### Dependencies
- Supabase client
- Edge functions: `create-commerciale`, `delete-commerciale`
- RLS policies on all tables
- `has_role` security definer function

## Maintenance

The test suite should be updated when:
- New tables are added to the database
- New user roles are introduced
- RLS policies are modified
- Access patterns change

## Best Practices

1. **Run Before Deployment**: Always run tests before deploying RLS changes
2. **Review Failures**: Investigate and fix any failures immediately
3. **Document Changes**: Update this documentation when tests are modified
4. **Regular Testing**: Run tests periodically to catch configuration drift
5. **Monitor Performance**: Tests should complete within 60 seconds

## Support

For issues or questions about the RLS Test Suite:
- Check Supabase logs for edge function errors
- Review RLS policies in the database
- Verify user roles are correctly assigned
- Check that all required database functions exist
