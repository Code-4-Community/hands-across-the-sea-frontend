import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { ReportWithLibraryActions } from './actions';
import { AsyncRequest } from '../../../utils/asyncRequest';

export type ReportWithLibraryThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  ReportWithLibraryActions
>;

export interface ReportWithLibraryReducerState {
  readonly reportWithLibrary: AsyncRequest<ReportWithLibraryResponse, any>;
}

export interface ReportWithLibraryRequest {
  readonly numberOfChildren: null | number;
  readonly numberOfBooks: null | number;
  readonly mostRecentShipmentYear: null | number;
  readonly isSharedSpace: null | boolean;
  readonly hasInvitingSpace: null | boolean;
  readonly assignedPersonRole: null | string;
  readonly assignedPersonTitle: null | string;
  readonly apprenticeshipProgram: null | string;
  readonly trainsAndMentorsApprentices: null | boolean;
  readonly hasCheckInTimetables: null | boolean;
  readonly hasBookCheckoutSystem: null | boolean;
  readonly numberOfStudentLibrarians: null | number;
  readonly reasonNoStudentLibrarians: null | string;
  readonly hasSufficientTraining: null | boolean;
  readonly teacherSupport: null | string;
  readonly parentSupport: null | string;
  readonly visitReason: null | string;
}

export interface ReportWithLibraryResponse extends ReportWithLibraryRequest {
  readonly id: number;
  readonly schoolId: number;
  readonly libraryStatus: string;
}

export enum AssignedPersonRole {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  NONE = 'NONE',
}

export enum AssignedPersonTitle {
  LIBRARIAN = 'LIBRARIAN',
  SECRETARY = 'SECRETARY',
  TEACHER = 'TEACHER',
  APPRENTICE = 'APPRENTICE',
  PCV = 'PCV',
  OTHER = 'OTHER',
}

export enum ApprenticeshipProgram {
  OECS_YES = 'OECS_YES',
  NEP = 'NEP',
  OHTER = 'OTHER',
}
