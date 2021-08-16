import { BookLogResponse } from '../containers/bookLogs/ducks/types';
import {
  LibraryReportResponse,
  ReadyTimeline,
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from '../containers/library-report/ducks/types';

export const initializeNewReportForm = (
  report: LibraryReportResponse | undefined,
  bookLogs: BookLogResponse[],
  hasLibrary: boolean,
): ReportWithLibraryRequest | ReportWithoutLibraryRequest | undefined => {
  if (report === undefined) {
    return undefined;
  }
  bookLogs.sort(
    (a, b) =>
      parseInt(b.date.toString().split(' ')[5], 10) -
      parseInt(a.date.toString().split(' ')[5], 10),
  );
  const filledInValues = {
    numberOfChildren: report.numberOfChildren,
    gradesAttended: report.gradesAttended,
    numberOfBooks: bookLogs.reduce((a, b) => a + b.count, 0),
    mostRecentShipmentYear: parseInt(
      bookLogs[0].date.toString().split(' ')[5],
      10,
    ),
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
      timetable: null,
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
