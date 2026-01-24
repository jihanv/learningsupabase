import { useEffect, useState } from "react";
import supabase from "./supabase-client";
import { Chart } from "react-charts";

type Metric = { name: string; sum: number };
type ChartDataPoint = { primary: string; secondary: number };

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

    const chartData = [
        {
            data: metrics.map((metric) => ({
                primary: metric.name,
                secondary: metric.sum
            }))
        }
    ]
    useEffect(() => {
        fetchMetrics()

        //Realtime subscription
        const channel = supabase
            .channel('deal-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'sales_deals'
                },
                (payload) => {
                    fetchMetrics();
                })
            .subscribe();

        // Clean up subscription
        return () => {
            supabase.removeChannel(channel);
        };
    }, [])
    function y_max() {
        if (metrics.length > 0) {
            const maxSum = Math.max(...metrics.map((m) => m.sum));
            return maxSum + 2000;
        }
        return 5000;
    }
    const primaryAxis = {
        getValue: (d: ChartDataPoint) => d.primary,
        scaleType: 'band' as const,
        padding: 0.2,
        position: 'bottom' as const,
    };
    const secondaryAxes = [
        {
            getValue: (d: ChartDataPoint) => d.secondary,
            scaleType: 'linear' as const,
            elementType: "bar" as const,
            min: 0,
            max: y_max(),
            padding: {
                top: 20,
                bottom: 40,
            },
        },
    ];
    return (
        <div className="dashboard-wrapper">
            <div className="chart-container">
                <h2>Total Sales This Quarter ($)</h2>
                <div style={{ flex: 1 }}>
                    <Chart
                        options={{
                            data: chartData,
                            primaryAxis,
                            secondaryAxes,
                            defaultColors: ['#58d675'],
                            tooltip: {
                                show: false,
                            },
                        }}
                    />
                </div>
            </div>

        </div>
    );
}

export default Dashboard;