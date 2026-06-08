'use client';

import React, { useState, useEffect } from 'react';
import { getUserStats } from '@/services/statsService';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import dynamic from 'next/dynamic';
import '../styles/UploadPage.css';


// Dinamikus import a chart-hoz (csak kliens oldalon)
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
  loading: () => <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Grafikon betöltése...</div>
});

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Material-UI komponensek
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import '@/styles/StatsPage.css';

// Chart.js regisztráció (csak kliens oldalon)
if (typeof window !== 'undefined') {
  ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);
}

const StatsPage = () => {
  const [userStats, setUserStats] = useState(null);
  const [timeRange, setTimeRange] = useState('7');
  const [eventType, setEventType] = useState('total');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Felhasználói statisztikák lekérése
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const stats = await getUserStats(timeRange);
        setUserStats(stats);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
        setError('Nem sikerült betölteni a statisztikákat.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserStats();
  }, [timeRange]);

  // Időszűrő alkalmazása
  const getFilteredTimestamps = (timestamps) => {
    const now = new Date();
    const startDate = subDays(now, Number(timeRange));
    return timestamps.filter((ts) => new Date(ts) >= startDate);
  };

  // Dátumok generálása az időtartamhoz
  const getDateRange = () => {
    const now = new Date();
    const startDate = subDays(now, Number(timeRange));
    return eachDayOfInterval({ start: startDate, end: now }).map((date) =>
      format(date, 'yyyy-MM-dd')
    );
  };

  // Összesített grafikon adatainak előkészítése
  const prepareAggregatedChartData = () => {
    if (!userStats) return { labels: [], datasets: [], chartTitle: '', maxValue: 10 };

    const labels = getDateRange();
    const timestamps = {
      marker: userStats.markerTimestamps || [],
      popup: userStats.popupTimestamps || [],
      details: userStats.detailsTimestamps || [],
      total: [
        ...(userStats.markerTimestamps || []),
        ...(userStats.popupTimestamps || []),
        ...(userStats.detailsTimestamps || []),
      ],
    };

    const selectedTimestamps = timestamps[eventType] || [];
    const filteredTimestamps = getFilteredTimestamps(selectedTimestamps);

    const dateCounts = {};
    labels.forEach((date) => {
      dateCounts[date] = 0;
    });
    filteredTimestamps.forEach((ts) => {
      const date = format(new Date(ts), 'yyyy-MM-dd');
      if (dateCounts[date] !== undefined) {
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      }
    });

    const data = labels.map((date) => dateCounts[date] || 0);
    const maxValue = Math.max(...data, 10);

    const titleMap = {
      marker: 'Térkép megjelenések napi bontásban',
      popup: 'Felugró ablak megnyitások napi bontásban',
      details: 'Részletek megtekintések napi bontásban',
      total: 'Összes esemény napi bontásban',
    };

    const labelMap = {
      marker: 'Térkép megjelenések',
      popup: 'Felugró ablak megnyitások',
      details: 'Részletek megtekintések',
      total: 'Összes esemény',
    };

    return {
      labels,
      datasets: [
        {
          label: labelMap[eventType],
          data,
          borderColor: '#5099ce',
          backgroundColor: 'rgba(80, 153, 206, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#97d4ff',
          pointBorderColor: '#5099ce',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
      chartTitle: titleMap[eventType],
      maxValue,
    };
  };

  // Grafikon beállítások
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#8b4513',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        color: '#5099ce',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#8b4513',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#8b4513',
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          borderColor: '#97d4ff',
        },
        beginAtZero: true,
      },
    },
  };

  // Összesített statisztikák kártyái
  const renderSummaryCards = () => {
    if (!userStats) return null;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card className="stats-card" sx={{ border: '2px solid #97d4ff', borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#5099ce' }}>
                Térkép megjelenések
              </Typography>
              <Typography variant="h4" sx={{ color: '#8b4513' }}>
                {userStats.totalMarkerViews}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="stats-card" sx={{ border: '2px solid #97d4ff', borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#5099ce' }}>
                Felugró ablak megnyitások
              </Typography>
              <Typography variant="h4" sx={{ color: '#8b4513' }}>
                {userStats.totalPopupOpens}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="stats-card" sx={{ border: '2px solid #97d4ff', borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#5099ce' }}>
                Részletek megtekintések
              </Typography>
              <Typography variant="h4" sx={{ color: '#8b4513' }}>
                {userStats.totalDetailsViews}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="stats-page">
        <Box className="loading" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <CircularProgress sx={{ color: '#5099ce' }} />
          <Typography variant="h6" sx={{ color: '#5099ce', mt: 2 }}>
            Betöltés...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="stats-page">
        <Typography variant="h6" className="error" sx={{ color: '#dc3545', textAlign: 'center', mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  const chartData = prepareAggregatedChartData();

  return (
    <Container maxWidth="lg" className="stats-page" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#5099ce' }} className="stats-section">
        Statisztikák
      </Typography>

      {/* Globális szűrők */}
      <Box mt={2} className="filter-section" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ maxWidth: 200, width: '100%' }}>
          <InputLabel sx={{ color: '#8b4513' }}>Időtartam</InputLabel>
          <Select
            value={timeRange}
            label="Időtartam"
            onChange={(e) => setTimeRange(e.target.value)}
            className="filter-select"
            sx={{
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#97d4ff' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#5099ce' },
              color: '#8b4513',
              backgroundColor: '#fff',
            }}
          >
            <MenuItem value="7">Utolsó 7 nap</MenuItem>
            <MenuItem value="30">Utolsó 30 nap</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: 200, width: '100%' }}>
          <InputLabel sx={{ color: '#8b4513' }}>Esemény típusa</InputLabel>
          <Select
            value={eventType}
            label="Esemény típusa"
            onChange={(e) => setEventType(e.target.value)}
            className="filter-select"
            sx={{
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#97d4ff' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#5099ce' },
              color: '#8b4513',
              backgroundColor: '#fff',
            }}
          >
            <MenuItem value="total">Összes esemény</MenuItem>
            <MenuItem value="marker">Térkép megjelenések</MenuItem>
            <MenuItem value="popup">Felugró ablak megnyitások</MenuItem>
            <MenuItem value="details">Részletek megtekintések</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Összesített statisztikák szekció */}
      <Box mt={4} className="stats-section">
        <Typography variant="h5" sx={{ color: '#5099ce', mb: 3 }}>
          Összesített statisztikák
        </Typography>
        {renderSummaryCards()}
        {userStats && (
          <Box mt={4}>
            <Box className="chart-container" sx={{ width: '100%', overflowX: 'auto' }}>
              <div style={{ minWidth: '300px', height: 'auto' }}>
                <Line
                  data={chartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: chartData.chartTitle || 'Összes esemény napi bontásban',
                      },
                    },
                  }}
                />
              </div>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default StatsPage;