import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Dashboard.css';
import { Row,Col } from 'react-bootstrap';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const[dashboardData,setDashboardData]=useState(null);
  const[error,setError]=useState("");
  
  useEffect(()=>{
    const accessToken = localStorage.getItem("access");
    // axios.get("http://127.0.0.1:8000/api/dashboard/",{
    axios.get("/api/dashboard/",{
      headers:{
        Authorization : `Bearer ${accessToken}`
      }
    }).then(response=>{
      console.log(response.data);
      setDashboardData(response.data);
    }).catch(error=>{
      console.error("Error fetching dashboard data",error);
      setError("Fetched to error dashboard data")
    })
  },[]);

  if (error) {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <p>{error}</p>
            </div>
        );
    }

   if (!dashboardData) {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <p>Loading...</p>
            </div>
        );
    }

  

  const assetStatusData = dashboardData.asset_status_chart;
  return (
    <div className = "dashboard">
      <h1>Dashboard</h1>
      <div className='dashboard-subtitle'>
           Overview of your asset management system
      </div>
      <Row >
        <Col xs={12} sm={6} md={3}>
          <div className='dashboard-card'>
            <h3>Total Assets</h3>
            <p>{dashboardData.counts.total_assets}</p>
          </div>
        </Col>
         <Col xs={12} sm={6} md={3}>
          <div className='dashboard-card'>
            <h3>Available Assets</h3>
            <p>{dashboardData.counts.available_assets}</p>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <div className='dashboard-card'>
            <h3>Assigned Assets</h3>
            <p>{dashboardData.counts.assigned_assets}</p>
          </div>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <div className='dashboard-card'>
            <h3>Open Ticket</h3>
            <p>{dashboardData.counts.open_tickets}</p>
          </div>
        </Col>
      </Row>
      <div className='dchart'>
       <div className="dashboard-chart">

                <h2>Asset Status</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={assetStatusData}>

                      <CartesianGrid
                          stroke="#343a40"
                          strokeDasharray="3 3"
                      />
                      <XAxis
                          dataKey="status"
                      />
                      <YAxis
                      />
                      <Tooltip
                          cursor={false}
                          contentStyle={{
                              backgroundColor: "#212529",
                              border: "1px solid #343a40",
                              color: "#ffffff"
                          }}
                      />

                      <Bar
                          dataKey="count"
                          name="Assets"
                          fill="#4dabf7"
                          activeBar={false}
                      />

                  </BarChart>
              </ResponsiveContainer>

            </div>
          </div> 
      
    </div>
  )
}

export default Dashboard
