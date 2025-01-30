import type { Student, Teacher, Admin, User, UserType } from "../types"
import { getStudents, setStudents, getTeachers, setTeachers, getAdmins, setAdmins } from "./localStorage"

export const authenticateUser = (id: string, password: string): User | null => {
  const students = getStudents()
  const teachers = getTeachers()
  const admins = getAdmins()

  const student = students.find((s) => s.id === id && s.password === password)
  if (student) {
    return { id: student.id, name: student.name, type: "student" }
  }

  const teacher = teachers.find((t) => t.id === id && t.password === password)
  if (teacher) {
    return { id: teacher.id, name: teacher.name, type: "teacher" }
  }

  const admin = admins.find((a) => a.id === id && a.password === password)
  if (admin) {
    return { id: admin.id, name: admin.name, type: "admin" }
  }

  return null
}

export const createAccount = (id: string, name: string, password: string, type: UserType): User | null => {
  switch (type) {
    case "student":
      const students = getStudents()
      if (students.some((s) => s.id === id)) {
        return null // Student ID already exists
      }
      const newStudent: Student = { id, name, password }
      setStudents([...students, newStudent])
      return { id, name, type: "student" }
    case "teacher":
      const teachers = getTeachers()
      if (teachers.some((t) => t.id === id)) {
        return null // Teacher ID already exists
      }
      const newTeacher: Teacher = { id, name, password }
      setTeachers([...teachers, newTeacher])
      return { id, name, type: "teacher" }
    case "admin":
      const admins = getAdmins()
      if (admins.some((a) => a.id === id)) {
        return null // Admin ID already exists
      }
      const newAdmin: Admin = { id, name, password }
      setAdmins([...admins, newAdmin])
      return { id, name, type: "admin" }
    default:
      return null
  }
}

