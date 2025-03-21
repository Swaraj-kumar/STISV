




// import React, { useEffect, useRef, useState } from 'react';
// import './DistinguishedSpeaker.css';

// const plenarySpeakers = [
//   { name: "Prof. Hiroshi Nogami", affiliation: "Tohoku University, Japan" },
//   { name: "Prof. Nirupam Chakraborti", affiliation: "Czech Technical University in Prague" },
// ];

// const invitedSpeakers = [
//   { name: "Prof. Shigeru Ueda", affiliation: "Tohoku University, Japan" },
//   { name: "Prof. Ronald O'Malley", affiliation: "Missouri University, USA" },
//   { name: "Dr. Y Gordon", affiliation: "Hatch, Canada" },
//   { name: "Prof. Joohyun Park", affiliation: "Hanyang University, Korea" },
//   { name: "Prof. H. Matsuura", affiliation: "University of Tokyo, Japan" },
//   { name: "Prof. Alberto Conejo", affiliation: "USTB, China" },
//   { name: "Prof. Geoff Wang", affiliation: "University of Queensland, Australia" },
//   { name: "Prof. Jung-Wook Cho", affiliation: "POSTECH, Korea" },
//   { name: "Prof. Konstantin V. Grigorovich", affiliation: "RAS, Russia" },
//   { name: "Prof. Miroslaw Karbowniczek", affiliation: "AGH University, Poland" },
//   { name: "Prof. Paulo Santos Assis", affiliation: "UFOP, Brazil" },
//   { name: "Prof. Pasquale D Cavaliere", affiliation: "University of Salento, Italy" },
//   { name: "Prof. Kazuki Morita", affiliation: "Tokyo, Japan" },
//   { name: "Prof. G.A Brook", affiliation: "Swinburne University, Australia" },
//   { name: "Prof. Olena Volkova", affiliation: "Technical University Frieberg, Germany" },
//   { name: "Prof. S.J. KIM", affiliation: "Chosun University, Korea" },
//   { name: "Prof. M. Hayashi", affiliation: "Institute of Science, Tokyo, Japan" },
//   { name: "Dr. Ricardo Carli", affiliation: "Prosimet, Italy" },
//   { name: "Prof. Jorge Madias", affiliation: "Metallion, Argentina" },
//   { name: "Prof. Ko-ichiro OHNO", affiliation: "KYUSHU University, Japan" },
// ];

// const DistinguishedSpeaker = () => {
//   const carouselRef = useRef(null);
//   const [autoScrollPaused, setAutoScrollPaused] = useState(false);

//   // Manual Arrow Controls
//   const scrollLeft = () => {
//     setAutoScrollPaused(true);
//     carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//   };

//   const scrollRight = () => {
//     setAutoScrollPaused(true);
//     carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//   };

//   // Auto-scroll every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!autoScrollPaused && carouselRef.current) {
//         carouselRef.current.scrollBy({ left: 1, behavior: 'smooth' });
//       }
//     }, 20); // smaller value = smoother motion

//     return () => clearInterval(interval);
//   }, [autoScrollPaused]);

//   // Restart auto-scroll after a pause
//   useEffect(() => {
//     if (autoScrollPaused) {
//       const resume = setTimeout(() => setAutoScrollPaused(false), 4000); // 4s pause after user interaction
//       return () => clearTimeout(resume);
//     }
//   }, [autoScrollPaused]);

//   const duplicatedSpeakers = [...invitedSpeakers, ...invitedSpeakers]; // seamless loop

//   return (
//     <div className="distinguished-speaker-container">
//       {/* <h2 className="title">Distinguished Speakers</h2> */}

//       <h3 className="section-heading">Plenary Speakers</h3>
//       <div className="carousel-wrapper no-scroll">
//         <div className="carousel-track no-animation">
//           {plenarySpeakers.map((speaker, index) => (
//             <div key={index} className="speaker-card">
//               <div className="speaker-avatar">
//                 <img src={`https://i.pravatar.cc/150?u=plenary-${index}`} alt={speaker.name} />
//               </div>
//               <div className="speaker-info">
//                 <h3>{speaker.name}</h3>
//                 <p>{speaker.affiliation}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <h3 className="section-heading">Invited Speakers</h3>
//       <div className="carousel-wrapper arrow-enabled">
//         <button className="carousel-button prev" onClick={scrollLeft}>&#10094;</button>

//         <div className="carousel-track scrollable" ref={carouselRef}>
//           {duplicatedSpeakers.map((speaker, index) => (
//             <div key={index} className="speaker-card">
//               <div className="speaker-avatar">
//                 <img src={`https://i.pravatar.cc/150?u=invited-${index}`} alt={speaker.name} />
//               </div>
//               <div className="speaker-info">
//                 <h3>{speaker.name}</h3>
//                 <p>{speaker.affiliation}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button className="carousel-button next" onClick={scrollRight}>&#10095;</button>
//       </div>
//     </div>
//   );
// };

// export default DistinguishedSpeaker;







// Trial 1

// import React, { useEffect, useRef, useState } from 'react';
// import './DistinguishedSpeaker.css';

// const plenarySpeakers = [
//   {
//     name: "Prof. Hiroshi Nogami",
//     affiliation: "Tohoku University, Japan",
//     url: "https://www.r-info.tohoku.ac.jp/en/3ace24fb652e45919a59410fd85caede.html",
//   },
//   {
//     name: "Prof. Nirupam Chakraborti",
//     affiliation: "Czech Technical University in Prague",
//     url: "https://scholar.google.co.kr/citations?user=RONBrJ0AAAAJ&hl=en",
//   },
//   {
//     name: "Prof. Henrik Saxén",
//     affiliation: "Abo Akademi University, Finland",
//     url: "https://users.abo.fi/hsaxen/",
//   },
// ];

// const invitedSpeakers = [
//   {
//     name: "Prof. Shigeru Ueda",
//     affiliation: "Tohoku University, Japan",
//     url: null,
//   },
//   {
//     name: "Prof. Ronald O’Malley",
//     affiliation: "Missouri University of Science and Technology, USA",
//     url: "https://scholar.google.com/citations?user=S_R3hM0AAAAJ&hl=en",
//   },
//   {
//     name: "Dr. Y Gordon",
//     affiliation: "Hatch, Canada",
//     url: null,
//   },
//   {
//     name: "Prof. Dr. Joohyun Park",
//     affiliation: "Hanyang University, Korea",
//     url: "https://scholar.google.co.kr/citations?user=fgty4vUAAAAJ&hl=en",
//   },
//   {
//     name: "Prof. H. Matsuura",
//     affiliation: "University of Tokyo, Japan",
//     url: "https://www.material.t.u-tokyo.ac.jp/faculty/hiroyuki_matsuura_e.html",
//   },
//   {
//     name: "Prof. Alberto Conejo",
//     affiliation: "USTB, China",
//     url: "https://www.researchgate.net/profile/Alberto-Conejo",
//   },
//   {
//     name: "Prof. Geoff Wang",
//     affiliation: "University of Queensland, Australia",
//     url: "https://about.uq.edu.au/experts/525",
//   },
//   {
//     name: "Prof. Jung-Wook Cho",
//     affiliation: "POSTECH, Korea",
//     url: "https://www.researchgate.net/profile/Jungwook-Cho",
//   },
//   {
//     name: "Prof. Konstantin V. Grigorovich",
//     affiliation: "RAS, Russia",
//     url: "https://www.researchgate.net/profile/Konstantin-Grigorovich",
//   },
//   {
//     name: "Prof. Miroslaw Karbowniczek",
//     affiliation: "AGH University, Poland",
//     url: "https://www.researchgate.net/profile/Miroslaw-Karbowniczek",
//   },
//   {
//     name: "Prof. Paulo Santos Assis",
//     affiliation: "UFOP, Brazil",
//     url: "https://www.researchgate.net/profile/Paulo-Assis-2",
//   },
//   {
//     name: "Prof. Pasquale D Cavaliere",
//     affiliation: "University of Salento, Italy",
//     url: "https://www.unisalento.it/scheda-utente/-/people/pasquale.cavaliere",
//   },
//   {
//     name: "Prof. Kazuki Morita",
//     affiliation: "Tokyo, Japan",
//     url: "https://www.material.t.u-tokyo.ac.jp/faculty/morita_e.html",
//   },
//   {
//     name: "Prof. G.A Brook",
//     affiliation: "Swinburne University, Australia",
//     url: "https://geography.uga.edu/directory/people/george-brook",
//   },
//   {
//     name: "Prof. Olena Volkova",
//     affiliation: "Technical University Frieberg, Germany",
//     url: "https://www.researchgate.net/profile/Olena-Volkova-2",
//   },
//   {
//     name: "Prof. S.J. KIM",
//     affiliation: "Chosun University, Korea",
//     url: "https://www.unlv.edu/people/sj-kim",
//   },
//   {
//     name: "Prof. M. Hayashi",
//     affiliation: "Institute of Science, Tokyo, Japan",
//     url: "https://www.s.u-tokyo.ac.jp/en/people/hayashi_masamitsu/",
//   },
//   {
//     name: "Dr. Ricardo Carli",
//     affiliation: "Prosimet, Italy",
//     url: "https://gift.postech.ac.kr/bbs/board.php?bo_table=eng5_4&wr_id=157",
//   },
//   {
//     name: "Prof. Jorge Madias",
//     affiliation: "Metallion, Argentina",
//     url: "https://www.researchgate.net/profile/Jorge-Madias",
//   },
//   {
//     name: "Prof. Ko-ichiro OHNO",
//     affiliation: "KYUSHU University, Japan",
//     url: "https://www.researchgate.net/profile/Ko-Ichiro-Ohno",
//   },
//   {
//     name: "Prof. Charlotte Anderson",
//     affiliation: "Lulea University of Technology, Sweden",
//     url: "https://www.physicaltherapy.utoronto.ca/charlotte-anderson",
//   },
// ];

// const DistinguishedSpeaker = () => {
//   const plenaryRef = useRef(null);
//   const invitedRef = useRef(null);
//   const [autoScrollPaused, setAutoScrollPaused] = useState(false);

//   const scroll = (ref, amount) => {
//     setAutoScrollPaused(true);
//     ref.current.scrollBy({ left: amount, behavior: 'smooth' });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!autoScrollPaused) {
//         plenaryRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
//         invitedRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
//       }
//     }, 20);
//     return () => clearInterval(interval);
//   }, [autoScrollPaused]);

//   useEffect(() => {
//     if (autoScrollPaused) {
//       const timeout = setTimeout(() => setAutoScrollPaused(false), 4000);
//       return () => clearTimeout(timeout);
//     }
//   }, [autoScrollPaused]);

//   const duplicatedPlenary = [...plenarySpeakers, ...plenarySpeakers];
//   const duplicatedInvited = [...invitedSpeakers, ...invitedSpeakers];

//   return (
//     <div className="distinguished-speaker-container">
// <h3 className="section-heading">Plenary Speakers</h3>
// <div className="carousel-wrapper no-scrollbar">
//   <div className="carousel-track plenary-static">
//     {plenarySpeakers.map((speaker, index) => (
//       <a
//         key={`plenary-${index}`}
//         href={speaker.url || "#"}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="speaker-card"
//         style={{ textDecoration: "none" }}
//       >
//         <div className="speaker-avatar">
//           <img
//             src={`https://i.pravatar.cc/150?u=plenary-${index}`}
//             alt={speaker.name}
//           />
//         </div>
//         <div className="speaker-info">
//           <h3>{speaker.name}</h3>
//           <p>{speaker.affiliation}</p>
//         </div>
//       </a>
//     ))}
//   </div>
// </div>
//       <h3 className="section-heading">Invited Speakers</h3>
//       <div className="carousel-wrapper arrow-enabled">
//         <button className="carousel-button prev" onClick={() => scroll(invitedRef, -300)}>&#10094;</button>
//         <div className="carousel-track scrollable" ref={invitedRef}>
//           {duplicatedInvited.map((speaker, index) => (
//             <a
//               key={`invited-${index}`}
//               href={speaker.url || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="speaker-card"
//               style={{ textDecoration: 'none' }}
//             >
//               <div className="speaker-avatar">
//                 <img src={`https://i.pravatar.cc/150?u=invited-${index}`} alt={speaker.name} />
//               </div>
//               <div className="speaker-info">
//                 <h3>{speaker.name}</h3>
//                 <p>{speaker.affiliation}</p>
//               </div>
//             </a>
//           ))}
//         </div>
//         <button className="carousel-button next" onClick={() => scroll(invitedRef, 300)}>&#10095;</button>
//       </div>
//     </div>
//   );
// };

// export default DistinguishedSpeaker;












// working



// import React, { useEffect, useRef, useState } from 'react';
// import './DistinguishedSpeaker.css';

// const plenarySpeakers = [
//   {
//     name: "Prof. Hiroshi Nogami",
//     affiliation: "Tohoku University, Japan",
//     url: "https://www.r-info.tohoku.ac.jp/en/3ace24fb652e45919a59410fd85caede.html",
//   },
//   {
//     name: "Prof. Nirupam Chakraborti",
//     affiliation: "Czech Technical University in Prague",
//     url: "https://scholar.google.co.kr/citations?user=RONBrJ0AAAAJ&hl=en",
//   },
//   {
//     name: "Prof. Henrik Saxén",
//     affiliation: "Abo Akademi University, Finland",
//     url: "https://users.abo.fi/hsaxen/",
//   },
// ];

// const invitedSpeakers = [
//   {
//     name: "Prof. Shigeru Ueda",
//     affiliation: "Tohoku University, Japan",
//     url: null,
//   },
//   {
//     name: "Prof. Ronald O'Malley",
//     affiliation: "Missouri University of Science and Technology, USA",
//     url: "https://scholar.google.com/citations?user=S_R3hM0AAAAJ&hl=en",
//   },
//   {
//     name: "Dr. Y Gordon",
//     affiliation: "Hatch, Canada",
//     url: null,
//   },
//   {
//     name: "Prof. Dr. Joohyun Park",
//     affiliation: "Hanyang University, Korea",
//     url: "https://scholar.google.co.kr/citations?user=fgty4vUAAAAJ&hl=en",
//   },
//   {
//     name: "Prof. H. Matsuura",
//     affiliation: "University of Tokyo, Japan",
//     url: "https://www.material.t.u-tokyo.ac.jp/faculty/hiroyuki_matsuura_e.html",
//   },
//   {
//     name: "Prof. Alberto Conejo",
//     affiliation: "USTB, China",
//     url: "https://www.researchgate.net/profile/Alberto-Conejo",
//   },
//   {
//     name: "Prof. Geoff Wang",
//     affiliation: "University of Queensland, Australia",
//     url: "https://about.uq.edu.au/experts/525",
//   },
//   {
//     name: "Prof. Jung-Wook Cho",
//     affiliation: "POSTECH, Korea",
//     url: "https://www.researchgate.net/profile/Jungwook-Cho",
//   },
//   {
//     name: "Prof. Konstantin V. Grigorovich",
//     affiliation: "RAS, Russia",
//     url: "https://www.researchgate.net/profile/Konstantin-Grigorovich",
//   },
//   {
//     name: "Prof. Miroslaw Karbowniczek",
//     affiliation: "AGH University, Poland",
//     url: "https://www.researchgate.net/profile/Miroslaw-Karbowniczek",
//   },
//   {
//     name: "Prof. Paulo Santos Assis",
//     affiliation: "UFOP, Brazil",
//     url: "https://www.researchgate.net/profile/Paulo-Assis-2",
//   },
//   {
//     name: "Prof. Pasquale D Cavaliere",
//     affiliation: "University of Salento, Italy",
//     url: "https://www.unisalento.it/scheda-utente/-/people/pasquale.cavaliere",
//   },
//   {
//     name: "Prof. Kazuki Morita",
//     affiliation: "Tokyo, Japan",
//     url: "https://www.material.t.u-tokyo.ac.jp/faculty/morita_e.html",
//   },
//   {
//     name: "Prof. G.A Brook",
//     affiliation: "Swinburne University, Australia",
//     url: "https://geography.uga.edu/directory/people/george-brook",
//   },
//   {
//     name: "Prof. Olena Volkova",
//     affiliation: "Technical University Frieberg, Germany",
//     url: "https://www.researchgate.net/profile/Olena-Volkova-2",
//   },
//   {
//     name: "Prof. S.J. KIM",
//     affiliation: "Chosun University, Korea",
//     url: "https://www.unlv.edu/people/sj-kim",
//   },
//   {
//     name: "Prof. M. Hayashi",
//     affiliation: "Institute of Science, Tokyo, Japan",
//     url: "https://www.s.u-tokyo.ac.jp/en/people/hayashi_masamitsu/",
//   },
//   {
//     name: "Dr. Ricardo Carli",
//     affiliation: "Prosimet, Italy",
//     url: "https://gift.postech.ac.kr/bbs/board.php?bo_table=eng5_4&wr_id=157",
//   },
//   {
//     name: "Prof. Jorge Madias",
//     affiliation: "Metallion, Argentina",
//     url: "https://www.researchgate.net/profile/Jorge-Madias",
//   },
//   {
//     name: "Prof. Ko-ichiro OHNO",
//     affiliation: "KYUSHU University, Japan",
//     url: "https://www.researchgate.net/profile/Ko-Ichiro-Ohno",
//   },
//   {
//     name: "Prof. Charlotte Anderson",
//     affiliation: "Lulea University of Technology, Sweden",
//     url: "https://www.physicaltherapy.utoronto.ca/charlotte-anderson",
//   },
// ];

// const DistinguishedSpeaker = () => {
//   const plenaryRef = useRef(null);
//   const invitedRef = useRef(null);
//   const [autoScrollPaused, setAutoScrollPaused] = useState(false);

//   const scroll = (ref, amount) => {
//     setAutoScrollPaused(true);
//     ref.current.scrollBy({ left: amount, behavior: 'smooth' });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!autoScrollPaused) {
//         plenaryRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
//         invitedRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
//       }
//     }, 20);
//     return () => clearInterval(interval);
//   }, [autoScrollPaused]);

//   useEffect(() => {
//     if (autoScrollPaused) {
//       const timeout = setTimeout(() => setAutoScrollPaused(false), 4000);
//       return () => clearTimeout(timeout);
//     }
//   }, [autoScrollPaused]);

//   const duplicatedPlenary = [...plenarySpeakers, ...plenarySpeakers];
//   const duplicatedInvited = [...invitedSpeakers, ...invitedSpeakers];

//   return (
//     <div className="distinguished-speaker-container">
//       <h3 className="section-heading">Plenary Speakers</h3>
//       <div className="carousel-wrapper no-scrollbar">
//         <div className="carousel-track plenary-static">
//           {plenarySpeakers.map((speaker, index) => (
//             <a
//               key={`plenary-${index}`}
//               href={speaker.url || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="speaker-card"
//               style={{ textDecoration: "none" }}
//             >
//               <div className="speaker-avatar">
//                 <img
//                   src="/assets/speakers/Hiroshi.JPG"
//                   alt={speaker.name}
//                 />
//               </div>
//               <div className="speaker-info">
//                 <h3>{speaker.name}</h3>
//                 <p>{speaker.affiliation}</p>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//       <h3 className="section-heading">Invited Speakers</h3>
//       <div className="carousel-wrapper arrow-enabled">
//         <button className="carousel-button prev" onClick={() => scroll(invitedRef, -300)}>&#10094;</button>
//         <div className="carousel-track scrollable" ref={invitedRef}>
//           {duplicatedInvited.map((speaker, index) => (
//             <a
//               key={`invited-${index}`}
//               href={speaker.url || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="speaker-card"
//               style={{ textDecoration: 'none' }}
//             >
//               <div className="speaker-avatar">
//                 <img 
//                   src="/assets/speakers/Hiroshi.JPG" 
//                   alt={speaker.name} 
//                 />
//               </div>
//               <div className="speaker-info">
//                 <h3>{speaker.name}</h3>
//                 <p>{speaker.affiliation}</p>
//               </div>
//             </a>
//           ))}
//         </div>
//         <button className="carousel-button next" onClick={() => scroll(invitedRef, 300)}>&#10095;</button>
//       </div>
//     </div>
//   );
// };

// export default DistinguishedSpeaker;














import React, { useEffect, useRef, useState } from 'react';
import './DistinguishedSpeaker.css';

const plenarySpeakers = [
  {
    name: "Prof. Hiroshi Nogami",
    affiliation: "Tohoku University, Japan",
    url: "https://www.r-info.tohoku.ac.jp/en/3ace24fb652e45919a59410fd85caede.html",
    imagePath: "/assets/speakers/Hiroshi.JPG"
  },
  {
    name: "Prof. Nirupam Chakraborti",
    affiliation: "Czech Technical University in Prague",
    url: "https://scholar.google.co.kr/citations?user=RONBrJ0AAAAJ&hl=en",
    imagePath: "/assets/speakers/Nirupam.JPG"
  },
  {
    name: "Prof. Henrik Saxén",
    affiliation: "Abo Akademi University, Finland",
    url: "https://users.abo.fi/hsaxen/",
    imagePath: "/assets/speakers/Henrik.JPG"
  },
];

const invitedSpeakers = [
  {
    name: "Prof. Shigeru Ueda",
    affiliation: "Tohoku University, Japan",
    url: null,
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Ronald O'Malley",
    affiliation: "Missouri University of Science and Technology, USA",
    url: "https://scholar.google.com/citations?user=S_R3hM0AAAAJ&hl=en",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Dr. Y Gordon",
    affiliation: "Hatch, Canada",
    url: null,
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Dr. Joohyun Park",
    affiliation: "Hanyang University, Korea",
    url: "https://scholar.google.co.kr/citations?user=fgty4vUAAAAJ&hl=en",
    imagePath: "/assets/speakers/Joohyun.jpg"
  },
  {
    name: "Prof. H. Matsuura",
    affiliation: "University of Tokyo, Japan",
    url: "https://www.material.t.u-tokyo.ac.jp/faculty/hiroyuki_matsuura_e.html",
    imagePath: "/assets/speakers/Matsuura.JPG"
  },
  {
    name: "Prof. Alberto Conejo",
    affiliation: "USTB, China",
    url: "https://www.researchgate.net/profile/Alberto-Conejo",
    imagePath: "/assets/speakers/Alberto.png"
  },
  {
    name: "Prof. Geoff Wang",
    affiliation: "University of Queensland, Australia",
    url: "https://about.uq.edu.au/experts/525",
    imagePath: "/assets/speakers/Geoff.png"
  },
  {
    name: "Prof. Jung-Wook Cho",
    affiliation: "POSTECH, Korea",
    url: "https://www.researchgate.net/profile/Jungwook-Cho",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Konstantin V. Grigorovich",
    affiliation: "RAS, Russia",
    url: "https://www.researchgate.net/profile/Konstantin-Grigorovich",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Miroslaw Karbowniczek",
    affiliation: "AGH University, Poland",
    url: "https://www.researchgate.net/profile/Miroslaw-Karbowniczek",
    imagePath: "/assets/speakers/Miroslaw.jpg"
  },
  {
    name: "Prof. Paulo Santos Assis",
    affiliation: "UFOP, Brazil",
    url: "https://www.researchgate.net/profile/Paulo-Assis-2",
    imagePath: "/assets/speakers/Paulo.png"
  },
  {
    name: "Prof. Pasquale D Cavaliere",
    affiliation: "University of Salento, Italy",
    url: "https://www.unisalento.it/scheda-utente/-/people/pasquale.cavaliere",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Kazuki Morita",
    affiliation: "Tokyo, Japan",
    url: "https://www.material.t.u-tokyo.ac.jp/faculty/morita_e.html",
    imagePath: "/assets/speakers/Kazuki.png"
  },
  {
    name: "Prof. G.A Brook",
    affiliation: "Swinburne University, Australia",
    url: "https://geography.uga.edu/directory/people/george-brook",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Olena Volkova",
    affiliation: "Technical University Frieberg, Germany",
    url: "https://www.researchgate.net/profile/Olena-Volkova-2",
    imagePath: "/assets/speakers/Olena.png"
  },
  {
    name: "Prof. S.J. KIM",
    affiliation: "Chosun University, Korea",
    url: "https://www.unlv.edu/people/sj-kim",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. M. Hayashi",
    affiliation: "Institute of Science, Tokyo, Japan",
    url: "https://www.s.u-tokyo.ac.jp/en/people/hayashi_masamitsu/",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Dr. Ricardo Carli",
    affiliation: "Prosimet, Italy",
    url: "https://gift.postech.ac.kr/bbs/board.php?bo_table=eng5_4&wr_id=157",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Jorge Madias",
    affiliation: "Metallion, Argentina",
    url: "https://www.researchgate.net/profile/Jorge-Madias",
    imagePath: "/assets/speakers/dummy.webp"
  },
  {
    name: "Prof. Ko-ichiro OHNO",
    affiliation: "KYUSHU University, Japan",
    url: "https://www.researchgate.net/profile/Ko-Ichiro-Ohno",
    imagePath: "/assets/speakers/ichiro.png"
  },
  {
    name: "Prof. Charlotte Anderson",
    affiliation: "Lulea University of Technology, Sweden",
    url: "https://www.physicaltherapy.utoronto.ca/charlotte-anderson",
    imagePath: "/assets/speakers/Charlotte.webp"
  },
];

const DistinguishedSpeaker = () => {
  const plenaryRef = useRef(null);
  const invitedRef = useRef(null);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);

  const scroll = (ref, amount) => {
    setAutoScrollPaused(true);
    ref.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoScrollPaused) {
        plenaryRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
        invitedRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
      }
    }, 20);
    return () => clearInterval(interval);
  }, [autoScrollPaused]);

  useEffect(() => {
    if (autoScrollPaused) {
      const timeout = setTimeout(() => setAutoScrollPaused(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [autoScrollPaused]);

  const duplicatedPlenary = [...plenarySpeakers, ...plenarySpeakers];
  const duplicatedInvited = [...invitedSpeakers, ...invitedSpeakers];

  return (
    <div className="distinguished-speaker-container">
      <h3 className="section-heading">Plenary Speakers</h3>
      <div className="carousel-wrapper no-scrollbar">
        <div className="carousel-track plenary-static">
          {plenarySpeakers.map((speaker, index) => (
            <a
              key={`plenary-${index}`}
              href={speaker.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="speaker-card"
              style={{ textDecoration: "none" }}
            >
              <div className="speaker-avatar">
                <img
                  src={speaker.imagePath}
                  alt={speaker.name}
                />
              </div>
              <div className="speaker-info">
                <h3>{speaker.name}</h3>
                <p>{speaker.affiliation}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <h3 className="section-heading">Invited Speakers</h3>
      <div className="carousel-wrapper arrow-enabled">
        <button className="carousel-button prev" onClick={() => scroll(invitedRef, -300)}>&#10094;</button>
        <div className="carousel-track scrollable" ref={invitedRef}>
          {duplicatedInvited.map((speaker, index) => (
            <a
              key={`invited-${index}`}
              href={speaker.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="speaker-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="speaker-avatar">
                <img 
                  src={speaker.imagePath} 
                  alt={speaker.name} 
                />
              </div>
              <div className="speaker-info">
                <h3>{speaker.name}</h3>
                <p>{speaker.affiliation}</p>
              </div>
            </a>
          ))}
        </div>
        <button className="carousel-button next" onClick={() => scroll(invitedRef, 300)}>&#10095;</button>
      </div>
    </div>
  );
};

export default DistinguishedSpeaker;