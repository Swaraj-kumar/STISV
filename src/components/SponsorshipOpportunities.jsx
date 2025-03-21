// SponsorshipOpportunities.jsx
import React from 'react';
import './SponsorshipOpportunities.css';

const sponsorships = [
  {
    title: 'Platinum',
    amount: '7 Lakhs',
    benefits: [
      'Name would appear in all official correspondence',
      'Complimentary registration for 4 delegates',
      'One page advertisement in souvenir & a stall in exhibition'
    ]
  },
  {
    title: 'Gold',
    amount: '5 Lakhs',
    benefits: [
      'Name would appear in all official correspondence',
      'Complimentary registration for 3 delegates',
      'One page advertisement in souvenir'
    ]
  },
  {
    title: 'Silver',
    amount: '3 Lakhs',
    benefits: [
      'Name would appear in all official correspondence',
      'Complimentary registration for 2 delegates',
      'Half page advertisement in souvenir'
    ]
  },
  {
    title: 'Conf. Banquet',
    amount: '7 Lakhs',
    benefits: [
      'Announcement & banner display at the banquet',
      'Complimentary registration for 4 delegates',
      'One page advertisement in souvenir & a stall in exhibition'
    ]
  },
  {
    title: 'Dinner',
    amount: '4.5 Lakhs',
    benefits: [
      'Announcement & banner display at the banquet',
      'Complimentary registration for 3 delegates',
      'One page advertisement in souvenir'
    ]
  },
  {
    title: 'Lunches (Total 3)',
    amount: 'Each would cost Rs. 2.5 Lakh',
    benefits: [
      'Announcement & banner display at the banquet',
      'Complimentary registration for 1 delegate',
      'Half page advertisement in souvenir'
    ]
  }
];

const stallTariffs = [
  { size: '12 m²', tariff: 'Rs. 200,000/-' },
  { size: '9 m²', tariff: 'Rs. 150,000/-' },
  { size: '6 m²', tariff: 'Rs. 100,000/-' },
];

const SponsorshipOpportunities = () => {
  return (
    <div className="sponsorship-container">
      <h1 className="sponsorship-heading"><br></br><br></br>Sponsorship Opportunities</h1>
      <div className="sponsorship-list">
        {sponsorships.map((sponsor, index) => (
          <div className="sponsorship-card" key={index}>
            <h2>{sponsor.title} <span className="amount">({sponsor.amount})</span></h2>
            <ul>
              {sponsor.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="stall-heading">Stall Tariff</h2>
      <p className="stall-description">Exhibition stall tariff details are given below:</p>
      <table className="stall-table">
        <thead>
          <tr>
            <th>Stall Size</th>
            <th>Tariff</th>
          </tr>
        </thead>
        <tbody>
          {stallTariffs.map((stall, index) => (
            <tr key={index}>
              <td>{stall.size}</td>
              <td>{stall.tariff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="stall-note"><strong>Every stall shall be provided with one plug point, two chairs, one table, and two spotlights.</strong></p>
    </div>
  );
};

export default SponsorshipOpportunities;
