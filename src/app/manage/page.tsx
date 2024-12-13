import {
    Box,
    List,
    ListItem,
    ListItemButton,
    Card,
    CardContent,
    Typography,
    ListItemText,
    Checkbox,
    Grid2,
  } from "@mui/material";
  import { daily } from "../../models/checklist/daily/daily";
  
  function CheckList() {
    return (
      <Box  sx={{ marginTop: "80px", width:"100vw" }}>
        <Box>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <ListItem>
              <ListItemButton>Daily</ListItemButton>
            </ListItem>
  
            <ListItem>
              <ListItemButton>Weekly</ListItemButton>
            </ListItem>
  
            <ListItem>
              <ListItemButton>Monthly</ListItemButton>
            </ListItem>
          </List>
        </Box>
  
        <Box >
          <Grid2 container gap={2} rowGap={6} justifyContent={"space-evenly"}>
            {daily.map((day,i) => {
              return (
                <Grid2 key={i} size={3}>
                  <Card>
                    <CardContent>
                      <Typography>Today is {day.day}</Typography>
                      <List
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <ListItem>
                          
                          <ListItemText>
                            sample
                          </ListItemText>
                          <Checkbox />
                        </ListItem>
  
                        <ListItem>
                          <ListItemText>
                            sample <Checkbox />
                          </ListItemText>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
      </Box>
    );
  }
  
  export default CheckList;
  