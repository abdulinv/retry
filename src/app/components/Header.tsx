'use client';

import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ExternalLinksMenu from './ExternalLinksMenu';
import Scheduler from './Scheduler';

function Header() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!window.localStorage.getItem('access')) {
      router.push('/login');
      return;
    }
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: 'midnightblue' }}>
        <Toolbar>
       
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              paddingLeft: 4,
            }}
          >
            <Button onClick={handleMenuClick} sx={{ color: 'white' }}>
              Menu
            </Button>
            <Menu
              PaperProps={{
                sx: {
                  width: 300, // You can adjust the value to your need
                },
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              {[
                { label: 'Tests', path: '/tests' },
                { label: 'Road Map', path: '/roadmap' },
                { label: 'Manage Tasks', path: '/manage/Daily' },
                { label: 'JD Analyser', path: '/JDAnalyser' },
                { label: 'Bucket List', path: '/bucketlist' },
                { label: 'Projects', path: '/projects' },
                { label: 'Time Spend', path: '/time' },
              ].map(({ label, path }) => (
                <MenuItem
                  key={path}
                  onClick={() => {
                    window.open(path, '_blank', 'noopener,noreferrer');
                    handleMenuClose();
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
            <Scheduler/>
          </Box>
         
          <ExternalLinksMenu />
          <Button
            onClick={() => {
              window.localStorage.removeItem('access');
              router.push('/login');
            }}
            sx={{ color: 'white' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
