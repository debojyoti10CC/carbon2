import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Download, FileText, Calendar, Users, Leaf, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const ESGDashboard = () => {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [facility, setFacility] = useState('All Facilities');
  const [activeTab, setActiveTab] = useState('overview');

  const emissionData = [
    { month: 'Jan', scope1: 45, scope2: 65, scope3: 120 },
    { month: 'Feb', scope1: 42, scope2: 62, scope3: 115 },
    { month: 'Mar', scope1: 38, scope2: 58, scope3: 110 },
    { month: 'Apr', scope1: 35, scope2: 55, scope3: 105 },
    { month: 'May', scope1: 32, scope2: 52, scope3: 100 },
    { month: 'Jun', scope1: 30, scope2: 48, scope3: 95 }
  ];

  const socialMetrics = [
    { metric: 'Safety Incidents', value: 2, target: 0, status: 'warning' },
    { metric: 'Employee Satisfaction', value: 87, target: 90, status: 'good' },
    { metric: 'Training Hours', value: 2840, target: 2500, status: 'excellent' },
    { metric: 'Diversity Ratio', value: 0.42, target: 0.50, status: 'warning' }
  ];

  const governanceData = [
    { name: 'Board Independence', value: 75, fill: '#4CAF50' },
    { name: 'Risk Management', value: 92, fill: '#2196F3' },
    { name: 'Transparency', value: 88, fill: '#FF9800' },
    { name: 'Ethics Training', value: 95, fill: '#9C27B0' }
  ];

  const complianceData = [
    { framework: 'GRI Standards', status: 'compliant', progress: 95, color: '#4CAF50' },
    { framework: 'SASB', status: 'compliant', progress: 88, color: '#4CAF50' },
    { framework: 'TCFD', status: 'in-progress', progress: 72, color: '#FF9800' },
    { framework: 'CDP', status: 'compliant', progress: 91, color: '#4CAF50' },
    { framework: 'UN Global Compact', status: 'compliant', progress: 96, color: '#4CAF50' },
    { framework: 'ISO 14001', status: 'pending', progress: 45, color: '#F44336' }
  ];

  const MetricCard = ({ title, value, unit, change, status, target, icon: Icon }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        status === 'excellent' ? 'bg-green-500' :
        status === 'good' ? 'bg-blue-500' :
        status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
      }`} />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-slate-400" />
          <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          status === 'excellent' ? 'bg-green-900 text-green-300' :
          status === 'good' ? 'bg-blue-900 text-blue-300' :
          status === 'warning' ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
        }`}>
          {status === 'excellent' ? 'Excellent' :
           status === 'good' ? 'Good' :
           status === 'warning' ? 'Warning' : 'Critical'}
        </span>
      </div>
      
      <div className="text-3xl font-bold text-white mb-2">
        {value}{unit}
      </div>
      
      <div className="flex items-center gap-2">
        {change > 0 ? (
          <TrendingUp className="w-4 h-4 text-red-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-green-500" />
        )}
        <span className={`text-sm font-medium ${change > 0 ? 'text-red-500' : 'text-green-500'}`}>
          {Math.abs(change)}% vs last period
        </span>
      </div>
      
      {target && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-xs text-slate-500 mb-1">Target: {target}{unit}</div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ESG Reporting & Compliance</h1>
          <p className="text-slate-400">Environmental, Social, and Governance performance metrics and regulatory compliance tracking</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <select 
            className="bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 12 months</option>
          </select>
          <select 
            className="bg-slate-800 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
          >
            <option>All Facilities</option>
            <option>Plant A - Assembly</option>
            <option>Plant B - Packaging</option>
            <option>Plant C - Processing</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-slate-700">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'environmental', label: 'Environmental', icon: Leaf },
            { id: 'social', label: 'Social', icon: Users },
            { id: 'governance', label: 'Governance', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === id
                  ? 'text-green-400 border-green-400'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Carbon Intensity"
                value="24.8"
                unit=" tCO₂e/MWh"
                change={-2.3}
                status="good"
                target="22.0"
                icon={Leaf}
              />
              <MetricCard
                title="Safety Score"
                value="94.2"
                unit="/100"
                change={1.8}
                status="excellent"
                target="95.0"
                icon={Shield}
              />
              <MetricCard
                title="Employee Engagement"
                value="87"
                unit="%"
                change={3.2}
                status="good"
                target="90"
                icon={Users}
              />
              <MetricCard
                title="Compliance Rating"
                value="91"
                unit="%"
                change={-1.1}
                status="good"
                target="95"
                icon={CheckCircle}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Emission Trends by Scope</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={emissionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="scope3" stackId="1" stroke="#EF4444" fill="#EF4444" />
                    <Area type="monotone" dataKey="scope2" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                    <Area type="monotone" dataKey="scope1" stackId="1" stroke="#10B981" fill="#10B981" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Governance Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={governanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {governanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Environmental Tab */}
        {activeTab === 'environmental' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Total Emissions"
                value="98.2"
                unit=" tCO₂e"
                change={-1.8}
                status="good"
                target="95.0"
                icon={Leaf}
              />
              <MetricCard
                title="Energy Consumption"
                value="1,247"
                unit=" MWh"
                change={-3.2}
                status="excellent"
                target="1,200"
                icon={Leaf}
              />
              <MetricCard
                title="Waste Diverted"
                value="89"
                unit="%"
                change={2.1}
                status="excellent"
                target="85"
                icon={Leaf}
              />
            </div>
            
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Environmental Performance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={emissionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Line type="monotone" dataKey="scope1" stroke="#10B981" strokeWidth={3} />
                  <Line type="monotone" dataKey="scope2" stroke="#F59E0B" strokeWidth={3} />
                  <Line type="monotone" dataKey="scope3" stroke="#EF4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialMetrics.map((metric, index) => (
                <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <h4 className="text-sm font-medium text-slate-400 mb-2">{metric.metric}</h4>
                  <div className="text-2xl font-bold mb-2">
                    {typeof metric.value === 'number' && metric.value < 1 
                      ? (metric.value * 100).toFixed(0) + '%'
                      : metric.value.toLocaleString()}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    metric.status === 'excellent' ? 'bg-green-900 text-green-300' :
                    metric.status === 'good' ? 'bg-blue-900 text-blue-300' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {metric.status === 'excellent' ? 'Exceeds Target' :
                     metric.status === 'good' ? 'On Track' : 'Needs Attention'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Framework Status */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Compliance Framework Status</h3>
          <div className="space-y-4">
            {complianceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
                  <div>
                    <h4 className="font-medium">{item.framework}</h4>
                    <p className="text-sm text-slate-400">{item.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{item.progress}%</div>
                    <div className="w-32 bg-slate-600 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${item.progress}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                  {item.status === 'compliant' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 flex-wrap">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            Generate Report
          </button>
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Calendar className="w-4 h-4" />
            Schedule Report
          </button>
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <FileText className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESGDashboard;