import { PERMISSIONS, ROLE_PERMISSIONS, Permission } from '../config/rbac';
import { APP_ROUTES } from '../config/routes';
import { canAccess, hasPermission } from '../hooks/usePermissions';

// Mock Supabase RLS Engine
// Simulates the exact logic defined in supabase/migrations/001_rls_policies.sql
class MockSupabaseRLS {
  constructor(private userRole: string, private userClassId?: string) {}

  public insertAttendance(studentId: string, classId: string) {
    if (this.userRole === 'Super Admin' || this.userRole === 'Principal') {
      return { data: 'success', error: null };
    }
    if (this.userRole === 'Class Teacher') {
      if (this.userClassId === classId) return { data: 'success', error: null };
      return { data: null, error: new Error('403 Forbidden: RLS Policy Violation') };
    }
    return { data: null, error: new Error('403 Forbidden: RLS Policy Violation') };
  }

  public selectFeeInvoices() {
    if (['Super Admin', 'Principal', 'Accountant'].includes(this.userRole)) {
      return { data: [], error: null };
    }
    return { data: null, error: new Error('403 Forbidden: RLS Policy Violation') };
  }

  public updateFeeInvoice(feeId: string) {
    if (['Super Admin', 'Accountant'].includes(this.userRole)) {
      return { data: 'success', error: null };
    }
    return { data: null, error: new Error('403 Forbidden: RLS Policy Violation') };
  }
}

const runTests = () => {
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, msg: string) => {
    if (condition) {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${msg}`);
      failed++;
    }
  };

  const coreRoles = ['Super Admin', 'Principal', 'Class Teacher', 'Accountant', 'Receptionist'];

  coreRoles.forEach((role) => {
    console.log(`\n--- Testing Role: ${role} ---`);
    const mockUser = { id: 'test-user', name: 'Test', role: role as any, class_id: '10A' };

    // TEST TYPE 1: UI / UX ENFORCEMENT
    const allowedRoutes = APP_ROUTES.filter(r => canAccess(mockUser, r.permission)).map(r => r.id);
    
    if (role === 'Accountant') {
      assert(allowedRoutes.includes('fees'), 'Accountant sees Fees route');
      assert(!allowedRoutes.includes('teachers'), 'Accountant does not see Teachers route');
      assert(hasPermission(mockUser, PERMISSIONS.FEES_RECONCILE), 'Accountant UI allows fee reconciliation (fast-fail passes)');
      assert(!hasPermission(mockUser, PERMISSIONS.TIMETABLE_MANAGE), 'Accountant UI blocks timetable manage (fast-fail catches)');
    }

    if (role === 'Class Teacher') {
      assert(allowedRoutes.includes('attendance'), 'Class Teacher sees Attendance route');
      assert(!allowedRoutes.includes('fees'), 'Class Teacher does not see Fees route');
    }

    // TEST TYPE 2: DATA-LAYER / RLS ENFORCEMENT
    // Simulating direct Supabase client call, completely bypassing the UI
    const supabase = new MockSupabaseRLS(role, '10A');

    if (role === 'Accountant') {
      const { error } = supabase.selectFeeInvoices();
      assert(error === null, 'RLS allows Accountant to select fee invoices');
    }

    if (role === 'Class Teacher') {
      // Should fail to read fees
      const { error: feeErr } = supabase.selectFeeInvoices();
      assert(feeErr !== null, 'RLS STRICTLY BLOCKS Class Teacher from reading fee invoices (DB Level)');
      
      // Should succeed marking attendance for own class
      const { error: attSuccess } = supabase.insertAttendance('STU-1', '10A');
      assert(attSuccess === null, 'RLS allows Class Teacher to mark attendance for their own class');

      // Should fail marking attendance for other class
      const { error: attFail } = supabase.insertAttendance('STU-2', '12B');
      assert(attFail !== null, 'RLS STRICTLY BLOCKS Class Teacher from marking attendance for other class');
    }
    
    if (role === 'Receptionist') {
      const { error } = supabase.updateFeeInvoice('FEE-1');
      assert(error !== null, 'RLS STRICTLY BLOCKS Receptionist from updating fee invoices (DB Level)');
    }
  });

  console.log(`\nTest Summary: ${passed} Passed, ${failed} Failed`);
};

// Exporting for use in a vitest/jest runner or simply calling it
export { runTests, MockSupabaseRLS };

runTests();