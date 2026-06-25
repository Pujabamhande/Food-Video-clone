import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios';
import { NavLink, Link } from 'react-router-dom'
const Home = () => {

  const [videos, setVideos] = useState([])
  const videoRefs = useRef(new Map())
  const containerRef = useRef(null)


  useEffect(() => {
    axios.get("http://localhost:5000/api/food/save", { withCredentials: true })
      .then(response => 
     
       
        {
           
   
    
        const savedFoods = response.data.savedFoods.map((item) =>(
          {   
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount:item.food.savesCount,
          comments:item.food.comments
            
        }))

        setVideos(savedFoods)

      }).catch(err=>console.log(err))
  },[])


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [videos])



  useEffect(() => {

    axios.get('http://localhost:5000/api/food', { withCredentials: true })
      .then(response => {

   
        setVideos(response.data.foodItems);


      }).catch(() => {/* optionally */ })
  }, [])

  const setVideoRef = (id) => (el) => {

    if (!el) {

      videoRefs.current.delete(id)
      return
    }

    videoRefs.current.set(id, el)
  }






  async function likeVideo(item) {

    const response = await axios.post('http://localhost:5000/api/food/like', { foodId: item._id }, { withCredentials: true })

    if (response.data.like) {


      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
    } else {

      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
    }


  }

  async function bookmarkVideo(item) {


    const response = await axios.post("http://localhost:5000/api/food/save", { foodId: item._id }, { withCredentials: true })

    if (response.data.save) {


      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
    } else {


      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
    }
  }




  return (

    <div ref={containerRef} className='reel-page' style={{ overflow: 'hidden', height: '100dvh' }}>
      <div className='reels-feed' role='list' style={{ height: '100%', width: '100%', overflowY: 'auto', scrollSnapType: 'y mandatory', overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>

        {videos.map((item) => (

          <section key={item._id} className='reel' role="listItem" style={{ position: 'relative', height: '100dvh', width: '100%', scrollSnapAlign: 'start' }}>

            <video


              style={{ position: 'absolute', height: '100%', width: '100%', inset: '0', objectPosition: "center", objectFit: 'cover' }}

              ref={setVideoRef(item._id)}
              className='reel-video'
              src={item.video}
              muted
              playsInline
              loop
              preload='metadata'

            />


            <div className='="reel-overlay' style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'flex-end', pointerEvents: 'none' }}>

              <div className='reel-overlay-gradient' style={{ position: 'absolute', inset: '0' }} aria-hidden="true" />
              <div className='reel-content' style={{
                position: 'relative',
                width: '100%',
                padding: 'var(--space-6)',
                paddingBottom: 'calc(env(safe-area-inset-bottom,0)+72px)',
                display: 'flex ',
                flexDirection: 'column',
                paddingRight: '4.5rem',
                gap: 'var(--space-4)',
                pointerEvents: 'auto'
              }}>

                <p className='reel-description' title={item.description}

                  style={{ transform: 'translateY(-70px) translateX(15px)' }}

                >{item.description}</p>

                <Link className=' reel-btn '

                  to={'/food-partner/' + item.foodPartner}

                  style={{

                    transform: 'translateX(10px)',
                    position: 'relative',
                    bottom: 60,
                    alignSelf: 'flex-start ',
                    background: 'var(--color-accent)',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '10px 16px',
                    fontWeight: '700',
                    letterSpacing: '.3px',
                    backdropFilter: 'blur(2px)',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,.15)',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'tranform var(--transition-base) , background var(--transition-base) , boxShadow var(--transition-base) '

                  }}


                  aria-label='Visit store'>Visit Store</Link>

                {/* nav */}

                <nav className="bottom-nav" role="navigation" aria-label="Bottom"
                  style={{
                    position: 'fixed',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    height: '50px',
                    background: 'color-mix(in srgb, gray 10%, transparent',

                    boxShadow: 'var(--shadow-md)',
                    color: '#fff',
                    borderTop: '1px solid var(--color-border)',
                    border: '1px solid rgba(255,255,255,.15'



                  }}>
                  <div className="bottom-nav__inner" style={{

                    maxWidth: '720px',
                    margin: '0 auto',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                  }}>
                    <NavLink to="/Home"

                      style={{

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        gap: 'none'

                      }}


                      end className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
                      <span className="bottom-nav__icon" aria-hidden="true" style={{ lineHeight: '0' }}>
                        {/* home icon */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 10.5 12 3l9 7.5" />
                          <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
                        </svg>
                      </span>
                      <span className="bottom-nav_label" style={{ fontSize: '12px' }}>Home</span>
                    </NavLink>

                    <NavLink to="/saved"

                      style={{

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        gap: 'none'

                      }}
                      className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
                      <span className="bottom-nav__icon" aria-hidden="true" style={{ lineHeight: '0' }}>
                        {/* bookmark icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                        </svg>
                      </span>
                      <span className="bottom-nav__label" style={{ fontSize: '12px' }}>Saved</span>
                    </NavLink>

                  </div>
                </nav>

                {/* like count area*/}



                <div className='reel-actions' style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '96px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  pointerEvents: 'auto'
                }}>

                  <div className='reel-action-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#fff' }}>
                    <button

                      onClick={() => likeVideo(item)}
                      className="reel-action"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '999px',
                        display: 'grid',
                        placeItems: 'center',
                        backgroundColor: 'color-mix(in srgb,#000 35%,transparent)',
                        backdropFilter: 'blur(2px)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,.15)',
                        boxShadow: 'var(--shadow-md)'
                      }}
                      aria-label="Like"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                    </button>
                    <div style={{ fontWeight: '720' }} className="reel-action__count">{item.likeCount ?? item.likes ?? 0}</div>
                  </div>



                  <div className="reel-action-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#fff' }}>
                    <button
                      className="reel-action"
                      style={{ width: '48px', height: '48px', borderRadius: '999px', display: 'grid', placeItems: 'center', backgroundColor: 'color-mix(in srgb,#000 35%,transparent)', backdropFilter: 'blur(2px)', color: '#fff', border: '1px solid rgba(255,255,255,.15)', boxShadow: 'var(--shadow-md)' }}
                      onClick={() => bookmarkVideo(item)}
                      aria-label="Bookmark"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                      </svg>
                    </button>
                    <div style={{ fontWeight: '720' }} className="reel-action__count">{item.savesCount ?? item.bookmarks ?? item.saves ?? 0}</div>
                  </div>





                  <div className="reel-action-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#fff' }}>
                    <button className="reel-action"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '999px',
                        display: 'grid',
                        placeItems: 'center',
                        backgroundColor: 'color-mix(in srgb,#000 35%,transparent)',
                        backdropFilter: 'blur(2px)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,.15)',
                        boxShadow: 'var(--shadow-md)'
                      }}

                      aria-label="Comments">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                      </svg>
                    </button>
                    <div style={{ fontWeight: '720' }} className="reel-action__count">{item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}</div>
                  </div>


                </div>

              </div>


            </div>

          </section>
        ))}


      </div>

    </div>

  )

}

export default Home;