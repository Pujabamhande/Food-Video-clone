import React, { useState, useEffect} from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {

    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [id])


    return (
        <main className="profile-page"
            style={{
                maxWidth: '1100px',
                margin: '0 auto', padding: 'var(--space)  var(--space-6) var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)'
            }}>
            <section className="profile-header"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-6)'

                }}>

                <div className="profile-meta" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: 'var(--space-6)' }}>


                    <img className='profile-avatar'

                        style={{

                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            background: 'var(--surface-alt)',
                            border: '2px solid var(--color-border)'
                        }}


                        src='https://sp.yimg.com/ib/th/id/OIP.1y5AAjAebImTT-GgOEuPaAHaM9?pid=Api&w=148&h=148&c=7&dpr=2&rs=1'
                        alt="Avatar" />


                    <div className="profile-info" style={{ display: 'grid', gap: 'var(--space-3)' }}>
                        <h1 className="profile-pill profile-business" style={{ display: 'inline-flex', padding: '10px 14px', borderRadius: '12px', fontSize: '1.25rem', fontWeight: '700', width: 'fit-content' }}
                            title="Business name">
                            {profile?.name}
                        </h1>
                        <p className="profile-pill profile-address" style={{ display: 'inline-flex', width: 'fit-content', padding: '10px 14px', borderRadius: '12px', fontSize: '1.05rem', color: 'var(--color-text-secondary' }} title="Address">
                            {profile?.address}
                        </p>
                    </div>
                </div>

                <div className="profile-stats"

                    style={{

                        display: 'grid',
                        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                        gap: 'var(--space-6)',
                        borderTop: '1px dashed var(--color-border)',
                        paddingTop: 'var(--space-6)',





                    }}

                    role="list" aria-label="Stats">
                    <div className="profile-stat" style={{ display: 'grid', gridTemplateColumns: 'auto auto', justifyItems: 'center', gap: 'var(--space-2)' }} role="listitem">
                        <span className="profile-stat-label" style={{ fontSize: '1.15rem' }}>total meals</span>
                        <span className="profile-stat-value" style={{ fontSize: '2rem', fontWeight: 800 }}>{profile?.totalMeals}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label" style={{ fontSize: '1.15rem' }}>customer served</span>
                        <span className="profile-stat-value" style={{ fontSize: '2rem', fontWeight: 800 }}>{profile?.customersServed}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" style={{ height: '1px', border: 'none', background: 'var(--color-border)' }} />


            <section className="profile-grid " style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }} aria-label="Videos">
                {videos.map((v) => (

                    <div key={v._id} className="profile-grid-item  " style={{ border: 'none', aspectRatio: '3/4' }}>
                        {/* Placeholder tile; replace with <video> or <img> as needed */}


                        <video
                            className="profile-grid-video "
                            style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'grid', placeItems: 'center', fontSize: '1.5rem', background: 'var(--color-surface)' }}
                            src={v.video} muted ></video>


                    </div>
                ))}
            </section>

        </main>
    )
}

export default Profile