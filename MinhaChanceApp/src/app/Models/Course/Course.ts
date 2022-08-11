import { Certification } from "./Certification";
import { Session } from "./Session";
import { Test } from "./Test";
import { User } from "../User/User";
import { Vacancy } from "../Vacancy/Vacancy";

export class Course {
    id!: number;
    courseimage?: File;
    userId?: string;
    courseTitle!: string;
    vacancyId?: number;
    durationTime!: string;
    testId?: number;
    certificationId? : number;
    description!: string;
    creationDate!: string;
    subscribeQuantity!: number;
    sessionsQuantity?: number;
    test?: Test;
    certification?: Certification;
    sessions?: Session[];
    vacancy?: Vacancy;
    category!: string;
}