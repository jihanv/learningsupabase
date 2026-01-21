import { useEffect } from "react";
import supabase from "./supabase-client";

function Dashboard() {


    async function fetchMetrics() {
        const { data, error } = await supabase
            .from("sales_deals")
            .select("name, value")
            .order("value", { ascending: false })
            .limit(1)
            .maybeSingle(); // returns object or null

        if (error) {
            console.error(error);
            return;
        } else {
            console.log(data)
        }


    }
    useEffect(() => {
        fetchMetrics()
    }, [])
    return (
        <div className="dashboard-wrapper">
            <div className="chart-container">
                <h2>Total Sales This Quarter ($)</h2>
            </div>
        </div>
    );
}

export default Dashboard;