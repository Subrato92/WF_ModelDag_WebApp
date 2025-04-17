"use client"
import styles from "@/components/core/styles/TopNavBar.module.css"
import { useRouter } from 'next/navigation';

export default function TopNavBar(){
    const router = useRouter();
    return (
        <div className={styles.navBar}>
            <span className={styles.title +" float-left"} onClick={() => router.push('/')}> MMR ValOps</span>
            <span className="float-right gap-2 flex pr-6">
                <div className={styles.button}>
                    About
                </div>
                <div className={styles.button}>
                    Docs
                </div>
                <div className={styles.user}>
                    Subrato Mondal
                </div>
            </span>
        </div>
    )
}