import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) { setVideoFile(null); setFileError(''); return; }
    if (!file.type.startsWith('video/')) { setFileError('Please select a valid video file.'); return; }
    setFileError('');
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) { return; }
    if (!file.type.startsWith('video/')) { setFileError('Please drop a valid video file.'); return; }
    setFileError('');
    setVideoFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    const response = await axios.post('http://localhost:5000/api/food', formData, {
      withCredentials: true
    })

    console.log(response.data);
    navigate('/Home');



    // setName(''); setDescription(''); setVideoFile(null);
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);



  return (


    <div className="create-food-page" style={{
      minHeight: '100dvh', display: 'flex',

      alignItems: 'flex-start', justifyContent: 'center', padding: 'var(--space-6) var(--space-4)',
      backgroundColor: 'radial-gradient(1200px 600px at 10% 10%, var(--color-surface-alt)0%, transparent 45%) radial-gradient(1200px 600px at 110% 110%, var(--color-surface-alt)0%, transparent 45%) var(--color-bg)'
    }}>

      <div className="create-food-card"
        style={{
          width: '100%',
          maxWidth: '720px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',

          boxShadow: 'var(--space-md)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',




        }}>



        <header className="create-food-header " style={{ display: 'grid', gap: 'var(--space-2)', placeItems: 'center' }}>
          <h1 className="create-food-title " style={{ fontSize: '1.50rem', fontWeight: '700',color:'silver' }}>Create Food</h1>

          <h1 className="create-food-subtitle" style={{ fontSize: '.95rem', color: 'var(--color-text-secondary)',padding:24 }} >Upload a short video, give it a name, and add a description.</h1>

        </header>





        <form className="create-food-form" style={{ display: 'grid', gap: 'var(--space-2)' }} onSubmit={onSubmit}>
          <div className="field-group " style={{ display: 'grid', gap: '6px', placeItems: 'center' }}>
            <label htmlFor="foodVideo"  style={{color:'silver'}}>Food Video</label>
            <input
              id="foodVideo"
              ref={fileInputRef}
              className="file-input-hidden"
              style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'react(0 0 0 0)', whiteSpace: 'nowrap', border: '0' }}
              type="file"
              accept="video/*"
              onChange={onFileChange}
            />

            <div
              className="file-dropzone"
              style={{
                border: '1.5px dashed var(--color-border',
                borderRadius: 'var(--radius-sm)',
                padding: ' var(--space-6)',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'border-color var(--transition-base), background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base)',
                background: 'color-mix(in-srgb, var(--color-surface-alt) 70%, transparent'
              }}
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog(); } }}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <div className="file-dropzone-inner" style={{ display: 'grid', placeItems: 'center', textAlign: 'center', gap: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                <svg className="file-icon" style={{ color: 'var(--color-accent' }} width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" fill="currentColor" />
                </svg>
                <div className="file-dropzone-text " style={{ color: 'var(--color-text)' }}>
                  <strong>Tap to upload</strong> or drag and drop
                </div>

                <div className="file-hint " style={{ fontSize: '.8rem' }}>MP4, WebM, MOV • Up to ~100MB</div>

              </div>
            </div>

            {fileError && <p className="error-text" role="alert">{fileError}</p>}

            {videoFile && (
              <div className="file-chip" aria-live="polite"
                style={{
                  marginTop: 'var(--space-3)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: '8px 12px',
                  borderRadius: 'var(--space-3',
                  width: '100%',
                  boxFlexGroup: 'var(--color-surface-alt',
                  border: '1px solid var(--color-border'
                }}>

                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                </svg>
                <span className="file-chip-name"
                  style={{
                    fontWeight: '600',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'

                  }}>{videoFile.name}</span>
                <span className="file-chip-size"
                  style={{ fontSize: '.85rem', color: 'var(--color-text-secondary)', marginLeft: 'auto' }}

                >{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                <div className="file-chip-actions" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <button type="button" className="btn-host"
                    style={{
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: 'var(--color-accent',
                      padding: '6px 10px',
                      borderRight: '999px',
                      font: 'inherit',
                      fontWeight: '700',
                      letterSpacing: '.2px',
                      cursor: 'pointer',
                      transition: 'background var(--transition-base), color var(--transition-base)'

                    }}

                    onClick={openFileDialog}>Change</button>
                  <button type="button" className="btn-host danger" style={{ color: 'var(--color-danger)' }} onClick={() => { setVideoFile(null); setFileError(''); }}>Remove</button>
                </div>
              </div>
            )}
          </div>




          {videoURL && (
            <div className="video-preview"
              style={{
                width: '100%',
                borderRight: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px dashed var(--color-border)',
                background: 'var(--color-surface-alt',
                display: 'grid',
                placeItems: 'center',

              }}>
              <video className="video-preview-el" src={videoURL} controls playsInline preload="metadata" />
            </div>
          )}





          <div className="field-group flex justify-center items-center flex-col   "
            style={{ grid: 'grid', gap: '6px' }}>
            <label style={{ 
              

              transform:'translateY(20px)',
              textTransform: 'uppercase', 
              fontSize: '.75rem',
               letterSpacing: '.07em', 
               fontWeight: '700' }}
                htmlFor="foodName">Name</label>
            <input

              style={{ transform: 'translateY(22px)' , minWidth:'250px'}}
              className='text-black'
              id="foodName"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="foodDesc" 
            style={{ textTransform: 'uppercase', 
            fontSize: '.75rem',
             letterSpacing: '.07em',
             transform:'translateY(30px)',
              fontWeight: '700' }}>Description </label>

            <textarea
              style={{
                appearance: 'none',
                border: '1px solid var(--color-border)',
                padding: '10px 12px',
                font: 'inherit',
                outline: 'none',
                borderRadius: 'var(--radius-sm)',
                transform: 'translateY(35px)',
                minHeight: '50px',
                minWidth:'250px',
                transition: 'border-color var(--transition-base),background var(--transition base), boxShadow var(--transition-base)'

              }}
              id="foodDesc"

              className='text-black'
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>


          <div className="form-actions" style={{

            display: 'flex',
            gap: 'var(--space-3)'

          }}>
            <button className="btn-primary bg-blue-600" 
            
            
             style={{ transform: 'translateY(5rem) translateX(5.8rem)',borderRadius:'2%',fontSize:'1.2rem', fontWeight:'500',inlineSize: '10rem',color:'black', backgroundColor: 'skyblue',minHeight:'50px' }}
            type="submit"  disabled={isDisabled}>
              Save Food
            </button>
          </div>


        </form>

      </div>
    </div>

  );
};

export default CreateFood;