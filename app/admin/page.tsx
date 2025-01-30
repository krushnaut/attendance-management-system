"use client"

import { useState, useEffect } from "react"
import { useUser } from "../../contexts/UserContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  getSubjects,
  setSubjects,
  getTeachers,
  getStudents,
  getNotifications,
  setNotifications,
} from "../../utils/localStorage"
import type { Subject, Teacher, Student, Notification } from "../../types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const { user } = useUser()
  const router = useRouter()
  const [subjects, setSubjectsState] = useState<Subject[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [newSubject, setNewSubject] = useState<Omit<Subject, "id">>({
    name: "",
    code: "",
    description: "",
    totalLectures: 0,
    completedLectures: 0,
    teacherId: "",
  })
  const [notification, setNotification] = useState({
    studentId: "",
    message: "",
  })

  useEffect(() => {
    if (!user || user.type !== "admin") {
      router.push("/")
    } else {
      setSubjectsState(getSubjects())
      setTeachers(getTeachers())
      setStudents(getStudents())
    }
  }, [user, router])

  const addSubject = () => {
    const updatedSubjects = [...subjects, { ...newSubject, id: Date.now().toString() }]
    setSubjectsState(updatedSubjects)
    setSubjects(updatedSubjects)
    setNewSubject({ name: "", code: "", description: "", totalLectures: 0, completedLectures: 0, teacherId: "" })
  }

  const deleteSubject = (id: string) => {
    const updatedSubjects = subjects.filter((subject) => subject.id !== id)
    setSubjectsState(updatedSubjects)
    setSubjects(updatedSubjects)
  }

  const sendNotification = () => {
    if (notification.studentId && notification.message) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        studentId: notification.studentId,
        message: notification.message,
        createdAt: new Date().toISOString(),
        read: false,
      }
      const notifications = getNotifications()
      setNotifications([...notifications, newNotification])
      setNotification({ studentId: "", message: "" })
      alert("Notification sent successfully!")
    } else {
      alert("Please select a student and enter a message.")
    }
  }

  if (!user || user.type !== "admin") {
    return null
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white">Admin Dashboard</h1>
      <Card className="mb-6 bg-blue-900 text-white">
        <CardHeader>
          <CardTitle>Add New Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            />
            <Input
              placeholder="Subject Code"
              value={newSubject.code}
              onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Total Lectures"
              value={newSubject.totalLectures}
              onChange={(e) => setNewSubject({ ...newSubject, totalLectures: Number.parseInt(e.target.value) })}
            />
            <Select onValueChange={(value) => setNewSubject({ ...newSubject, teacherId: value })}>
              <SelectTrigger className="bg-blue-800">
                <SelectValue placeholder="Assign Teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addSubject} className="mt-4 w-full sm:w-auto">
            Add Subject
          </Button>
        </CardContent>
      </Card>
      <Card className="mb-6 bg-blue-900 text-white">
        <CardHeader>
          <CardTitle>Send Notification to Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Select onValueChange={(value) => setNotification({ ...notification, studentId: value })}>
              <SelectTrigger className="bg-blue-800">
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Notification message"
              value={notification.message}
              onChange={(e) => setNotification({ ...notification, message: e.target.value })}
            />
            <Button onClick={sendNotification}>Send Notification</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-blue-900 text-white">
        <CardHeader>
          <CardTitle>Manage Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-200">Name</TableHead>
                <TableHead className="text-blue-200">Code</TableHead>
                <TableHead className="text-blue-200">Description</TableHead>
                <TableHead className="text-blue-200">Total Lectures</TableHead>
                <TableHead className="text-blue-200">Assigned Teacher</TableHead>
                <TableHead className="text-blue-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.description}</TableCell>
                  <TableCell>{subject.totalLectures}</TableCell>
                  <TableCell>{teachers.find((t) => t.id === subject.teacherId)?.name || "Not assigned"}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => deleteSubject(subject.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

