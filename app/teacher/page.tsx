"use client"

import { useUser } from "../../contexts/UserContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function TeacherDashboard() {
  const { user } = useUser()
  const router = useRouter()

  if (!user || user.type !== "teacher") {
    router.push("/")
    return null
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>View Assigned Subjects</CardTitle>
            <CardDescription className="text-blue-200">See subjects assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/teacher/subjects">
              <Button className="w-full">View Subjects</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription className="text-blue-200">Record student attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/teacher/attendance">
              <Button className="w-full">Mark Attendance</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>View Reports</CardTitle>
            <CardDescription className="text-blue-200">Access attendance reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/teacher/reports">
              <Button className="w-full">View Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

