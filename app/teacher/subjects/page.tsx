"use client"

import { useState, useEffect } from "react"
import { useUser } from "../../../contexts/UserContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSubjects } from "../../../utils/localStorage"
import type { Subject } from "../../../types"

export default function TeacherSubjects() {
  const { user } = useUser()
  const router = useRouter()
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    if (!user || user.type !== "teacher") {
      router.push("/")
    } else {
      const allSubjects = getSubjects()
      setSubjects(allSubjects.filter((subject) => subject.teacherId === user.id))
    }
  }, [user, router])

  if (!user || user.type !== "teacher") {
    return null
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Assigned Subjects</h1>
      <Card className="bg-blue-900 text-white">
        <CardHeader>
          <CardTitle>Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-200">Name</TableHead>
                <TableHead className="text-blue-200">Code</TableHead>
                <TableHead className="text-blue-200">Description</TableHead>
                <TableHead className="text-blue-200">Total Lectures</TableHead>
                <TableHead className="text-blue-200">Completed Lectures</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.description}</TableCell>
                  <TableCell>{subject.totalLectures}</TableCell>
                  <TableCell>{subject.completedLectures}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

