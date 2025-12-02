'use client';
import React from 'react';
import { Grid2, Typography, Button } from '@mui/material';
import StackList from './StackList';
import { useState } from 'react';
import { RoadMapProps, RoadMaps } from './types';
import RoadMapCard from './RoadMapCard';
import { addDocument } from '../../../lib/fetch';

function RoadMapProvider({ RoadMaps }: RoadMapProps) {
  const [selectedStack, setSelectedStack] = useState('');
  return (
    <>
      <StackList RoadMaps={RoadMaps} setSelectedStack={setSelectedStack} />
      <Grid2
        sx={{ border: '1px solid grey', p: 1, borderRadius: '12px' }}
        size={10.8}
      >
        <Button
          sx={{ height: '40px', marginBottom: 4 }}
          fullWidth
          variant="contained"
          size="small"
          onClick={() => {
            const newDoc: RoadMaps = {
              title: 'Enter title here',
              topics: [
                {
                  title: 'add here',
                  note: 'add note here',
                  order: 1,
                  link: '',
                  date: null,
                  revised:{
                    p1:false,
                    p2:false,
                    p3:false,
                    p4:false,
                    p5:false,
                    p6:false
                  }
                },
              ],
              stack: selectedStack,
              color: 'primary',
            };
            addDocument(`rm-${selectedStack}`, newDoc);
          }}
        >
          {' '}
          <Typography variant="h5">{selectedStack}</Typography>
        </Button>
        {(
          <Grid2 container gap={0} rowGap={1.5} justifyContent={'space-around'}>
            {RoadMaps.filter((item) => item.doc.stack === selectedStack)
              ?.sort((a, b) => {
                if (
                  Number(a.doc.title.split('.')[0]) >
                  Number(b.doc.title.split('.')[0])
                )
                  return 1;
                else return -1;
              })
              .map((item, i) => (
                <Grid2 size={12} key={i}>
                  <RoadMapCard
                    item={item.doc}
                    id={item.id}
                  />
                </Grid2>
              ))}
          </Grid2>
        )}
      </Grid2>
    </>
  );
}

export default RoadMapProvider;
