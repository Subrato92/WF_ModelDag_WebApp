"use client"

export default function FAB({onClick, children}){

    return (
        <div style={{ 
                width:"50px", 
                height: "50px", 
                position: 'absolute', 
                right: "30px", 
                bottom: "30px", 
                background: "var(--wf-red)", 
                borderRadius: "50%", 
                color: "var(--wf-yellow)", 
                margin: "auto", 
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                zIndex: "5"  ,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"  
            }}
            onClick={onClick}
            >
            {children}
        </div>
    )
}