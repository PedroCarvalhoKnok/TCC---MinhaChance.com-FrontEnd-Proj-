import { Chart } from "chart.js";
import { Role } from "src/app/Enums/role";
import { Graduation } from "./AcademicGraduation";
import { Address } from "./Address";
import { UserCertification } from "./Certification";
import { Experiences } from "./Experiences";
import { Interest } from "./Interest";

export class User {
    id!: number;
    userName!: string;
    passWord?: string;
    profile!: string;
    email!: string;
    cpf?: string;
    cnpj?: string;
    isWorking!: boolean;
    actualCompany?: string;
    actualCharge?: string;
    address!: Address;
    age!: number;
    phone!: string;
    hasVacancyCourse!:boolean;
    salaryPretension!: number;
    experiences?: Experiences[];
    graduations?: Graduation[];
    certifications?: UserCertification[];
    interests: Interest[];
    objective?: string;
    userVacancyInfo?: any;
    userInteligenciesInfo?: any;
    role: Role;
    token?: string;
}