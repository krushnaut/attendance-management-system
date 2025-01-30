"use client"

import { useState, useEffect } from "react"
import type { Subject, Student, Attendance, AttendanceStatus } from "../../../types"
import { getSubjects, getStudents, getAttendance, setAttendance } from "../../../utils/localStorage"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "../../../contexts/UserContext"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"

export default function AttendanceMarking() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: AttendanceStatus }>({})
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.type !== "teacher") {
      router.push("/")
    } else {
      setSubjects(getSubjects())
      setStudents(getStudents())
    }
  }, [user, router])

  const markAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }))
  }

  const submitAttendance = () => {
    if (!selectedDate) {
      alert("Please select a date")
      return
    }
    const date = selectedDate.toISOString().split("T")[0]
    const newAttendance: Attendance[] = Object.entries(attendanceData).map(([studentId, status]) => ({
      id: Date.now().toString(),
      subjectId: selectedSubject,
      studentId,
      date,
      status,
    }))

    const existingAttendance = getAttendance()
    setAttendance([...existingAttendance, ...newAttendance])
    alert("Attendance marked successfully!")
  }

  if (!user || user.type !== "teacher") {
    return null
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white">Mark Attendance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>Select Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedSubject}>
              <SelectTrigger className="bg-blue-800">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>
      </div>
      {selectedSubject && selectedDate && (
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>Mark Attendance for {selectedDate.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-blue-200">Student Name</TableHead>
                    <TableHead className="text-blue-200">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={attendanceData[student.id] === "present" ? "default" : "outline"}
                            onClick={() => markAttendance(student.id, "present")}
                          >
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={attendanceData[student.id] === "absent" ? "default" : "outline"}
                            onClick={() => markAttendance(student.id, "absent")}
                          >
                            Absent
                          </Button>
                          <Button
                            size="sm"
                            variant={attendanceData[student.id] === "late" ? "default" : "outline"}
                            onClick={() => markAttendance(student.id, "late")}
                          >
                            Late
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button onClick={submitAttendance} className="mt-4 w-full sm:w-auto">
              Submit Attendance
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

