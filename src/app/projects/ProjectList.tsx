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
  Chip,
  Stack,
} from '@mui/material';
import { ProjectDocs } from './types';
import { addDocument, updateTask } from '../../../lib/fetch';
import LinkController from './LinkController';
import TagController from './TagController';
import Filter from './Filter';

interface ProjectListProps {
  projectList: ProjectDocs[];
}

interface Edit {
  id: string;
  field: string;
}

const findTagList = (list:ProjectDocs[])=>{

  const temp  = list.map(pro=>pro.doc.tags).flat();
  return [...new Set(temp)].filter(item=>item)
}

function ProjectList({ projectList }: ProjectListProps) {
  console.log('projects', projectList[0].doc.title);

  const [search,setSearch] = useState('');
  const [tag,setTag] = useState('')
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
 
  const taglist = findTagList(projectList);
  console.log("taglist",taglist);
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

  const handleTagDel = (currentDoc: ProjectDocs,tagDel:string)=>{

    const updatedTags = currentDoc.doc.tags.filter(item=>item !== tagDel);
    updateTask('projects', currentDoc.id, {
      ...currentDoc.doc,
      tags: updatedTags
    });
  }
  const filteredList =  projectList.filter(item=>item.doc.tags?.includes(tag) || tag === "");
  const searchedProjectList = filteredList.filter(item=>item.doc.title?.includes(search));

  return (
    <Box
      sx={{
        mt: 10,
        p:2,
        maxHeight: '80vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'grey',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}
    >
      <Stack  sx={{backgroundColor:"whitesmoke",mx:20,borderRadius:2}} mb={2} gap={2} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>

         <Button onClick={addProjects}>add project</Button>

         <TextField onChange={(e)=>setSearch(e.target.value)}  value={search} sx={{
          margin:1,
          width:"20vw",
         }} size='small' color='info' placeholder='search..'/>
         <Filter 
          tagList={taglist}
          onApply={(data)=>{
          console.log(data.tag);
          setTag(data.tag)
         }} onCancel={()=>{
          setTag("")
         }}/>

      </Stack>
     
      {searchedProjectList.length === 0 && <Typography>No results found</Typography>}
      {searchedProjectList.length !== 0 &&  <Grid2
        gap={3}
        container
        sx={{
          px: 2,
          placeContent: 'center',
        }}
      >
    
        {searchedProjectList?.map((item) => (
          <Grid2 key={item.id} size={3}>
            <Card>
              <CardContent
                sx={{
                  minHeight: '200px',
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"space-evenly",
                  alignItems:'center'
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

                <Stack flexDirection={"row"} gap={1}>

                {item.doc.tags?.map(tag=>(
                  <Chip key={tag} size='small' label={tag} color='primary' sx={{
                    minWidth:"60px",
                    borderRadius:"10px",
                    padding:"2px"
                  }} onDelete={()=>{handleTagDel(item,tag)}} />
                ))}

                </Stack>

               
              
              </CardContent>
              <CardActionArea sx={{display:"flex"}}>
                <LinkController id={item.id} doc={item.doc} />
                <TagController id={item.id} doc={item.doc} tagList={taglist}/>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>}
     
    </Box>
  );
}

export default ProjectList;
