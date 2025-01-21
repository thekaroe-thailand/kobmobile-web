'use client';

import { useEffect, useState } from "react";
import { config } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";

export default function Page() {
    const [serial, setSerial] = useState('');
    const [price, setPrice] = useState(0);

    const handleSave = async () => {
        try {
            const payload = {
                serial: serial,
                price: price
            }
            await axios.post(`${config.apiUrl}/sell/create`, payload);
            fetchData();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message
            });
        }
    }

    const fetchData = async () => {

    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="content-header">ขายสินค้า</div>
            <div className="flex gap-2 items-end">
                <div className="w-full">
                    <div>serial</div>
                    <input type="text"
                        onChange={(e) => setSerial(e.target.value)} />
                </div>
                <div className="text-right">
                    <div>ราคา</div>
                    <input type="number"
                        className="text-right"
                        onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div>
                    <button className="btn flex items-center" onClick={handleSave}>
                        <i className="fa-solid fa-save mr-2"></i>
                        บันทึก
                    </button>
                </div>
            </div>
        </div>
    )
}
