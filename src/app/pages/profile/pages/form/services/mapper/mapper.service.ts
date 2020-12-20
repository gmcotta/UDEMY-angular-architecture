import { Injectable } from '@angular/core';
import { Roles } from '@app/models/backend';
import { Dictionaries } from '@app/store/dictionaries';
import { Employee, Recruiter, User, UserCreateRequest } from '@app/store/user';
import { EmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { RecruiterForm } from '../../components/professional/roles/recruiter/recruiter.component';
import { ProfileForm } from '../../form.component';

@Injectable()
export class MapperService {

  constructor() { }

  userToForm(user: User): ProfileForm {
    return {
      personal: {
        name: user ? user.name : '',
        photoURL: user ? user.photoURL : '',
        country: user ? user.country : '',
      },
      professional: {
        about: user ? user.about : undefined,
        roleId: user ? user.roleId : '',
        role: user ? this.getFormRole(user) : undefined,
      }
    }
  }

  formToUserCreate(form: ProfileForm, dictionaries: Dictionaries): UserCreateRequest {
    return {
      name: form.personal ? form.personal.name : '',
      photoURL: form.personal ? form.personal.photoURL : '',
      roleId: form.professional ? form.professional.roleId : '',
      country: form.personal ? form.personal.country : '',
      about: form.professional ? form.professional.about : '',
      role: this.getRole(form, dictionaries),
    }
  }

  formToUserUpdate(form: ProfileForm, user: User | undefined, dictionaries: Dictionaries): User {
    return {
      uid: user!.uid,
      email: user!.email,
      created: user!.created,
      name: form.personal.name,
      photoURL: form.personal.photoURL,
      country: form.personal.country,
      role: this.getRole(form, dictionaries),
      roleId: form.professional.roleId,
      about: form.professional.about,
    }
  }

  private getFormRole(user: User): EmployeeForm | RecruiterForm | undefined {
    if (user.roleId === 'employee') {
      const role = user.role as Employee;
      const formRole: EmployeeForm = {
        expectedSalary: role.expectedSalary,
        specialization: role.specialization?.id,
        qualification: role.qualification?.id,
        skills: role.skills.map(skill => skill?.id),
        experiences: role.experiences,
      };
      return formRole;
    } else if (user.roleId === 'recruiter') {
      const role = user.role as Recruiter;
      const formRole: RecruiterForm = {
        companyName: role.companyName,
        employeesCount: role.employeesCount,
      } 
      return formRole;
    } else {
      return undefined;
    }
  }

  private getRole(form: ProfileForm, dictionaries: Dictionaries): Employee | Recruiter | undefined {
    if (form.professional?.roleId === 'employee') {
      const formRole = form.professional.role as EmployeeForm;
      const role: Employee = {
        expectedSalary: formRole.expectedSalary,
        specialization: dictionaries.specializations.items
          .find(spec => spec.id === formRole.specialization),
        qualification: dictionaries.qualifications.items
          .find(qual => qual.id === formRole.qualification),
        skills: formRole.skills
          .map(id => dictionaries.skills.items
          .find(skill => skill.id === id)),
        experiences: formRole.experiences,
      }
      return role;
    } else if (form.professional?.roleId === 'recruiter') {
      const formRole = form.professional.role as RecruiterForm;
      const role: Recruiter = {
        companyName: formRole.companyName,
        employeesCount: formRole.employeesCount,
      }
      return role;
    } else {
      return undefined;
    }

  }
}
