export interface Employee {
  specialization: Specialization | undefined;
  skills: (Skill | undefined)[];
  qualification: Qualification | undefined;
  expectedSalary: number;
  experiences: (Experience)[];
}

interface Specialization {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
}

interface Qualification {
  id: string;
  name: string;
}

interface Experience {
  companyName: string;
  period: Period;
}

interface Period {
  from: number;
  to: number;
}
