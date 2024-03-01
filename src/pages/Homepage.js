import { useState } from 'react';
import {Button, ModalOverlay, Modal, Dialog} from 'react-aria-components';
import TrendsList from '../components/TrendsList';
import '../styling/home.css';

export default function Homepage() {
    const [open, setOpen] = useState(JSON.parse(localStorage.getItem('firstLoad')) ?? true);

    function handleClose() {
        localStorage.setItem('firstLoad', false);
        setOpen(false);
    }

    return(
    <>
        {/* Welcome Pop-up */}
            <ModalOverlay 
                className="popup-overlay" 
                isOpen={open} 
            >
                <Modal>
                    <Dialog >
                        <div className='popup-container'>
                            <div className='welcome-title'>
                                Welcome!
                            </div>
                            <div className='welcome-msg'>
                                Welcome to the Chicago Crime Data Explorer. Our goal is to provide users with an easy-to-use 
                                tool to gain access to information regarding Chicago’s criminal landscape. Visuals are used 
                                across the site to help achieve this goal. Graphs of advanced trends are displayed on the “Trends” 
                                page, while a heatmap of Chicago’s crime based off of user-submitted inputs is displayed on the “Map” page.
                            </div>
                            <Button onPress={handleClose} className='popup-btn'>Let's Go!</Button>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        
        
        

        {/* Welcome Message */}
        <div className='top-container'>
            <div className='welcome-container'>
                <div className='welcome-title'>
                    Welcome!
                </div>
                <div className='welcome-msg'>
                    Welcome to the Chicago Crime Data Explorer. Our goal is to provide users with an easy-to-use 
                    tool to gain access to information regarding Chicago’s criminal landscape. Visuals are used 
                    across the site to help achieve this goal. Graphs of advanced trends are displayed on the “Trends” 
                    page, while a heatmap of Chicago’s crime based off of user-submitted inputs is displayed on the “Map” page.
                </div>
            </div>
            <img 
            className="img"
            src="https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt=""/>
        </div>

        {/* Bottom Section */}
        <TrendsList buttonType="See more" selectedTrend="N/A"/>
    </>
    )
  }