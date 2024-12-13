"use client"

import {
  Card,
  CardContent,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { RoadMaps } from "../../models/RoadMap/RoadMap";
import { useState } from "react";

function RoadMap() {
  const [selectedStack, setSelectedStack] = useState("");
  return (
    <Grid2
      container
      sx={{ marginTop: "40px", width: "94vw", borderRadius: "12px" }}
    >
      <Grid2 sx={{ border: "1px solid grey", borderRadius: "12px" }} size={2}>
        <List>
          {RoadMaps.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton onClick={() => setSelectedStack(item.stack)}>
                {item.stack}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid2>

      <Grid2
        sx={{ border: "1px solid grey", p: 2, borderRadius: "12px" }}
        size={10}
      >
        <Typography variant="h4" marginBottom={4}>
          {selectedStack}
        </Typography>
        <Grid2 container gap={2} justifyContent={"space-around"}>
          {RoadMaps.find((item) => item.stack === selectedStack)?.data.map(
            (item) => (
              <Grid2 size={3}>
                <Card
                  elevation={10}
                  sx={{
                    borderRadius: "16px",
                    maxHeight: "300px",
                    minHeight: "300px",
                  }}
                >
                  <CardContent>
                    <Typography
                      align="left"
                      variant="subtitle1"
                      fontWeight={900}
                      fontSize={20}
                      marginLeft={"16px"}
                    >
                      {item.section}
                    </Typography>
                    <List sx={{ marginLeft: "16px" }}>
                      {item.topics.map((topic) => (
                        <ListItem sx={{ m: 0, p: 0 }}>
                          <ListItemText>
                            <Typography
                              variant="body2"
                              fontSize={15}
                              align="left"
                              key={topic}
                            >
                              {topic}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid2>
            )
          )}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default RoadMap;
