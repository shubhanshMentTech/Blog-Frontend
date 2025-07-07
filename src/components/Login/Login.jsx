import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"
import { AuthContext } from "../utils/authContext";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}) {

    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = document.getElementById("email").value
            const password = document.getElementById("password").value;
            const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
                email,
                password,
            });
            setToken(response.data.accessToken);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("email", email);
            localStorage.setItem("userId", response.data.userId);
            console.log("login token: ", response.data.accessToken)
            console.log("login userId: ", response.data.userId)
            navigate("/");
        } catch (error) {
            console.error("Authentication failed:", error);
            setToken(null);
            localStorage.removeItem("token");
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message if present in the error response
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };


    const [showPassword, setShowPassword] = useState(false);
return (
    <>
    {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
    <form className={cn("flex flex-col gap-6 border-2 px-6 py-9 rounded-3xl", className)} onSubmit={handleSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
            </p>
        </div>

        <div className="grid gap-6">
            <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            <div className="grid gap-3">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                        Forgot your password?
                    </a>
                </div>
                <div className=" w-full flex relative justify-between">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                    />
                    <Button
                        type="button"
                        tabIndex={-1}
                        className=""
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </Button>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Login
            </Button>
        </div>

        <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
                Sign up
            </a>
        </div>
    </form>
    </>
)
}
