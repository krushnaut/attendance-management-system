export type Subject = {
  id: string
  name: string
  code: string
  description: string
  totalLectures: number
  completedLectures: number
  teacherId: string
}

export type AttendanceStatus = "present" | "absent" | "late"

export type Attendance = {
  id: string
  subjectId: string
  studentId: string
  date: string
  status: AttendanceStatus
}

export type Student = {
  id: string
  name: string
  password: string
}

export type Teacher = {
  id: string
  name: string
  password: string
}

export type Admin = {
  id: string
  name: string
  password: string
}

export type UserType = "admin" | "teacher" | "student"

export type User = {
  id: string
  name: string
  type: UserType
}

export type Notification = {
  id: string
  studentId: string
  message: string
  createdAt: string
  read: boolean
}

