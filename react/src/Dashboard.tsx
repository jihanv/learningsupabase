import { useEffect, useState } from "react";
import supabase from "./supabase-client";

type Metric = { name: string; sum: number };

function Dashboard() {


    const [metrics, setMetrics] = useState<Metric[]>([]);

    async function fetchMetrics() {


        try {
            const { data, error } = await supabase
                .from('sales_deals')
                .select(
                    `name,
                value.sum()
                `,
                )
            if (error) {
                throw error
            }
            console.log(data)
            setMetrics(data ?? [])

        } catch (error) {
            console.error("Error fetching metrics: ", error)
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