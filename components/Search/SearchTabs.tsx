import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchMovies from "./SearchMovies/SearchMovies";
import SearchTVs from "./SearchTVs/SearchTVs";

const SearchTabs: FC = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              centered
              sx={{ background: "#000" }}
              TabIndicatorProps={{
                style: {
                  borderBottom: "5px solid#E50914",
                },
              }}
              aria-label="lab API tabs example"
            >
              <Tab
                label="Movies"
                value="1"
                sx={{
                  color: "#fff",
                  "&.Mui-selected": { color: "#fff" },
                }}
              />
              <Tab
                label="TV Shows"
                value="2"
                sx={{
                  color: "#fff",
                  "&.Mui-selected": { color: "#fff" },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SearchMovies />
          </TabPanel>
          <TabPanel value="2">
            <SearchTVs />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default SearchTabs;
