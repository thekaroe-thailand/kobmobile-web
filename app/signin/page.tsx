'use client'

import { useState } from 'react'
import { config } from '../config'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSignIn = async () => {
        try {
            const paylaod = {
                username: username,
                password: password,
            }
            const response = await axios.post(`${config.apiUrl}/user/signin`, paylaod)

            if (response.data.token !== null) {
                localStorage.setItem('token', response.data.token)

                if (response.data.level === 'admin') {
                    router.push('/backoffice/dashboard')
                } else {
                    router.push('/backoffice/sell')
                }
            } else {
                Swal.fire({
                    title: 'ตรวจสอบ user',
                    text: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง',
                    icon: 'warning',
                    timer: 2000
                })
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                alert('ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: error.mesage,
                    icon: 'error',
                })
            }
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1 className="text-2xl font-bold">Sign In</h1>

                <div>Username</div>
                <input type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <div className="mt-4">Password</div>
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button className="mt-4" onClick={handleSignIn}>
                    Sign In
                    <i className="fa fa-sign-in-alt ml-2"></i>
                </button>
            </div>
        </div>
    );
}
