'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Filter, 
  MapPin, 
  Search, 
  Layers, 
  Navigation, 
  AlertCircle, 
  Crosshair, 
  Info,
  Maximize2,
  Minimize2,
  ChevronRight,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export default function EmergencyMapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY
  });

  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeLayer, setActiveLayer] = useState('Heatmap');

  // Task 10: Firestore real-time listener
  useEffect(() => {
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setIncidents(docs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] w-full flex relative overflow-hidden bg-[#050505]">
      
      {/* 1. Left Control Panel */}
      <div className={`h-full bg-[#0A0A0A] border-r border-[#1A1A1A] flex flex-col z-20 transition-all duration-500 shadow-2xl ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-[320px] opacity-100'}`}>
        <div className="p-6 border-b border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-display tracking-tight">Active Map</h2>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input 
              type="text" 
              placeholder="Search coordinates or IDs..." 
              className="w-full bg-[#030303] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          {/* Layer Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Layers size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Map Layers</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Heatmap', 'Satellite', 'Terrain', 'Traffic'].map(layer => (
                <button 
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    activeLayer === layer 
                      ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                      : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>

          {/* Quick List */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-zinc-500">
              <AlertCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Recent Alerts</span>
            </div>
            <div className="space-y-3">
              {incidents.slice(0, 10).map(incident => (
                <div 
                  key={incident.id} 
                  onClick={() => setSelectedIncident(incident)}
                  className="p-3 rounded-xl bg-[#030303] border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{incident.id.slice(0, 8)}</span>
                    <span className="text-[9px] font-bold text-zinc-600">
                      {incident.createdAt?.seconds ? new Date(incident.createdAt.seconds * 1000).toLocaleTimeString() : 'Recent'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white mb-1">{incident.problem_type || 'Incident'}</h4>
                  <div className="flex items-center gap-2">
                    <MapPin size={10} className="text-zinc-600" />
                    <span className="text-[10px] font-bold text-zinc-500">{incident.area || 'Unknown Region'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Map Area */}
      <div className="flex-1 relative bg-[#030303]">
        {/* Map UI Elements */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="w-10 h-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-2xl"
          >
            {isSidebarCollapsed ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
        </div>

        {/* Real Google Map */}
        <div className="absolute inset-0 z-0">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              options={{
                styles: darkMapStyle,
                disableDefaultUI: true,
                zoomControl: false,
              }}
            >
              {incidents.map((incident) => (
                <Marker
                  key={incident.id}
                  position={{ lat: incident.latitude || 40.71, lng: incident.longitude || -74.00 }}
                  onClick={() => setSelectedIncident(incident)}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                    fillColor: incident.urgency_level === 'Critical' || incident.urgency_level === 'High' ? '#ef4444' : '#f59e0b',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: '#ffffff',
                    scale: 1.5,
                  }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Activity className="text-indigo-500 animate-spin" size={48} />
            </div>
          )}
        </div>

        {/* 3. Detail Drawer (Slide-in) */}
        <div className={`absolute top-0 right-0 bottom-0 w-[400px] bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-white/5 transform transition-all duration-500 ease-in-out z-30 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col ${selectedIncident ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedIncident && (
            <>
              <div className="p-8 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -mr-16 -mt-16" />
                <button 
                  onClick={() => setSelectedIncident(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all font-bold"
                >
                  &times;
                </button>
                
                <div className="space-y-4 relative">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-md border ${
                      selectedIncident.urgency_level === 'Critical' || selectedIncident.urgency_level === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {selectedIncident.urgency_level || 'Medium'}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 tracking-widest">{selectedIncident.area}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display leading-tight">{selectedIncident.problem_type}</h3>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Clock size={14} />
                    <span className="text-xs font-medium">Reported {selectedIncident.createdAt?.seconds ? new Date(selectedIncident.createdAt.seconds * 1000).toLocaleTimeString() : 'Recently'}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Context & Intel</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">{selectedIncident.issue_description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                    <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">People Affected</span>
                    <span className="text-sm font-bold text-white uppercase">{selectedIncident.peopleAffected || 0}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                    <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Live Status</span>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                       <span className="text-sm font-bold text-white uppercase">{selectedIncident.status || 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-[#0A0A0A]">
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-[0_0_30px_rgba(99,102,241,0.2)] active:scale-[0.98] flex items-center justify-center gap-2 group">
                  Deploy Countermeasures <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

