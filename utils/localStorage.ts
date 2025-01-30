import type { Subject, Attendance, Student, Teacher, Admin, Notification } from "../types"

// Initialize with predefined admin if not already initialized
const initializeAdmins = () => {
  const existingAdmins = localStorage.getItem("admins")
  if (!existingAdmins) {
    const predefinedAdmins: Admin[] = [{ id: "0", name: "Admin", password: "0" }]
    localStorage.setItem("admins", JSON.stringify(predefinedAdmins))
  }
}

// Initialize with predefined teachers if not already initialized
const initializeTeachers = () => {
  const existingTeachers = localStorage.getItem("teachers")
  if (!existingTeachers) {
    const predefinedTeachers: Teacher[] = [
      { id: "DBMS", name: "Manoj Chavan", password: "1" },
      { id: "CCN", name: "Purnima", password: "2" },
      { id: "DIP", name: "Rashmita", password: "3" },
      { id: "FO", name: "Arpit", password: "4" },
    ]
    localStorage.setItem("teachers", JSON.stringify(predefinedTeachers))
  }
}

// Initialize with predefined subjects if not already initialized
const initializeSubjects = () => {
  const existingSubjects = localStorage.getItem("subjects")
  if (!existingSubjects) {
    const predefinedSubjects: Subject[] = [
      {
        id: "1",
        name: "Subject Database Management System",
        code: "1",
        description: "SDBMS Course",
        totalLectures: 40,
        completedLectures: 0,
        teacherId: "1", // Manoj Chavan
      },
      {
        id: "2",
        name: "Computer Communication Network",
        code: "2",
        description: "CCN Course",
        totalLectures: 40,
        completedLectures: 0,
        teacherId: "2", // Purnima
      },
      {
        id: "3",
        name: "Digital Image Processing",
        code: "3",
        description: "DIP Course",
        totalLectures: 40,
        completedLectures: 0,
        teacherId: "3", // Rashmita
      },
      {
        id: "4",
        name: "Fiber Optics",
        code: "4",
        description: "FO Course",
        totalLectures: 40,
        completedLectures: 0,
        teacherId: "4", // Arpit
      },
    ]
    localStorage.setItem("subjects", JSON.stringify(predefinedSubjects))
  }
}

// Initialize with predefined students if not already initialized
const initializeStudents = () => {
  const existingStudents = localStorage.getItem("students")
  if (!existingStudents) {
    const predefinedStudents: Student[] = [
      { id: "1", name: "Parekh Het Chandresh", password: "1" },
      { id: "2", name: "Patel Ankit Haushila", password: "2" },
      { id: "3", name: "Patel Krish", password: "3" },
      { id: "4", name: "Patel Rishab", password: "4" },
      { id: "5", name: "Patil Omkar Pandurang", password: "5" },
      { id: "6", name: "Quddus Perween Sana", password: "6" },
      { id: "7", name: "Potdar Vedant Ketan", password: "7" },
      { id: "8", name: "Prajapati Vishal Amirchand", password: "8" },
      { id: "9", name: "Pranav Mohandas", password: "9" },
      { id: "10", name: "Rai Kushagra", password: "10" },
      { id: "11", name: "Rane Gayatri", password: "11" },
      { id: "12", name: "Rathi Aayush", password: "12" },
      { id: "13", name: "Raut Sarthak Milind", password: "13" },
      { id: "14", name: "Sagwekar Aumkar Sanjeev", password: "14" },
      { id: "15", name: "Sah Aditya", password: "15" },
      { id: "16", name: "Sankhe Prachi Pravin", password: "16" },
      { id: "17", name: "Shah Het Atul", password: "17" },
      { id: "18", name: "Sharma Gaurav", password: "18" },
      { id: "19", name: "Sharma Harshkumar Pradip", password: "19" },
      { id: "20", name: "Sharma Prathamraj", password: "20" },
      { id: "21", name: "Sharma Shweta Manoj", password: "21" },
      { id: "22", name: "Sheth Ishit Rajneel", password: "22" },
      { id: "23", name: "Shetty Pragathi Chandrashekar", password: "23" },
      { id: "24", name: "Shreyash Raju", password: "24" },
      { id: "25", name: "Shrivastav Tarun", password: "25" },
      { id: "26", name: "Amay Shukla Anil", password: "26" },
      { id: "27", name: "Shukla Jaikishan Jagdish", password: "27" },
      { id: "28", name: "Shukla Kapildev", password: "28" },
      { id: "29", name: "Shukla Rudra", password: "29" },
      { id: "30", name: "Singh Adarsh Shashikant", password: "30" },
      { id: "31", name: "Singh Aditya Rajesh", password: "31" },
      { id: "32", name: "Singh Aditya Sitaram", password: "32" },
      { id: "33", name: "Singh Aryan Santosh", password: "33" },
      { id: "34", name: "Singh Ayesha Vijay", password: "34" },
      { id: "35", name: "Singh Ayeshna Navin", password: "35" },
      { id: "36", name: "Singh Divyani", password: "36" },
      { id: "37", name: "Singh Harsh", password: "37" },
      { id: "38", name: "Harshit Singh Ugrasen", password: "38" },
      { id: "39", name: "Singh Prachi", password: "39" },
      { id: "40", name: "Singh Rajveer", password: "40" },
      { id: "41", name: "Singh Ritik", password: "41" },
      { id: "42", name: "Singh Riya", password: "42" },
      { id: "43", name: "Singh Swati", password: "43" },
      { id: "44", name: "Singh Vishal Birendra", password: "44" },
      { id: "45", name: "Sinha Nishchay", password: "45" },
      { id: "46", name: "Ayush Vinod Suthar", password: "46" },
      { id: "47", name: "Tadakpalli Vinay Kankayya", password: "47" },
      { id: "48", name: "Tamanna Khare", password: "48" },
      { id: "49", name: "Tambe Sanchita", password: "49" },
      { id: "50", name: "Atharva Tanpure", password: "50" },
      { id: "51", name: "Sanskruti Thakur", password: "51" },
      { id: "52", name: "Tiwari Ankit Rajesh Kumar", password: "52" },
      { id: "53", name: "Trivedi Pinank", password: "53" },
      { id: "54", name: "Verma Rudra Vivek", password: "54" },
      { id: "55", name: "Verma Yashraj", password: "55" },
      { id: "56", name: "Walia Akshara", password: "56" },
      { id: "57", name: "Yadav Aayushkumar", password: "57" },
      { id: "58", name: "Yadav Satyam", password: "58" },
      { id: "59", name: "Shlok Suresh", password: "59" },
      { id: "60", name: "Yadav Sumeet Shivkumar Bansraj", password: "60" },
      { id: "61", name: "Yadav Vishal", password: "61" },
      { id: "62", name: "Yadav Vishal", password: "62" },
      { id: "63", name: "Kadam Avantika", password: "63" },
      { id: "64", name: "Yadav Tanish", password: "64" },
      { id: "65", name: "Yadav Rachit", password: "65" },
      { id: "66", name: "Vora Tanush", password: "66" },
      { id: "67", name: "Upadhyay Neelpa", password: "67" },
      { id: "68", name: "Shubrat Pratap mahesh pal singh", password: "68" },
      { id: "69", name: "Dasgaonkar Dhruv", password: "69" },
    ]
    localStorage.setItem("students", JSON.stringify(predefinedStudents))
  }
}

// Call all initializations when the module loads
initializeAdmins()
initializeTeachers()
initializeSubjects()
initializeStudents()

export const getSubjects = (): Subject[] => {
  const subjects = localStorage.getItem("subjects")
  return subjects ? JSON.parse(subjects) : []
}

export const setSubjects = (subjects: Subject[]) => {
  localStorage.setItem("subjects", JSON.stringify(subjects))
}

export const getAttendance = (): Attendance[] => {
  const attendance = localStorage.getItem("attendance")
  return attendance ? JSON.parse(attendance) : []
}

export const setAttendance = (attendance: Attendance[]) => {
  localStorage.setItem("attendance", JSON.stringify(attendance))
}

export const getStudents = (): Student[] => {
  const students = localStorage.getItem("students")
  return students ? JSON.parse(students) : []
}

export const setStudents = (students: Student[]) => {
  localStorage.setItem("students", JSON.stringify(students))
}

export const getTeachers = (): Teacher[] => {
  const teachers = localStorage.getItem("teachers")
  return teachers ? JSON.parse(teachers) : []
}

export const setTeachers = (teachers: Teacher[]) => {
  localStorage.setItem("teachers", JSON.stringify(teachers))
}

export const getAdmins = (): Admin[] => {
  const admins = localStorage.getItem("admins")
  return admins ? JSON.parse(admins) : []
}

export const setAdmins = (admins: Admin[]) => {
  localStorage.setItem("admins", JSON.stringify(admins))
}

export const getNotifications = (): Notification[] => {
  const notifications = localStorage.getItem("notifications")
  return notifications ? JSON.parse(notifications) : []
}

export const setNotifications = (notifications: Notification[]) => {
  localStorage.setItem("notifications", JSON.stringify(notifications))
}

