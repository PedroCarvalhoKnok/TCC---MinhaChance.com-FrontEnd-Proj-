import { Certification } from "../Certification/Certification";
import { Session } from "../Session/Session";
import { Test } from "../Test/Test";
import { User } from "../User/User";
import { Vacancy } from "../Vacancy/Vacancy";

export class Course {
    id!: number;
    courseimage?: File;
    userId?: string;
    courseTitle!: string;
    vacancyId?: string;
    durationTime!: string;
    testId?: number;
    certificationId? : number;
    description!: string;
    creationDate!: string;
    subscribeQuantity?: number;
    sessionsQuantity?: number;
    test?: Test;
}