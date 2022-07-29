import { Session } from "../Session/Session";
import { Test } from "../Test/Test";

export class Course {
    id!: number;
    courseTitle!: string;
    vacancy!: string;
    durationTime!: string;
    sessions!: Session[];
    test!: Test;
    description!: string;
}