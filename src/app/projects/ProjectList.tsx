'use client';

import React, { useState } from 'react';
import {
  Grid2,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { ProjectDocs } from './types';
import { addDocument, updateTask } from '../../../lib/fetch';
import LinkController from './LinkController';

interface ProjectListProps {
  projectList: ProjectDocs[];
}

interface Edit {
  id: string;
  field: string;
}

function ProjectList({ projectList }: ProjectListProps) {
  console.log('projects', projectList[0].doc.title);
  const [edit, setEdit] = useState<Edit>({
    id: '',
    field: '',
  });
  const [value, setValue] = useState('');

  const addProjects = () => {
    const newDoc = {
      title: `${Date.now().toString().slice(-4)}- add tilte here`,
      description: 'add description here',
      tags: [],
      clone_URL: 'add link',
    };
    addDocument('projects', newDoc);
  };

  const setEditMode = (arg: string, id: string) => {
    setEdit({
      id,
      field: arg,
    });
    setValue(arg);
  };

  const handleSave = (currentDoc: ProjectDocs, field: string) => {
    updateTask('projects', currentDoc.id, {
      ...currentDoc.doc,
      [field]: value,
    });
    setEdit({
      id: '',
      field: '',
    });
  };

  return (
    <Box
      sx={{
        mt: 10,
      }}
    >
      <Button onClick={addProjects}>add project</Button>
      <Grid2
        gap={3}
        container
        sx={{
          px: 2,
          placeContent: 'center',
        }}
      >
        {projectList?.map((item) => (
          <Grid2 key={item.id} size={3}>
            <Card>
              <CardContent
                sx={{
                  minHeight: '200px',
                }}
              >
                {edit.field !== item.doc.title && edit.id !== item.id && (
                  <Box
                    component={'div'}
                    onDoubleClick={setEditMode.bind(
                      null,
                      item.doc.title,
                      item.id
                    )}
                  >
                    <Typography my={1} variant="h5">
                      {' '}
                      {item.doc.title}
                    </Typography>
                  </Box>
                )}
                {edit.field === item.doc.title && edit.id === item.id && (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSave.bind(null, item, 'title')}
                  />
                )}

                {edit.field !== item.doc.description && edit.id !== item.id && (
                  <Box
                    component={'div'}
                    onDoubleClick={setEditMode.bind(
                      null,
                      item.doc.title,
                      item.id
                    )}
                  >
                    <Typography variant="body2">
                      {' '}
                      {item.doc.description}
                    </Typography>
                  </Box>
                )}
                {edit.field === item.doc.description && edit.id === item.id && (
                  <TextField
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSave.bind(null, item, 'title')}
                  />
                )}
              </CardContent>
              <CardActionArea>
                <LinkController id={item.id} doc={item.doc} />
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default ProjectList;
