import React, { useState, useMemo } from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

export default function OversupplyGraph({
  buyers = [],
  farmers = [],
  produces = [],
}) {
  const [selFarmer, setSelFarmer] = useState(0)
  const [selProduce, setSelProduce] = useState(0)

  const { chartData, maxTotal } = useMemo(() => {
    if (!buyers.length || !farmers.length || !produces.length) {
      return { chartData: { labels: [], datasets: [] }, maxTotal: 0 }
    }

    const supply = farmers[selFarmer].produce[selProduce].supply
    const used = []
    const excess = []
    const labels = []

    buyers.forEach((b) => {
      const { supply_limit, supply_current } = b.produce[selProduce]
      const capacityLeft = Math.max(0, supply_limit - supply_current)
      const u = Math.min(supply, capacityLeft)
      const e = Math.max(0, supply - capacityLeft)
      labels.push(b.store_name)
      used.push(u)
      excess.push(e)
    })

    const maxTotal = Math.max(...used.map((u, i) => u + excess[i]))
    return {
      chartData: {
        labels,
        datasets: [
          {
            label: 'Within Capacity',
            data: used,
            backgroundColor: '#4ade80',
            borderRadius: 4,
          },
          {
            label: 'Excess Supply',
            data: excess,
            backgroundColor: '#f87171',
            borderRadius: 4,
          },
        ],
      },
      maxTotal,
    }
  }, [buyers, farmers, produces, selFarmer, selProduce])

  const options = {
    scales: {
      x: {
        stacked: true,
        grid: { color: '#e5e7eb' },
        suggestedMax: Math.ceil(maxTotal * 1.1),
        ticks: { color: '#4b5563', font: { size: 12 } },
      },
      y: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#4b5563', font: { size: 12 } },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#374151', boxWidth: 12, boxHeight: 12, padding: 16 },
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#f9fafb',
        bodyColor: '#e5e7eb',
        cornerRadius: 4,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100">
        <h2 className="text-lg font-semibold text-emerald-800">
          {farmers[selFarmer]?.farm_name || 'Farmer'} –{' '}
          <span className="italic">{produces[selProduce] || 'Produce'}</span>
        </h2>
      </div>

      {/* Controls */}
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white">
        <div className="flex-1 min-w-[140px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Farmer
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={selFarmer}
            onChange={(e) => setSelFarmer(Number(e.target.value))}
          >
            {farmers.map((f, i) => (
              <option key={i} value={i}>
                {f.farm_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Produce
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={selProduce}
            onChange={(e) => setSelProduce(Number(e.target.value))}
          >
            {produces.map((p, i) => (
              <option key={i} value={i}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 py-6 bg-white h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
