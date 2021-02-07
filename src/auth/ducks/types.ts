import { ThunkAction } from 'redux-thunk';
import { AuthClient } from '../authClient';
import { TokenService } from '../token';
import { AsyncRequest } from '../../utils/asyncRequest';
import { UserAuthenticationActions } from './actions';
import { C4CState } from '../../store';

export interface UserAuthenticationReducerState {
  readonly tokens: AsyncRequest<TokenPayload, any>;
}

export interface UserAuthenticationExtraArgs {
  readonly authClient: AuthClient;
  readonly tokenService: TokenService;
}

export type UserAuthenticationThunkAction<R> = ThunkAction<
  R,
  C4CState,
  UserAuthenticationExtraArgs,
  UserAuthenticationActions
>;

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface SignupRequest {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface TokenPayload {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface RefreshTokenResponse {
  readonly freshAccessToken: string;
}

export enum PrivilegeLevel {
  NONE = -1,
  STANDARD = 0,
  ADMIN = 1,
}

export const NO_USER_ID = -1;

export interface HATSFormData {
  reasonForVisit?: {
    purpose: string;
    otherPurpose?: string;
  }

  schoolInfo?: {
    school: number; // ???
    schoolAddress: {
      schoolStreetAddress: string;
      schoolTownDistrict: string;
      schoolInstructions: string;
    }
    schoolContactInfo: {
      schoolPhone: string;
      schoolEmail: string;
      schoolOtherContactInfo: string;
    }
    pdContactInfo: ContactInfo;
    lcContactInfo: ContactInfo;
    llContactInfo: ContactInfo;
    additionalContacts: ContactInfo[];
  }

  studentBookInfo?: {
    childrenAttended: number;
    booksAmount: number;
    gradesAttended: number;
    shipmentYear: number;
  }

  libraryInfo?: {
    isThereLibrary: boolean;
    noLibrary?: {
      whyNoLibrary: string;
      workingTowardsLibrary: boolean;
      workingTowardsWantLibrary: boolean; // ??? same question
      designatedSpaceForLibrary: boolean;
      whereInProcess: {
        foundASpace: boolean;
        lookingForASpace: boolean;
        haveASpaceButNoBooks: boolean;
        workingOnConvincingPrincipal: boolean;
        needFurniture: boolean;
        startingTheConversation: boolean;
      },
      whenWouldTheyBeReady: 'upcoming-school-year' | 'year-after-next' | 'more-than-2-years';
    }
    yesLibrary?: {
      isLibrarySharedSpace: 'only-library' | 'shared-space';
      doesLibraryHaveInvitingSpace: boolean;
      assignedToLibrary: 'yes-full-time' | 'yes-part-time' | 'no';
      titleOfPersonAssignedToLibrary?: 'librarian' | 'school-secretary' | 'classroom-teacher'
        | 'apprentice' | 'pvc' | 'other';
      otherTitleOfPersonAssignedToLibrary?: string;
      haveApprenticeProgram: boolean;
      apprenticeshipType?: 'oecs-yes' | 'nep' | 'waiting-on-amanda';
      doTrainAndMentorApprentices?: boolean;
    }
  }

  monitoringInfo?: {
    doesLibraryKeepCheckInTimetable: boolean;
    doesLibraryBookCheckOutSystem: boolean;
  }

  trainingAndMentorshipInfo?: {
    isThereStudentLibraryProgram: boolean;
    howManyStudentLibrarians?: number;
    whyNoStudentLibraryProgram?: string;
    hasLibraryHadTrainingWithManualOrGuide: boolean;
    areTeachersSeekingSupport: boolean;
    kindOfTeacherSupport?: string;
    hasSchoolInvolvedParentsInLibraryUse: boolean;
    exampleOfParentInvolvement?: string;
  }
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  contactType: 'primary' | 'secondary';
}
