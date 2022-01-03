export enum DataManagerOptions {
  TOTAL = 'TOTAL',
  COUNTRY = 'COUNTRY',
  SCHOOL = 'SCHOOL',
}

export const MetricMapping = {
  countSchools: 'Schools',
  countBooks: 'Books',
  countVolunteerAccounts: 'Volunteer Accounts',
  countAdminAccounts: 'Admin Accounts',
  avgCountBooksPerStudent: 'Average Books Per Students',
  avgCountStudentLibrariansPerSchool: 'Average Student Librarians Per School',
  percentSchoolsWithLibraries: 'Schools Have Libraries',
  countBooksPerStudent: 'Books Per Student',
  countStudentLibrarians: 'Student Librarians',
  netBooksInOut: 'Net Books In/Out',
  countStudents: 'Students',
  countOfficerAccounts: 'Officers',
};

export interface TotalMetric {
  countSchools: number | null;
  countBooks: number | null;
  countStudents: number | null;
}

export interface CountryMetric {
  countSchools: number | null;
  countVolunteerAccounts: number | null;
  countOfficerAccounts: number | null;
  countAdminAccounts: number | null;
  avgCountBooksPerStudent: number | null;
  avgCountStudentLibrariansPerSchool: number | null;
  percentSchoolsWithLibraries: number | null;
  countStudents: number | null;
  countBooks: number | null;
}

export interface SchoolMetric {
  countBooksPerStudent: number | null;
  countBooks: number | null;
  countStudents: number | null;
  countStudentLibrarians: number | null;
  netBooksInOut: number | null;
}
