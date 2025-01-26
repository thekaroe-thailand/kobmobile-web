'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../config";
import { useEffect, useState } from "react";
import Modal from "./modal";

export default function Sidebar() {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const router = useRouter();
    const [isShow, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const res = await axios.get(`${config.apiUrl}/user/info`, {
            headers: headers
        });

        setName(res.data.name);
        setUsername(res.data.username);
        setLevel(res.data.level);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    const handleSave = async () => {
        // validate password and confirm password
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณาตรวจสอบรหัสผ่านอีกครั้ง'
            });
            return;
        }

        // save data
        const payload = {
            name: name,
            username: username,
            password: password,
            level: level
        }
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        await axios.put(`${config.apiUrl}/user/update`, payload, {
            headers: headers
        });
        fetchData();
        handleCloseModal();
    }

    return (
        <div className="bg-teal-600 h-screen w-64 fixed">
            <div className="p-5 bg-teal-800 text-white">
                <h1 className="text-xl">KobMobile Version 1.0</h1>
                <div className="flex items-center gap-2 mt-3">
                    <i className="fa fa-user"></i>
                    <span className="w-full">{name} : {level}</span>
                    <button onClick={handleShowModal} className="bg-blue-500 rounded-full px-2 py-1">
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button onClick={handleLogout} className="bg-red-500 rounded-full px-2 py-1">
                        <i className="fa fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
            <div className="p-5 text-white text-xl flex flex-col gap-2">
                {level === 'admin' && (
                    <>
                        <div>
                            <Link href="/backoffice/dashboard">
                                <i className="fa fa-tachometer-alt mr-2 w-[25px] text-center"></i>
                                Dashboard
                            </Link>
                        </div>
                        <div>
                            <Link href="/backoffice/buy">
                                <i className="fa fa-shopping-cart mr-2 w-[25px] text-center"></i>
                                ซื้อสินค้า
                            </Link>
                        </div>
                    </>
                )}
                <div>
                    <Link href="/backoffice/sell">
                        <i className="fa fa-dollar-sign mr-2 w-[25px] text-center"></i>
                        ขายสินค้า
                    </Link>
                </div>
                <div>
                    <Link href="/backoffice/repair">
                        <i className="fa fa-wrench mr-2 w-[25px] text-center"></i>
                        รับซ่อม
                    </Link>
                </div>
                {level === 'admin' && (
                    <>
                        <div>
                            <Link href="/backoffice/company">
                                <i className="fa fa-building mr-2 w-[25px] text-center"></i>
                                ข้อมูลร้าน
                            </Link>
                        </div>
                        <div>
                            <Link href="/backoffice/user">
                                <i className="fa fa-users mr-2 w-[25px] text-center"></i>
                                ผู้ใช้งาน
                            </Link>
                        </div>
                    </>
                )}
            </div>

            <Modal title="แก้ไขข้อมูลผู้ใช้งาน" isOpen={isShow} onClose={handleCloseModal}>
                <div>
                    <div>ชื่อผู้ใช้งาน</div>
                    <input type="text" value={name}
                        onChange={(e) => setName(e.target.value)} className="form-control" />

                    <div className="mt-3">username</div>
                    <input type="text" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control" />

                    <div className="mt-3">รหัสผ่าน</div>
                    <input type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control" />

                    <div className="mt-3">ยืนยันรหัสผ่าน</div>
                    <input type="text"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control" />

                    <div className="mt-3">
                        <button className="btn" onClick={handleSave}>
                            <i className="fa fa-save mr-2"></i>
                            บันทึก
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}