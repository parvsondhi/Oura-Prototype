import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Heart, Flame, Moon, Activity, BarChart2, Clock, Calendar, Zap, Award, Target, ArrowUp, ChevronRight, Plus } from 'lucide-react';

const mockWeeklyData = [
  { day: 'Mon', activity: 87, sleep: 75, readiness: 82, steps: 8500, calories: 450, activeTime: 95 },
  { day: 'Tue', activity: 92, sleep: 68, readiness: 78, steps: 10200, calories: 520, activeTime: 125 },
  { day: 'Wed', activity: 78, sleep: 82, readiness: 85, steps: 7800, calories: 380, activeTime: 85 },
  { day: 'Thu', activity: 65, sleep: 70, readiness: 72, steps: 5600, calories: 310, activeTime: 65 },
  { day: 'Fri', activity: 72, sleep: 74, readiness: 80, steps: 6900, calories: 390, activeTime: 90 },
  { day: 'Sat', activity: 88, sleep: 78, readiness: 82, steps: 9200, calories: 480, activeTime: 115 },
  { day: 'Sun', activity: 85, sleep: 80, readiness: 88, steps: 8800, calories: 460, activeTime: 105 }
];

const mockHeartRateData = [
  { time: '12am', rate: 58 },
  { time: '2am', rate: 52 },
  { time: '4am', rate: 50 },
  { time: '6am', rate: 55 },
  { time: '8am', rate: 70 },
  { time: '10am', rate: 85 },
  { time: '12pm', rate: 78 },
  { time: '2pm', rate: 82 },
  { time: '4pm', rate: 88 },
  { time: '6pm', rate: 75 },
  { time: '8pm', rate: 68 },
  { time: '10pm', rate: 60 }
];

const mockChallengeData = [
  { name: 'Team Alpha', progress: 85 },
  { name: 'Team Beta', progress: 78 },
  { name: 'Team Gamma', progress: 92 },
  { name: 'Your Team', progress: 88 }
];

const EnhancedOuraDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activePage, setActivePage] = useState('home');
  const [activeMetric, setActiveMetric] = useState('calories');
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2 text-xl">≡</div>
          <div className="ml-1 text-sm">Feb 22, 2025</div>
        </div>
        <div className="text-xl font-bold">OURA</div>
      </div>
      
      {/* Tabs */}
      <div className="flex bg-gray-800 p-1 rounded-lg mx-4 mt-4">
        <button 
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'overview' ? 'bg-blue-600' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'trends' ? 'bg-blue-600' : ''}`}
          onClick={() => setActiveTab('trends')}
        >
          Trends
        </button>
        <button 
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'social' ? 'bg-blue-600' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          Social
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'overview' && (
          <>
            {/* Activity Summary Card */}
            <div className="bg-[#233555] rounded-xl p-5 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">Today's Activity</h2>
                  <div className="text-4xl font-bold mt-2">87</div>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+12 from yesterday</span>
                  </div>
                </div>
                <div className="bg-[#1a2640] p-3 rounded-lg">
                  <Flame className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <button 
                  className={`bg-[#1a2640] p-3 rounded-lg ${activeMetric === 'steps' ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setActiveMetric('steps')}
                >
                  <div className="text-xs text-blue-200">Steps</div>
                  <div className="text-lg font-semibold">8,935</div>
                </button>
                <button 
                  className={`bg-[#1a2640] p-3 rounded-lg ${activeMetric === 'calories' ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setActiveMetric('calories')}
                >
                  <div className="text-xs text-blue-200">Calories</div>
                  <div className="text-lg font-semibold">542</div>
                </button>
                <button 
                  className={`bg-[#1a2640] p-3 rounded-lg ${activeMetric === 'activeTime' ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setActiveMetric('activeTime')}
                >
                  <div className="text-xs text-blue-200">Active Time</div>
                  <div className="text-lg font-semibold">2h 15m</div>
                </button>
              </div>
              
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4a5568" />
                    <XAxis dataKey="day" tick={{ fill: '#a0aec0' }} axisLine={false} tickLine={false} />
                    <Bar 
                      dataKey={activeMetric} 
                      fill="#1a2640" 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={500}
                      label={(props) => {
                        const { x, y, width, value } = props;
                        const displayValue = activeMetric === 'activeTime' 
                          ? `${Math.floor(value/60)}h${value%60}m` 
                          : value;
                        return (
                          <text 
                            x={x + width / 2} 
                            y={y - 6} 
                            fill="#a0aec0" 
                            textAnchor="middle" 
                            fontSize={10}
                          >
                            {displayValue}
                          </text>
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Heart Rate Monitoring */}
            <div className="bg-gray-800 rounded-xl p-5 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Heart Rate</h2>
                <div className="flex items-center">
                  <div className="text-2xl font-bold mr-1">65</div>
                  <div className="text-gray-400">BPM</div>
                </div>
              </div>
              
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHeartRateData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4a5568" />
                    <XAxis dataKey="time" tick={{ fill: '#a0aec0' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#a0aec0' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#fc8181" 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#fc8181', stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Resting</div>
                  <div className="text-lg font-semibold">52 BPM</div>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Average</div>
                  <div className="text-lg font-semibold">68 BPM</div>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Peak</div>
                  <div className="text-lg font-semibold">125 BPM</div>
                </div>
              </div>
            </div>
            
            
          {/* Digital Twin Preview Card */}
          {/* <div className="bg-[#233555] rounded-xl p-5 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold">Your Digital Twin</h2>
                <div className="bg-blue-600 text-xs px-2 py-1 rounded-full">NEW</div>
              </div>
              
              <div className="text-sm text-gray-300 mb-3">
                See how today's choices shape your future health and performance.
              </div>
              
              <div className="bg-[#1a2640] rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Current Status</div>
                  <div className="text-xs text-blue-300">Balanced</div>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">Cardiovascular System</div>
                    <div className="w-full bg-gray-600 h-1.5 rounded-full mt-1">
                      <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400">Nervous System</div>
                    <div className="w-full bg-gray-600 h-1.5 rounded-full mt-1">
                      <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full bg-blue-600 py-3 rounded-lg font-medium"
                onClick={() => setActivePage('digitalTwin')}
              >
                Explore Your Digital Twin
              </button>
            </div> */}
            
            {/* Personalized Recommendations */}
            <div className="bg-gray-800 rounded-xl p-5 mb-4">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-gray-300 mr-2" />
                <h2 className="text-xl font-bold text-gray-100">For You Today</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                  <div className="bg-gray-600 p-2 rounded-lg mr-3">
                    <Activity className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-100">10-minute recovery walk</div>
                    <div className="text-xs text-gray-400">Based on your heart rate recovery pattern</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                  <div className="bg-gray-600 p-2 rounded-lg mr-3">
                    <Moon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-100">Try deep breathing before bed</div>
                    <div className="text-xs text-gray-400">Improve your sleep quality score</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>
            
            {/* Timeline Section */}
            <div className="mb-4">
              <div className="text-xl font-bold mb-2">Timeline</div>
              <div className="flex gap-2 mb-4 overflow-x-auto">
                <button className="bg-white bg-opacity-20 rounded-full px-4 py-2 flex items-center gap-1 whitespace-nowrap">
                  <div>🏷️</div>
                  <span>Add a tag</span>
                </button>
                <button className="bg-white bg-opacity-20 rounded-full px-4 py-2 flex items-center gap-1 whitespace-nowrap">
                  <Flame className="w-4 h-4" />
                  <span>Add an activity</span>
                </button>
                <button className="bg-white bg-opacity-20 rounded-full px-4 py-2 flex items-center gap-1 whitespace-nowrap">
                  <div>🍽️</div>
                  <span>Log a meal</span>
                </button>
              </div>
              
              {/* Timeline Items */}
              <div className="relative border-l-2 border-gray-700 ml-4 pl-6 pb-4">
                {/* First timeline item */}
                <div className="absolute top-0 left-0 w-8 h-8 -ml-4 bg-white rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-black" />
                </div>
                <div className="text-sm text-gray-400 mb-1">9:29–9:59 PM</div>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">Walking</div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>30m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>101 Cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>89 bpm</span>
                    </div>
                  </div>
                </div>
                
                {/* Second timeline item */}
                <div className="absolute top-32 left-0 w-8 h-8 -ml-4 bg-white rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-black" />
                </div>
                <div className="text-sm text-gray-400 mb-1">8:09–8:32 PM</div>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">Walking</div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>23m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>77 Cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>90 bpm</span>
                    </div>
                  </div>
                </div>
                
               {/* Third timeline item */}
                <div className="absolute top-64 left-0 w-8 h-8 -ml-4 bg-white rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-black" />
                </div>
                <div className="text-sm text-gray-400 mb-1">12:58–1:10 PM</div>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">Walking</div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>12m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>40 Cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>79 bpm</span>
                    </div>
                  </div>
                </div>
                
                {/* Woke up item */}
                <div className="absolute top-96 left-0 w-8 h-8 -ml-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-black text-xs">☀️</div>
                </div>
                <div className="text-sm text-gray-400 mb-1">8:20 AM</div>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">Woke up</div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Moon className="w-4 h-4" />
                      <span>5h 54m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      <span>75</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 flex items-center justify-center">🌙</div>
                      <span>66</span>
                    </div>
                  </div>
                </div>
                
                <button className="bg-white rounded-full w-full py-3 mb-4 text-black font-medium flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>View full timeline</span>
                </button>
              </div>
            </div>
            
            {/* What's New Section */}
            <div className="mb-16">
              <div className="text-xl font-bold mb-4">What's new</div>
              
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {/* Promo Card */}
                <div className="relative bg-gray-200 rounded-lg overflow-hidden flex-shrink-0" style={{ width: "320px", height: "240px" }}>
                  <button className="absolute top-2 right-2 bg-white bg-opacity-30 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                    <span className="text-sm font-bold">✕</span>
                  </button>
                  <div className="p-4 text-black h-full flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-bold mb-2">GET ALL WRAPPED UP IN WELLNESS THIS YEAR</div>
                      <div className="text-sm">
                        Gift everyone on your list—including yourself—10% off our smartest and most comfortable ring yet.
                      </div>
                    </div>
                    <button className="bg-white border border-gray-300 rounded-full w-full py-2 text-black font-medium mt-4">
                      Share your link
                    </button>
                  </div>
                </div>
                
                {/* Blog Card */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden flex-shrink-0" style={{ width: "320px", height: "240px" }}>
                  <button className="absolute top-2 right-2 bg-white bg-opacity-30 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                    <span className="text-sm font-bold">✕</span>
                  </button>
                  <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    The Pulse Blog
                  </div>
                  <div className="pt-12 pb-4 px-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-bold mb-2">How to Boost Your Resilience</div>
                      <div className="text-sm text-gray-300">
                        Oura members share strategies they've used to improve their Resilience levels, finding balance between stress and recovery.
                      </div>
                    </div>
                    <button className="bg-white rounded-full w-full py-2 text-black font-medium flex items-center justify-center gap-2 mt-4">
                      <span>Learn more</span>
                      <span>↗️</span>
                    </button>
                  </div>
                </div>
                
                {/* Additional Card */}
                <div className="relative bg-indigo-900 rounded-lg overflow-hidden flex-shrink-0" style={{ width: "320px", height: "240px" }}>
                  <button className="absolute top-2 right-2 bg-white bg-opacity-30 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                    <span className="text-sm font-bold">✕</span>
                  </button>
                  <div className="absolute top-4 left-4 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                  <div className="pt-12 pb-4 px-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-bold mb-2">Sleep Better with Breathing</div>
                      <div className="text-sm text-indigo-300">
                        Try these 5-minute pre-bed routines to help calm your nervous system and prepare for deeper sleep.
                      </div>
                    </div>
                    <button className="bg-white rounded-full w-full py-2 text-black font-medium flex items-center justify-center gap-2 mt-4">
                      <span>Try tonight</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'trends' && (
          <>
            <div className="bg-gray-800 rounded-xl p-5 mb-4">
              <h2 className="text-xl font-bold mb-4">Weekly Trends</h2>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4a5568" />
                    <XAxis dataKey="day" tick={{ fill: '#a0aec0' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#a0aec0' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="activity" 
                      stroke="#4299e1" 
                      strokeWidth={3}
                      activeDot={{ r: 6, fill: '#4299e1', stroke: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="#9f7aea" 
                      strokeWidth={3}
                      activeDot={{ r: 6, fill: '#9f7aea', stroke: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="readiness" 
                      stroke="#48bb78" 
                      strokeWidth={3}
                      activeDot={{ r: 6, fill: '#48bb78', stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-900 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Activity Streak</h3>
                  <div className="bg-blue-800 px-2 py-1 rounded text-sm">12 days</div>
                </div>
                <div className="text-3xl font-bold mb-1">75%</div>
                <div className="text-sm text-blue-300">of your monthly goal</div>
                <div className="w-full bg-blue-800 h-2 rounded-full mt-3">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-purple-900 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Sleep Quality</h3>
                  <div className="bg-purple-800 px-2 py-1 rounded text-sm">Improving</div>
                </div>
                <div className="text-3xl font-bold mb-1">+8%</div>
                <div className="text-sm text-purple-300">compared to last week</div>
                <div className="w-full bg-purple-800 h-2 rounded-full mt-3">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-5 mb-4">
              <h2 className="text-xl font-bold mb-3">Monthly Insights</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Most active days</div>
                  <div className="font-medium">Tuesday & Saturday</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Optimal sleep window</div>
                  <div className="font-medium">11:00 PM - 7:30 AM</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Activity sweet spot</div>
                  <div className="font-medium">450-550 active calories</div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'social' && (
          <>
            <div className="bg-gray-800 rounded-xl p-5 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-100">Team Challenge</h2>
                <div className="bg-blue-600 text-sm px-3 py-1 rounded-full">Active</div>
              </div>
              
              <div className="text-sm text-gray-400 mb-2">February Step Challenge</div>
              <div className="text-lg font-medium mb-4">8 days remaining</div>
              
              <div className="space-y-3">
                {mockChallengeData.map((team, index) => (
                  <div key={index} className={`bg-gray-700 p-3 rounded-lg ${team.name === 'Your Team' ? 'border-2 border-blue-500' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-gray-100">{team.name}</div>
                      <div className="text-sm text-gray-300">{team.progress}%</div>
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${team.name === 'Your Team' ? 'bg-blue-500' : 'bg-gray-400'}`} 
                        style={{ width: `${team.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-blue-600 py-3 rounded-lg mt-4 font-medium text-white">
                View Challenge Details
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-5 mb-4">
              <h2 className="text-xl font-bold mb-4 text-gray-100">Friends Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-100">John D.</div>
                    <div className="text-sm text-gray-400">Completed a 5K run • 35 mins ago</div>
                  </div>
                  <div className="bg-green-800 px-2 py-1 rounded text-xs text-green-300">
                    +2 badges
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-100">Amy S.</div>
                    <div className="text-sm text-gray-400">Perfect sleep score • 2 hours ago</div>
                  </div>
                  <div className="bg-purple-800 px-2 py-1 rounded text-xs text-purple-300">
                    4-day streak
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-100">Mike K.</div>
                    <div className="text-sm text-gray-400">New activity record • Yesterday</div>
                  </div>
                  <div className="bg-blue-800 px-2 py-1 rounded text-xs text-blue-300">
                    12K steps
                  </div>
                </div>
              </div>
              
              <button className="w-full border border-gray-600 py-3 rounded-lg mt-4 font-medium text-gray-100">
                View All Activity
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-5 mb-4">
              <h2 className="text-xl font-bold mb-4 text-gray-100">Your Badges</h2>
              
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Recently Earned</div>
                <div className="flex overflow-x-auto space-x-4 pb-2">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs text-center">7-Day Streak</div>
                  </div>
                  
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                      <Moon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs text-center">Deep Sleep Pro</div>
                  </div>
                  
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs text-center">Recovery Master</div>
                  </div>
                  
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs text-center">10K Champion</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Progress</div>
                <div className="space-y-3">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-gray-100">Night Owl to Early Bird</div>
                      <div className="text-xs text-blue-300">2/3 days</div>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      Maintain a consistent sleep schedule 3 days in a row
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium text-gray-100">Weekend Warrior</div>
                      <div className="text-xs text-blue-300">Silver</div>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      Complete high-intensity activities on weekends
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full border border-gray-600 py-3 rounded-lg font-medium text-gray-100">
                Explore All Badges
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div className="bg-gray-900 border-t border-gray-800 py-4 px-8 flex justify-between">
        <button className="flex flex-col items-center text-blue-400">
          <Flame className="w-6 h-6" />
          <span className="text-xs mt-1">Today</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">Vitals</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">My Health</span>
        </button>
      </div>
    </div>
  );
};

export default EnhancedOuraDashboard;