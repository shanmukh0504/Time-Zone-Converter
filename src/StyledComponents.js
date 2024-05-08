import styled from 'styled-components';
import Slider from '@mui/material/Slider';

export const NavBar = styled.nav`
    display: flex;
    width: 627px;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    padding: 10px;
    margin-bottom: 20px;
  `;

export const NavIconLink = styled.a`
    color: ${({ theme }) => theme.text};
    margin-left: 10px;
    text-decoration: none;
    font-size: 18px;
    &:hover {
      color: ${({ theme }) => theme.iconColor};
    }
  `;

export const NavLeft = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  .input-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  input {
    padding: 8px;
    padding-right: 30px; /* Add padding to accommodate the icon */
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
  
  .add-icon {
    position: absolute;
    right: 8px; /* Position the icon to the right */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px; /* Adjust the size as needed */
    height: 20px;
    background-color: transparent; /* Remove background color */
    color: #007bff; /* Set the icon color */
    border: none;
    cursor: pointer;
    font-size: 14px; /* Adjust the icon size as needed */
  }
  
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 200px;
      max-height: 200px;
      overflow-y: auto;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      z-index: 1;
    }
  
    .dropdown-item {
      padding: 8px;
      cursor: pointer;
  
      &:hover {
        background-color: #f1f1f1;
      }
    }
  
    .add-button {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 10px;
      font-size: 14px;
  
      .icon {
        margin-right: 5px;
      }
    }
  `;

export const NavCenter = styled.div`
    font-weight: bold;
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 200px;
    }
  `;

export const NavRight = styled.div`
    display: flex;
  `;

export const Card = styled.div`
    width: 600px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;

export const SliderContainer = styled.div`
    width: 550px;
  `;

export const CustomSlider = styled(Slider)`
    & .MuiSlider-track {
      display: none;
    }
    
    & .MuiSlider-markLabel {
      font-size: 10px;
      color: ${({ theme }) => theme.text};
    }
  `;

export const ZoneHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `;

export const DeleteButton = styled.button`
    position: relative;
    top: 5px;
    right: 5px;
    z-index: 1;
    color: red;
    cursor: pointer;
    border: none;
    padding: 6px;
    font-size: large;
    background-color: #FFF;
  `;