import { BookLogResponse } from '../containers/bookLogs/types';
import {
  LibraryReportShared,
  ReadyTimeline,
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from '../containers/library-report/ducks/types';

export const initializeNewReportForm = (
  report: LibraryReportShared | undefined,
  bookLogs: BookLogResponse[],
  hasLibrary: boolean,
): ReportWithLibraryRequest | ReportWithoutLibraryRequest | undefined => {
  bookLogs.sort(
    (a, b) =>
      parseInt(b.date.toString().split(' ')[5], 10) -
      parseInt(a.date.toString().split(' ')[5], 10),
  );
  const filledInValues = {
    numberOfChildren: report === undefined ? null : report.numberOfChildren,
    gradesAttended: report === undefined ? [] : report.gradesAttended,
    numberOfBooks: bookLogs.reduce((a, b) => a + b.count, 0),
    mostRecentShipmentYear:
      bookLogs.length > 0
        ? parseInt(bookLogs[0].date.toString().split(' ')[5], 10)
        : null,
  };
  if (hasLibrary) {
    const reportRequest: ReportWithLibraryRequest = {
      ...filledInValues,
      visitReason: null,
      actionPlans: null,
      successStories: null,
      isSharedSpace: null,
      hasInvitingSpace: null,
      assignedPersonRole: null,
      assignedPersonTitle: null,
      apprenticeshipProgram: null,
      trainsAndMentorsApprentices: null,
      hasCheckInTimetables: null,
      hasBookCheckoutSystem: null,
      numberOfStudentLibrarians: null,
      reasonNoStudentLibrarians: null,
      hasSufficientTraining: null,
      teacherSupport: null,
      parentSupport: null,
      checkOutTimetable: null,
      checkInTimetable: null,
      numberOfStudentLibrariansTrainers: null,
    };
    return reportRequest;
  } else {
    const reportRequest: ReportWithoutLibraryRequest = {
      ...filledInValues,
      visitReason: null,
      actionPlans: null,
      successStories: null,
      reason: null,
      wantsLibrary: null,
      hasSpace: null,
      currentStatus: null,
      readyTimeline: ReadyTimeline.UPCOMING_SCHOOL_YEAR,
    };
    return reportRequest;
  }
};
