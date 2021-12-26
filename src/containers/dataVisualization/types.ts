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
  percentSchoolsWithLibraries: 'Schools With Libraries',
  countBooksPerStudent: 'Books Per Student',
  countStudentLibrarians: 'Student Librarians',
  netBooksInOut: 'Net Books In/Out',
};

export interface TotalMetric {
  countSchools: number;
  countBooks: number;
}

export interface CountryMetric {
  countSchools: number;
  countVolunteerAccounts: number;
  countAdminAccounts: number;
  avgCountBooksPerStudent: number;
  avgCountStudentLibrariansPerSchool: number;
  percentSchoolsWithLibraries: number;
}

export interface SchoolMetric {
  countBooksPerStudent: number;
  countStudents: number;
  countStudentLibrarians: number;
  netBooksInOut: number;
}
