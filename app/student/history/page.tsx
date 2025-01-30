"use client"

import { useState, useEffect } from "react"
import { getSubjects, getAttendance } from "../../../utils/localStorage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUser } from "../../../contexts/UserContext"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

type AttendanceReport = {
  subjectId: string
  subjectName: string
  totalLectures: number
  attendedLectures: number
  attendancePercentage: number
}

export default function AttendanceHistory() {
  const [attendanceReport, setAttendanceReport] = useState<AttendanceReport[]>([])
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.type !== "student") {
      router.push("/")
    } else {
      const subjectsData = getSubjects()
      const attendanceData = getAttendance()

      const report = subjectsData.map((subject) => {
        const subjectAttendance = attendanceData.filter((a) => a.subjectId === subject.id && a.studentId === user.id)
        const attendedLectures = subjectAttendance.filter((a) => a.status === "present" || a.status === "late").length
        const attendancePercentage = subject.totalLectures > 0 ? (attendedLectures / subject.totalLectures) * 100 : 0

        return {
          subjectId: subject.id,
          subjectName: subject.name,
          totalLectures: subject.totalLectures,
          attendedLectures,
          attendancePercentage,
        }
      })

      setAttendanceReport(report)
    }
  }, [user, router])

  if (!user || user.type !== "student") {
    return null
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white">Attendance History</h1>
      <Card className="bg-blue-900 text-white">
        <CardHeader>
          <CardTitle>Your Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-blue-200">Subject</TableHead>
                  <TableHead className="text-blue-200">Total Lectures</TableHead>
                  <TableHead className="text-blue-200">Lectures Attended</TableHead>
                  <TableHead className="text-blue-200">Attendance Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceReport.map((report) => (
                  <TableRow key={report.subjectId}>
                    <TableCell>{report.subjectName}</TableCell>
                    <TableCell>{report.totalLectures}</TableCell>
                    <TableCell>{report.attendedLectures}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={report.attendancePercentage} className="w-[60%] mr-2" />
                        <span>{report.attendancePercentage.toFixed(2)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

