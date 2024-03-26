import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Drawer, FormControl, IconButton, InputLabel, Select } from "@mui/material";
import '../styling/map.css'
import { useState } from "react";
import { Menu ,ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function Map() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    return(
      <div className="map-container">
        <IconButton 
        className="sidebar-toggle-btn"
        onClick={toggleDrawer(true)}
        ><Menu /></IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <IconButton 
            className="sidebar-toggle-btn"
            onClick={toggleDrawer(false)}
            >
              {open === true ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          <div className="form-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="From:"/>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="To:"/>
            </LocalizationProvider>

            <FormControl>
              <InputLabel id="primary-type">Primary Type</InputLabel>
              <Select 
              id="1"
              labelId="primary-type" 
              label="Primary Type"
              multiple/>
            </FormControl>

            <FormControl>
              <InputLabel id="description-1">Description</InputLabel>
              <Select 
              id="2"
              labelId="description-1" 
              label="Description"
              multiple/>
            </FormControl>

            <FormControl>
              <InputLabel id="location">Location</InputLabel>
              <Select 
              id="3" 
              labelId="location" 
              label="Location"
              multiple/>
            </FormControl>

            <FormControl>
              <InputLabel id="description-2">Description</InputLabel>
              <Select 
              id="4" 
              labelId="description-2" 
              label="Description"
              multiple/>
            </FormControl>

            <FormControl>
              <InputLabel id="IUCR">IUCR</InputLabel>
              <Select 
              id="5" 
              labelId="IUCR" 
              label="IUCR"
              multiple/>
            </FormControl>

            <FormControl>
              <InputLabel id="arrest">Arrest</InputLabel>
              <Select 
              id="6"
              labelId="arrest" 
              label="Arrest"
              multiple/>
            </FormControl>

            <FormControl>
              <InputLabel id="domestic">Domestic</InputLabel>
              <Select 
              id="7" 
              labelId="domestic" 
              label="Domestic"
              multiple/>
            </FormControl>

            <Button variant="contained">Submit</Button>
          </div>
        </Drawer>
    </div>
    )
  }