import { ThunkAction } from 'redux-thunk';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { C4CState } from '../../../store';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { LibraryReportActions } from './actions';

export type LibraryReportThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  LibraryReportActions
>;

export interface LibraryReportReducerState {
  readonly latestReport: AsyncRequest<LibraryReportResponse, any>;
  readonly isYesReport?: boolean;
}

export interface LibraryReportShared {
  readonly numberOfChildren: null | number;
  readonly numberOfBooks: null | number;
  readonly mostRecentShipmentYear: null | number;
  visitReason: null | string;
  readonly actionPlans: null | string;
  readonly successStories: null | string;
}

export interface ReportWithLibraryRequest extends LibraryReportShared {
  readonly isSharedSpace: null | boolean;
  readonly hasInvitingSpace: null | boolean;
  readonly assignedPersonRole: null | AssignedPersonRole;
  readonly assignedPersonTitle: null | AssignedPersonTitle;
  readonly apprenticeshipProgram: null | ApprenticeshipProgram;
  readonly trainsAndMentorsApprentices: null | boolean;
  readonly hasCheckInTimetables: null | boolean;
  readonly hasBookCheckoutSystem: null | boolean;
  readonly numberOfStudentLibrarians: null | number;
  readonly numberOfStudentLibrariansTrainers: null | number;
  readonly reasonNoStudentLibrarians: null | string;
  readonly hasSufficientTraining: null | boolean;
  readonly teacherSupport: null | string;
  readonly parentSupport: null | string;
  readonly timetable: null | Timetable;
}

export interface ReportWithoutLibraryRequest extends LibraryReportShared {
  readonly reason: null | string;
  readonly wantsLibrary: null | boolean;
  readonly hasSpace: null | boolean;
  readonly currentStatus: null | string;
  readonly readyTimeline: ReadyTimeline;
}

export type LibraryReportResponse = {
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly schoolId: number;
  readonly userId: number;
} & (
  | ({
      readonly libraryStatus: 'EXISTS';
    } & ReportWithLibraryRequest)
  | ({
      readonly libraryStatus: 'DOES_NOT_EXIST';
    } & ReportWithoutLibraryRequest)
);

type TimetableGrade = { [key: string]: number };

export const TIMETABLE_COLUMNS: string[] = [
  'kindergarten',
  'firstGrade',
  'secondGrade',
  'thirdGrade',
  'fourthGrade',
  'sixthGrade',
  'formOne',
  'formTwo',
  'formThree',
  'formFour',
  'formFive',
];

export interface Timetable {
  year: number;
  month: number;
  kindergarten?: TimetableGrade;
  firstGrade?: TimetableGrade;
  secondGrade?: TimetableGrade;
  thirdGrade?: TimetableGrade;
  fourthGrade?: TimetableGrade;
  fifthGrade?: TimetableGrade;
  sixthGrade?: TimetableGrade;
  formOne?: TimetableGrade;
  formTwo?: TimetableGrade;
  formThree?: TimetableGrade;
  formFour?: TimetableGrade;
  formFive?: TimetableGrade;
}

export enum AssignedPersonRole {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  NONE = 'NONE',
}

export enum AssignedPersonTitle {
  LIBRARIAN = 'Librarian',
  SCHOOL_SECRETARY = 'Secretary',
  CLASSROOM_TEACHER = 'Teacher',
  APPRENTICE = 'Apprentice',
  PCV = 'PCV',
  OTHER = 'Other',
}

export enum ApprenticeshipProgram {
  OECS = 'OECS YES',
  NEP = 'NEP',
  OTHER = 'Other',
  NONE = 'No Apprenticeship Program',
}

export enum Grade {
  KINDERGARTEN = 'KINDERGARTEN',
  FIRST_GRADE = 'FIRST_GRADE',
  SECOND_GRADE = 'SECOND_GRADE',
  THIRD_GRADE = 'THIRD_GRADE',
  FOURTH_GRADE = 'FOURTH_GRADE',
  FIFTH_GRADE = 'FIFTH_GRADE',
  SIXTH_GRADE = 'SIXTH_GRADE',
  FORM_ONE = 'FORM_ONE',
  FORM_TWO = 'FORM_TWO',
  FORM_THREE = 'FORM_THREE',
  FORM_FOUR = 'FORM_FOUR',
  FORM_FIVE = 'FORM_FIVE',
}

export enum ReadyTimeline {
  UPCOMING_SCHOOL_YEAR = 'UPCOMING_SCHOOL_YEAR',
  YEAR_AFTER_NEXT = 'YEAR_AFTER_NEXT',
  MORE_THAN_TWO_YEARS = 'MORE_THAN_TWO_YEARS',
}
