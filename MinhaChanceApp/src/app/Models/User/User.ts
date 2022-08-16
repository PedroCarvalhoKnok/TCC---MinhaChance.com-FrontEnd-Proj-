import { Graduation } from "./AcademicGraduation";
import { UserCertification } from "./Certification";
import { Experiences } from "./Experiences";

export class User {
    id!: number;
    userName!: string;
    passWord?: string;
    profile!: string;
    email!: string;
    isWorking!: boolean;
    actualCompany!: string;
    actualCharge!: string;
    age!: number;
    phone!: string;
    hasVacancyCourse!:boolean;
    salaryPretension!: number;
    experiences?: Experiences[];
    graduations?: Graduation[];
    certifications?: UserCertification[];
    generalRating?: number;
    generalServicesRating?: number;
    objective?: string;
}