"use client"
import styles from "@/components/core/styles/BottomNavBar.module.css"
import { useRouter } from 'next/navigation';

export default function BottomNavBar(){
const router = useRouter();
return (
    <div className={styles.navBar}>
        <div className="grid grid-cols-1 gap-4 pt-6">
            <span className="float-left gap-2 flex pl-12">
                <div className={styles.button}>
                    Home
                </div>
                <div className={styles.button}>
                    Contact India & Philippines
                </div>
                < div className={styles.button}>
                    Teamworks Policies
                </div>
                <div className={styles.button}>
                    Sites A-Z
                </div>
                <div className={styles.button}>
                    Report Inappropriate Use
                </div>
            </span>
            <p style={{display: "block", paddingLeft: "50px", fontSize: "14рх"}}>
                2025 Wells Fargo. Proprietary, confidential business information on Teamworks is for internal use only.
            </p>
        </div>
    </div>)
}