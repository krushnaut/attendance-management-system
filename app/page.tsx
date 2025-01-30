"use client"

import { useState } from "react"
import { useUser } from "../contexts/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { authenticateUser, createAccount } from "../utils/auth"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Home() {
  const { setUser } = useUser()
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState<"student" | "teacher" | "admin">("student")
  const router = useRouter()

  const handleSubmit = () => {
    if (isLogin) {
      const user = authenticateUser(id, password)
      if (user) {
        setUser(user)
        router.push(user.type === "teacher" ? "/teacher" : user.type === "admin" ? "/admin" : "/student")
      } else {
        setError("Invalid credentials")
      }
    } else {
      if (!id || !name || !password) {
        setError("All fields are required")
        return
      }
      const newUser = createAccount(id, name, password, userType)
      if (newUser) {
        setUser(newUser)
        router.push(newUser.type === "teacher" ? "/teacher" : newUser.type === "admin" ? "/admin" : "/student")
      } else {
        setError("Account creation failed. ID may already exist.")
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="bg-blue-900 text-white">
          <CardHeader>
            <CardTitle className="text-3xl">Welcome to</CardTitle>
            <CardDescription className="text-blue-200">Attendance Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Efficiently manage and track attendance for teachers and students.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? "Login" : "Create Account"}</CardTitle>
            <CardDescription>
              {isLogin ? "Enter your credentials to access the system" : "Fill in the details to create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
              {!isLogin && <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />}
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <RadioGroup
                  defaultValue="student"
                  onValueChange={(value) => setUserType(value as "student" | "teacher" | "admin")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher">Teacher</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button onClick={handleSubmit} className="w-full mb-2">
              {isLogin ? "Login" : "Create Account"}
            </Button>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full">
              {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

