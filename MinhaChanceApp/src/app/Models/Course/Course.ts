import { Certification } from "../Certification/Certification";
import { Session } from "../Session/Session";
import { Test } from "../Test/Test";
import { User } from "../User/User";
import { Vacancy } from "../Vacancy/Vacancy";

export class Course {
    id!: number;
    userId!: string;
    courseTitle!: string;
    vacancyId!: string;
    durationTime!: string;
    sessions!: Session[];
    testId!: string;
    certificationId! : string;
    description!: string;
}