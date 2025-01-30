"use client"

import { useState, useEffect } from "react"
import type { Subject, Attendance } from "../../../types"
import { getSubjects, getAttendance } from "../../../utils/localStorage"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AttendanceReports() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([])

  useEffect(() => {
    setSubjects(getSubjects())
  }, [])

  useEffect(() => {
    if (selectedSubject) {
      const allAttendance = getAttendance()
      setAttendanceData(allAttendance.filter((a) => a.subjectId === selectedSubject))
    }
  }, [selectedSubject])

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Student ID,Status\n" +
      attendanceData.map((a) => `${a.date},${a.studentId},${a.status}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "attendance_report.csv")
    document.body.appendChild(link)
    link.click()
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Attendance Reports</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedSubject}>
            <SelectTrigger>
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
      {selectedSubject && attendanceData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Attendance Report</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>{attendance.date}</TableCell>
                    <TableCell>{attendance.studentId}</TableCell>
                    <TableCell>{attendance.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={exportCSV} className="mt-4">
              Export CSV
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

