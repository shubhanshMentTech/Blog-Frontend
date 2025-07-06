import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useState } from "react"
import axios from "axios";


export function SignUpForm({
  className,
  ...props
}) {

    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const response = await axios.post("http://localhost:3000/api/auth/register", {
        fullName,
        email,
        password,
        phoneNumber,
      });
      setMessage(response.data.message);
      Navigate("/")
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      setMessage(error.response.data.error);
    }
  };


    const [showPassword, setShowPassword] = useState([false, false]);
    return (
        <>
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 border-2 px-6 py-9 rounded-3xl", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create your account
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" type="string" placeholder="John Doe" required />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" type="integer" placeholder="9999999999" required />
                </div>

                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="w-full flex relative justify-between">
                        <Input
                            id="password"
                            type={showPassword[0] ? "text" : "password"}
                            required
                        />
                        <Button
                            type="button"
                            tabIndex={-1}
                            className=""
                            onClick={() =>
                                setShowPassword(prev => [!prev[0], prev[1]])
                            }
                            aria-label={showPassword[0] ? "Hide password" : "Show password"}
                        >
                            {showPassword[0] ? <FaRegEyeSlash /> : <FaRegEye />}
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                    </div>
                    <div className="w-full flex relative justify-between">
                        <Input
                            id="confirm-password"
                            type={showPassword[1] ? "text" : "password"}
                            required
                        />
                        <Button
                            type="button"
                            tabIndex={-1}
                            className=""
                            onClick={() =>
                                setShowPassword(prev => [prev[0], !prev[1]])
                            }
                            aria-label={showPassword[1] ? "Hide password" : "Show password"}
                        >
                            {showPassword[1] ? <FaRegEyeSlash /> : <FaRegEye />}
                        </Button>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    signup
                </Button>
            </div>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                    Login
                </a>
            </div>
        </form>
        {message && <p>{message}</p>}
        </>
    )
}
