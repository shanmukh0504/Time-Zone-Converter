import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import moment from 'moment-timezone'; // Import moment-timezone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import { faCalendarAlt, faSort, faChain, faMoon, faPlus, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import { NavBar, NavIconLink, NavLeft, NavCenter, NavRight, Card, SliderContainer, CustomSlider, ZoneHeading, DeleteButton } from './StyledComponents';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  iconColor: '#007bff',
};

export const darkTheme = {
  background: '#333333',
  text: '#ffffff',
  iconColor: '#007bff',
};
const timeZoneInfo = [
  { "zone": "adt", "label": "ADT (Atlantic Daylight Time)", "offset": -3, "date": new Date() },
  { "zone": "acst", "label": "ACST (Australian Central Standard Time)", "offset": 9.5, "date": new Date() },
  { "zone": "aedt", "label": "AEDT (Australian Eastern Daylight Time)", "offset": 11, "date": new Date() },
  { "zone": "akst", "label": "AKST (Alaska Standard Time)", "offset": -9, "date": new Date() },
  { "zone": "brst", "label": "BRST (Brasília Summer Time)", "offset": -2, "date": new Date() },
  { "zone": "bst", "label": "BST (British Summer Time)", "offset": 1, "date": new Date() },
  { "zone": "cat", "label": "CAT (Central Africa Time)", "offset": 2, "date": new Date() },
  { "zone": "cdt", "label": "CDT (Central Daylight Time)", "offset": -5, "date": new Date() },
  { "zone": "cet", "label": "CET (Central European Time)", "offset": 1, "date": new Date() },
  { "zone": "clst", "label": "CLST (Chile Summer Time)", "offset": -3, "date": new Date() },
  { "zone": "cpt", "label": "CPT (China Philippines Time)", "offset": 8, "date": new Date() },
  { "zone": "cst", "label": "CST (Central Standard Time)", "offset": -6, "date": new Date() },
  { "zone": "eest", "label": "EEST (Eastern European Summer Time)", "offset": 3, "date": new Date() },
  { "zone": "edt", "label": "EDT (Eastern Daylight Time)", "offset": -4, "date": new Date() },
  { "zone": "eet", "label": "EET (Eastern European Time)", "offset": 2, "date": new Date() },
  { "zone": "gst", "label": "GST (Gulf Standard Time)", "offset": 4, "date": new Date() },
  { "zone": "hkt", "label": "HKT (Hong Kong Time)", "offset": 8, "date": new Date() },
  { "zone": "ist", "label": "IST (Indian Standard Time)", "offset": 5.5, "date": new Date() },
  { "zone": "jst", "label": "JST (Japan Standard Time)", "offset": 9, "date": new Date() },
  { "zone": "mst", "label": "MST (Mountain Standard Time)", "offset": -7, "date": new Date() },
  { "zone": "ndt", "label": "NDT (Newfoundland Daylight Time)", "offset": -2.5, "date": new Date() },
  { "zone": "nzt", "label": "NZT (New Zealand Time)", "offset": 12, "date": new Date() },
  { "zone": "pdt", "label": "PDT (Pacific Daylight Time)", "offset": -7, "date": new Date() },
  { "zone": "sast", "label": "SAST (South Africa Standard Time)", "offset": 2, "date": new Date() },
  { "zone": "utc", "label": "UTC (Coordinated Universal Time)", "offset": 0, "date": new Date() },
  { "zone": "wet", "label": "WET (Western European Time)", "offset": 0, "date": new Date() },
  { "zone": "wib", "label": "WIB (Western Indonesian Time)", "offset": 7, "date": new Date() },
  { "zone": "wita", "label": "WITA (Central Indonesian Time)", "offset": 8, "date": new Date() }
];

const TimeZoneConverter = ({ isDarkMode, toggleDarkMode, setIsDarkMode }) => {
  const [timeOffsets, setTimeOffsets] = useState({ utc: 0, ict: 7, est: -5, pst: -8, adt: -3, acst: 9.5, aedt: 11, akst: -9, brst: -2, bst: 1, cat: 2, cdt: -5, cet: 1, clst: -3, cpt: 8, cst: -6, eest: 3, edt: -4, eet: 2, gst: 4, hkt: 8, ist: 5.5, jst: 9, mst: -7, ndt: -2.5, nzt: 12, pdt: -7, sast: 2, wet: 0, wib: 7, wita: 8 });
  const [selectedTimeZone, setSelectedTimeZone] = useState('utc');
  const [selectedTimeZoneList, setSelectedTimeZoneList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reverseOrder, setReverseOrder] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 500);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTimeOffsets(prevOffsets => {
      const updatedOffsets = { ...prevOffsets };
      timeZoneInfo.forEach(info => {
        info.date.setDate(date.getDate());
      });
      return updatedOffsets;
    });
  };

  const handleScheduleMeet = () => {
    const startTime = selectedDate.toISOString().replace(/-/g, '');
    const endTime = new Date(selectedDate.getTime() + (2 * 60 * 60 * 1000)).toISOString().replace(/-/g, '');
    const formattedTimes = selectedTimeZoneList.map(zone => {
      const hours = Math.floor(timeOffsets[zone.id] / 60);
      const minutes = timeOffsets[zone.id] % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `${zone.name} ${formattedHours}:${formattedMinutes} ${period}`;
    });
    const dynamicEventDescription = formattedTimes.join('%0A');
    const timeZoneConverterLink = generateLink(selectedTimeZoneList);
    const timeZoneConverterLinkHTML = `<a href="${timeZoneConverterLink}">${selectedTimeZoneList.map(zone => zone.name.toUpperCase()).join(' - ')} Time Zone Converter</a>`;
    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Meeting&dates=${startTime}/${endTime}&ctz=Asia/Calcutta&details=${dynamicEventDescription}%0A%0A${timeZoneConverterLinkHTML}%0A%0AScheduled with Google Calendar&location=${selectedTimeZoneList[0].name}`;
    window.open(googleCalendarLink, '_blank');
  };

  const handleTimeChange = (zone, newValue) => {
    setTimeOffsets(prevOffsets => {
      const newOffsets = { ...prevOffsets, [zone]: newValue };
      const updatedOffsets = { ...newOffsets };
      timeZoneInfo.forEach(info => {
        const timeZoneOffset = timeZoneInfo.find(info => info.zone === zone)?.offset * 60;
        let adjustedDate = new Date(selectedDate);
        if (info.zone !== zone) {
          const newOffset = Math.ceil(newValue - timeZoneOffset + info.offset * 60);
          if (newOffset >= 1440) {
            adjustedDate.setDate(adjustedDate.getDate() + 1);
            updatedOffsets[info.zone] = newOffset - 1440;
          }
          else if (newOffset < 0) {
            adjustedDate.setDate(adjustedDate.getDate() - 1);
            updatedOffsets[info.zone] = newOffset + 1440;
          }
          else {
            updatedOffsets[info.zone] = newOffset
          }
          info.date.setDate(adjustedDate.getDate());
        }
      });
      return updatedOffsets;
    });
  };

  const handleAddTimeZone = () => {
    const newTimeZone = {
      id: selectedTimeZone,
      name: timeZoneInfo.find((info) => info.zone === selectedTimeZone)?.label,
    };
    const currentTime = moment().utcOffset(0);
    const selectedOffset = timeZoneInfo.find((info) => info.zone === selectedTimeZone)?.offset || 0;
    const defaultOffset = currentTime.hours() * 60 + currentTime.minutes() + selectedOffset * 60;
    setTimeOffsets(prevOffsets => ({ ...prevOffsets, [selectedTimeZone]: defaultOffset }));
    setSelectedTimeZoneList([...selectedTimeZoneList, newTimeZone]);
    setSearchTerm('');
  };

  const handleToggleReverseOrder = () => {
    setReverseOrder((prevReverseOrder) => !prevReverseOrder);
  };

  const handleGenerateLink = () => {
    const link = generateLink(selectedTimeZoneList);
    setGeneratedLink(link);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const encodedTimeZoneIds = urlSearchParams.get('timezones');
    if (encodedTimeZoneIds) {
      const timeZoneIds = encodedTimeZoneIds.split('-');
      const selectedTimeZones = timeZoneIds.map(id => timeZoneInfo.find(zone => zone.zone === id));
      const formattedSelectedTimeZones = selectedTimeZones.map(zone => {
        const currentTime = moment().utcOffset(0);
        const selectedOffset = timeZoneInfo.find(info => info.zone === zone.zone)?.offset || 0;
        const defaultOffset = currentTime.hours() * 60 + currentTime.minutes() + selectedOffset * 60;
        setTimeOffsets(prevOffsets => ({ ...prevOffsets, [zone.zone]: defaultOffset }));
        return { id: zone.zone, name: zone.label };
      });
      setSelectedTimeZoneList(formattedSelectedTimeZones);
    }
  }, []);

  const generateLink = (timeZoneList) => {
    const timeZoneIds = timeZoneList.map(zone => zone.id);
    const queryParams = new URLSearchParams({ timezones: timeZoneIds.join('-') });
    const link = window.location.origin + '/?' + queryParams.toString();
    return link;
  };

  const handleLinkClick = () => {
    window.open(generatedLink, '_blank');
  };
  const formatTime = (value) => {
    let hours = Math.floor(value / 60);
    const minutes = value % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleDeleteTimeZone = (id) => {
    setSelectedTimeZoneList((prevList) => prevList.filter((zone) => zone.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedTimeZoneList = [...selectedTimeZoneList];
    const [removed] = updatedTimeZoneList.splice(result.source.index, 1);
    updatedTimeZoneList.splice(result.destination.index, 0, removed);

    setSelectedTimeZoneList(updatedTimeZoneList);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userTimeZoneAbbreviation = userTimeZone === 'Asia/Calcutta' ? 'ist' : userTimeZone;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div style={{ background: isDarkMode ? darkTheme.background : lightTheme.background, color: isDarkMode ? darkTheme.text : lightTheme.text }}>
        <h2>Time Zone Converter</h2>
        <NavBar style={{ backgroundColor: isDarkMode ? '#282c34' : '#f1f1f1', color: isDarkMode ? darkTheme.text : lightTheme.text }}>
          <NavLeft>
            <div className="input-container">
              <input
                type="text"
                placeholder="Add Time Zone, City or Town"
                value={searchTerm}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                onChange={handleSearchChange}
              />
              <div className="add-icon" onClick={handleAddTimeZone}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
            {showDropdown && (
              <div className="dropdown">
                {timeZoneInfo
                  .filter((info) =>
                    info.label.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((info) => (
                    <div
                      key={info.zone}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedTimeZone(info.zone);
                        setSearchTerm(info.label);
                        setShowDropdown(false);
                      }}
                      style={{ background: isDarkMode ? darkTheme.background : lightTheme.background, color: isDarkMode ? darkTheme.text : lightTheme.text }}
                    >
                      {info.label}
                    </div>
                  ))}

              </div>
            )}
          </NavLeft>
          <NavCenter>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            /></NavCenter>
          <NavRight>
            <NavIconLink onClick={handleScheduleMeet} href="#" title="Schedule Meet">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </NavIconLink>
            <NavIconLink onClick={handleToggleReverseOrder} href="#" title="Reverse the Timezones">
              <FontAwesomeIcon icon={faSort} />
            </NavIconLink>
            <NavIconLink onClick={handleGenerateLink} href="#" title="Get the Link">
              <FontAwesomeIcon icon={faChain} />
            </NavIconLink>
            <NavIconLink onClick={toggleDarkMode} href="#" title={isDarkMode ? "Convert to Light theme" : "Convert to Dark theme"}>
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </NavIconLink>
          </NavRight>
        </NavBar>
        {generatedLink && (
          <div>
            <p>Generated Link:</p>
            <button onClick={handleLinkClick} style={{ cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'none' }}>{generatedLink}</button>
          </div>
        )}
        <div>
          <h3>Selected Time Zones:</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="timezone-list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div
                    className="card-list"
                    style={{
                      display: reverseOrder ? 'flex' : 'flex',
                      flexDirection: reverseOrder ? 'column-reverse' : 'column',
                    }}
                  >
                    {selectedTimeZoneList.map((zone, index) => (
                      <Draggable key={zone.id} draggableId={zone.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps}>
                            <Card>
                              <ZoneHeading {...provided.dragHandleProps}>
                                <h4>{zone.name} Time</h4>
                                {userTimeZoneAbbreviation === zone.id ? <span>Your Time Zone</span> : null}
                                <DeleteButton onClick={() => handleDeleteTimeZone(zone.id)}>
                                  <FontAwesomeIcon icon={faXmark} />
                                </DeleteButton>
                              </ZoneHeading>
                              <p>Date: {formatDate(timeZoneInfo.find(info => info.zone === zone.id)?.date)}</p>
                              <SliderContainer>
                                <CustomSlider
                                  value={timeOffsets[zone.id]}
                                  onChange={(_, newValue) => handleTimeChange(zone.id, newValue)}
                                  min={0}
                                  max={1440}
                                  step={1}
                                  marks={[
                                    { value: 0, label: '12:00 AM' },
                                    { value: 180, label: '3:00 AM' },
                                    { value: 360, label: '6:00 AM' },
                                    { value: 540, label: '9:00 AM' },
                                    { value: 720, label: '12:00 PM' },
                                    { value: 900, label: '3:00 PM' },
                                    { value: 1080, label: '6:00 PM' },
                                    { value: 1260, label: '9:00 PM' },
                                  ]}
                                />
                              </SliderContainer>
                              <span>{`${formatTime(timeOffsets[zone.id])}`}</span>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TimeZoneConverter;