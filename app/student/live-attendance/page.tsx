"use client"

import { useState, useEffect } from "react"
import type { Subject, Attendance } from "../../../types"
import { getSubjects, getAttendance, setAttendance } from "../../../utils/localStorage"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LiveAttendance() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  useEffect(() => {
    setSubjects(getSubjects())
  }, [])

  const markAttendance = () => {
    const date = new Date().toISOString().split("T")[0]
    const newAttendance: Attendance = {
      id: Date.now().toString(),
      subjectId: selectedSubject,
      studentId: "current-student-id", // In a real app, this would be the logged-in student's ID
      date,
      status: "present",
    }

    const existingAttendance = getAttendance()
    setAttendance([...existingAttendance, newAttendance])
    alert("Attendance marked successfully!")
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mark Live Attendance</h1>
      <Card>
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
          {selectedSubject && (
            <Button onClick={markAttendance} className="mt-4">
              Mark Attendance
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

