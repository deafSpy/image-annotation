import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import ReactDOMServer from 'react-dom/server';
import FileDrop from '../components/FileDrop';

function UploadComponent() {


  return (

      
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5rem', paddingTop: '1.25rem', paddingBottom: '5rem', color: '#1a202c' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', margin: '2.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid transparent', padding: '2rem', width: '100%', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto', padding: '2.5rem' }}>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '24rem' }}>

                <FileDrop />
                  
            </div>
        </div>
    </div>

  );
}

export default UploadComponent;
