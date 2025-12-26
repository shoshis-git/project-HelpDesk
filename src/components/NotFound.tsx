import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        textAlign: 'center',
        px: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* אייקון מרכזי */}
      <ErrorOutlineIcon
        sx={{
          fontSize: 100,
          color: '#fff',
          mb: 2,
          animation: 'bounce 1.5s infinite',
        }}
      />

      {/* כיתוב */}
      <Typography variant="h2" component="h1" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ color: '#fff', mb: 3 }}>
        Oops! Page not found 😅
      </Typography>

      {/* אנימציה של טקסט */}
      <Typography
        sx={{
          color: '#fff',
          mb: 4,
          fontStyle: 'italic',
          animation: 'fadeText 2s infinite',
        }}
      >
        Looking for your page...
      </Typography>

      {/* כפתור חזרה */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/')}
        sx={{ px: 4, py: 1, fontWeight: 'bold' }}
      >
        Back to Home
      </Button>

      {/* אייקוני חיפוש קטנים מתרוצצים */}
      {[...Array(5)].map((_, i) => (
        <SearchIcon
          key={i}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 30,
            animation: `float${i} ${3 + i}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* סגנונות אנימציה */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float0 { transform: translateY(0px); }
          @keyframes float1 { transform: translateY(-10px); }
          @keyframes float2 { transform: translateY(10px); }
          @keyframes float3 { transform: translateY(-15px); }
          @keyframes float4 { transform: translateY(15px); }
          @keyframes fadeText {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default NotFoundPage;
