'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { config } from "../../config"
import Swal from "sweetalert2"
import Modal from "../modal"

export default function UserPage() {
    const [users, setUsers] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [level, setLevel] = useState('user')
    const [levelList, setLevelList] = useState(['admin', 'user'])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/user/list`)
            setUsers(response.data)
        } catch (error: any) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error'
            })
        }
    }

    const handleOpenModal = () => {
        setIsShowModal(true)
    }

    const handleCloseModal = () => {
        setIsShowModal(false)
    }

    const handleSave = async () => {
        try {
            if (password !== passwordConfirm) {
                Swal.fire({
                    icon: 'error',
                    title: 'ผิดพลาด',
                    text: 'รหัสผ่านไม่ตรงกัน',
                });
                return
            }

            const payload = {
                name: name,
                username: username,
                password: password,
                level: level
            }

            if (id === '') {
                await axios.post(`${config.apiUrl}/user/create`, payload)
            } else {
                await axios.put(`${config.apiUrl}/user/update/${id}`, payload)
                setId('')
            }

            fetchData()
            handleCloseModal()
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message,
            });
        }
    }

    const handleEdit = (id: string) => {
        const user = users.find((user: any) => user.id === id) as any

        setId(user.id)
        setName(user.name)
        setUsername(user.username)
        setLevel(user.level)
        setIsShowModal(true)
    }

    const handleDelete = async (id: string) => {
        try {
            const button = await Swal.fire({
                title: 'คุณต้องการลบผู้ใช้งานนี้หรือไม่?',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true,
            })

            if (button.isConfirmed) {
                await axios.delete(`${config.apiUrl}/user/remove/${id}`)
                fetchData()
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message,
            });
        }
    }

    return (
        <>
            <h1 className="content-header">ผู้ใช้งาน</h1>
            <div>
                <button className="btn" onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    เพิ่มผู้ใช้งาน
                </button>

                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th className="text-left">ชื่อผู้ใช้งาน</th>
                            <th className="text-left">username</th>
                            <th className="text-left">level</th>
                            <th className="w-[110px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.level}</td>
                                <td className="text-center">
                                    <button className="btn-edit mr-1" onClick={() => handleEdit(user.id)}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(user.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal title="เพิ่มผู้ใช้งาน" isOpen={isShowModal} onClose={handleCloseModal}>
                    <div>
                        <div>ชื่อผู้ใช้งาน</div>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <div>username</div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <div>password</div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <div>ยืนยัน password</div>
                        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <div>ระดับผู้ใช้งาน</div>
                        <select value={level} onChange={(e) => setLevel(e.target.value)} className="form-control">
                            {levelList.map((item: any) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <button className="btn" onClick={handleSave}>
                            <i className="fa-solid fa-save mr-2"></i>
                            เพิ่มผู้ใช้งาน
                        </button>
                    </div>
                </Modal>
            </div>
        </>
    );
}