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
    description!: string;
    creationDate?: Date;
    hasTests!: boolean;
    hasCertification!: boolean;
    subscribeQuantity!: number;
    questionsQuantity?: number;
    vacancy?: Vacancy;
    category!: string;
}