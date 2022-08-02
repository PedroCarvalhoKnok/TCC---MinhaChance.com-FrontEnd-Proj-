import { Certification } from "../Certification/Certification";
import { Session } from "../Session/Session";
import { Test } from "../Test/Test";
import { User } from "../User/User";
import { Vacancy } from "../Vacancy/vacancy";

export class Course {
    id!: number;
    user!: User;
    courseTitle!: string;
    vacancy!: Vacancy;
    durationTime!: string;
    sessions!: Session[];
    test!: Test;
    certification! : Certification;
    description!: string;
}