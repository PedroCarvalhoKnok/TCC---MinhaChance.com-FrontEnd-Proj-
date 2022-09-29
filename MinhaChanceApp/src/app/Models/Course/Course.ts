import { User } from "../User/User";
import { Vacancy } from "../Vacancy/Vacancy";

export class Course {
    id!: number;
    courseimage?: File;
    courseLink!: string;
    coursePlatform!: string;
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