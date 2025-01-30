"use client"

import { useState, useEffect } from "react"
import { useUser } from "../../contexts/UserContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { getNotifications, setNotifications } from "../../utils/localStorage"
import type { Notification } from "../../types"

export default function StudentDashboard() {
  const { user } = useUser()
  const router = useRouter()
  const [notifications, setNotificationsState] = useState<Notification[]>([])

  useEffect(() => {
    if (!user || user.type !== "student") {
      router.push("/")
    } else {
      const userNotifications = getNotifications().filter((n) => n.studentId === user.id)
      setNotificationsState(userNotifications)
    }
  }, [user, router])

  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    setNotificationsState(updatedNotifications)
    setNotifications(updatedNotifications)
  }

  if (!user || user.type !== "student") {
    return null
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-white">Student Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>View Attendance</CardTitle>
            <CardDescription className="text-blue-200">Check your attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student/history">
              <Button className="w-full">View Attendance History</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription className="text-blue-200">View important updates</CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-2 rounded ${notification.read ? "bg-blue-800" : "bg-blue-700"}`}
                  >
                    <p>{notification.message}</p>
                    <p className="text-sm text-blue-300">{new Date(notification.createdAt).toLocaleString()}</p>
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="mt-2"
                      >
                        Mark as Read
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new notifications</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

