 import React, { useState, useEffect } from "react";
 import styled, { keyframes } from "styled-components";
 
 // Анімація для градієнтного тексту (якщо є 270deg)
 const flow = keyframes`
   0% { background-position: 0% 50%; }
   50% { background-position: 100% 50%; }
   100% { background-position: 0% 50%; }
 `;
 
 const ModalOverlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   background: rgba(0,0,0,0.6);
   z-index: 2000;
   display: flex;
   align-items: center;
   justify-content: center;
 `;
 
 const ModalContent = styled.div`
   background: #fff;
   border-radius: 16px;
   min-width: 320px;
   max-width: 420px;
   width: 90%;
   padding: 24px;
   box-shadow: 0 4px 24px #0003;
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 18px;
 `;
 
 const CloseButton = styled.button`
   position: absolute;
   top: 10px;
   right: 18px;
   background: none;
   border: none;
   font-size: 32px;
   cursor: pointer;
   color: #000;
 `;
 
 const DeviceList = styled.ul`
   padding-left: 18px;
   margin: 0;
 `;
 
 const UserList = styled.ul`
   padding-left: 0;
   margin: 0;
   list-style: none;
 `;
 
 const UserSearchModal = ({ isOpen, onClose, currentAvatar }) => {
   const [userSearch, setUserSearch] = useState("");
   const [users, setUsers] = useState([]);
   const [devices, setDevices] = useState([]);
   const [loading, setLoading] = useState(false);
 
   // Адреса вашого Node.js сервера
   const API_BASE = "http://localhost:5000";
 
   useEffect(() => {
     if (!isOpen) return;
     setLoading(true);
 
     // 1. Пошук користувачів на сервері
     fetch(`${API_BASE}/api/users?search=${encodeURIComponent(userSearch)}`)
       .then(res => res.json())
       .then(data => {
         setUsers(data.users || []);
         setLoading(false);
       })
       .catch((err) => {
         console.error("Fetch users error:", err);
         setLoading(false);
       });
 
     // 2. Отримання списку пристроїв
     fetch(`${API_BASE}/api/devices/me`)
       .then(res => res.json())
       .then(data => setDevices(data.devices || []))
       .catch(err => console.error("Fetch devices error:", err));
   }, [isOpen, userSearch]);
 
   if (!isOpen) return null;
 
   return (
     <ModalOverlay onClick={onClose}>
       <ModalContent onClick={e => e.stopPropagation()}>
         <CloseButton onClick={onClose}>&times;</CloseButton>
         <h3 style={{ textAlign: "center", margin: 0, fontWeight: 900 }}>Пошук користувачів</h3>
         
         <input
           type="text"
           placeholder="Введіть ім'я користувача..."
           style={{
             padding: 10,
             border: "1px solid #ddd",
             borderRadius: 8,
             width: "100%",
             fontSize: 15,
             marginBottom: 10,
             boxSizing: "border-box"
           }}
           value={userSearch}
           onChange={e => setUserSearch(e.target.value)}
         />
 
         {/* Секція пристроїв */}
         <div style={{ marginTop: 10 }}>
           <div style={{ fontWeight: 700, marginBottom: 6 }}>Ваші пристрої:</div>
           {devices.length === 0 ? (
             <div style={{ fontSize: 13, color: '#555' }}>Пристрої не знайдено.</div>
           ) : (
             <DeviceList>
               {devices.map(dev => (
                 <li key={dev._id || dev.deviceId} style={{ marginBottom: 4, fontSize: 13 }}>
                   <span style={{ fontWeight: 600 }}>{dev.name}</span> <span style={{ color: '#888' }}>({dev.type})</span>
                   <div style={{ color: '#aaa', fontSize: 11 }}>Активність: {dev.lastActive}</div>
                 </li>
               ))}
             </DeviceList>
           )}
         </div>
 
         {/* Секція результатів пошуку */}
         <div style={{ marginTop: 18 }}>
           <div style={{ fontWeight: 700, marginBottom: 6 }}>Знайдені користувачі:</div>
           {loading ? (
             <div style={{ fontSize: 13, color: '#555' }}>Завантаження...</div>
           ) : users.length === 0 ? (
             <div style={{ fontSize: 13, color: '#555' }}>Нікого не знайдено.</div>
           ) : (
             <UserList>
               {users.map(u => (
                 <li key={u._id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                   {/* Аватар з підтримкою градієнтної обводки */}
                   <div
                     style={{
                       width: 42,
                       height: 42,
                       borderRadius: '50%',
                       padding: '2px', // Простір для бордера
                       background: u.borderColor?.includes('linear') ? u.borderColor : 'transparent',
                       border: !u.borderColor?.includes('linear') ? `2px solid ${u.borderColor || '#ccc'}` : 'none',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center'
                     }}
                   >
                     <img 
                       src={u.avatar || currentAvatar} 
                       alt="avatar" 
                       style={{ 
                         width: '100%', 
                         height: '100%', 
                         borderRadius: '50%', 
                         objectFit: 'cover',
                         background: '#fff' 
                       }} 
                     />
                   </div>
                   <span
                     style={{
                       fontWeight: 700,
                       fontSize: 16,
                       background: u.textColor?.includes('linear') ? u.textColor : 'none',
                       color: !u.textColor?.includes('linear') ? (u.textColor || '#000') : 'transparent',
                       WebkitBackgroundClip: u.textColor?.includes('linear') ? 'text' : 'unset',
                       backgroundClip: u.textColor?.includes('linear') ? 'text' : 'unset',
                       backgroundSize: '200% 200%',
                       animation: u.textColor?.includes('270deg') ? `${flow} 4s linear infinite` : 'none',
                     }}
                   >
                     {u.firstName}
                   </span>
                 </li>
               ))}
             </UserList>
           )}
         </div>
       </ModalContent>
     </ModalOverlay>
   );
 };
 
 export default UserSearchModal;
