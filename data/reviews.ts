// ============================================
// REVIEWS DATA
// ✏️ EASY TO EDIT: Add customer reviews here
// ============================================

export interface Review {
  id: string
  name: string
  city: string
  state: string
  rating: number
  review: string
  deity: string
  paintingImage?: string
  date: string
  verified: boolean
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Priya Krishnamurthy',
    city: 'Bangalore',
    state: 'Karnataka',
    rating: 5,
    review:
      'I ordered a Radha Krishna painting for our new home and I am absolutely speechless at the quality. Every brushstroke radiates such devotion. The colors are vibrant, the detailing is incredible, and it arrived perfectly packed. My pooja room feels truly divine now. Kala Kriti is a true blessing.',
    deity: 'Radha Krishna',
    paintingImage: '/images/paintings/radha-krishna.webp',
    date: 'November 2024',
    verified: true,
  },
  {
    id: 'r2',
    name: 'Rajesh Sharma',
    city: 'Jaipur',
    state: 'Rajasthan',
    rating: 5,
    review:
      'The Ram Darbar painting I commissioned is beyond words. The artist captured the exact divine expression I had in mind. The gold leaf detailing on the ornaments is exceptional craftsmanship. My entire family gathered to see it when it arrived. Worth every rupee spent. Will order again.',
    deity: 'Ram Darbar',
    paintingImage: '/images/paintings/rama-seetha-lakshman-hanuman.webp',
    date: 'October 2024',
    verified: true,
  },
  {
    id: 'r3',
    name: 'Anitha Venkatesh',
    city: 'Chennai',
    state: 'Tamil Nadu',
    rating: 5,
    review:
      'Maa Durga painting arrived on the eve of Navratri — it felt like a miracle. The fierceness and compassion in her eyes is painted so authentically. I have never seen such devotion poured into artwork. The artist communicated throughout the process, sharing progress updates. A completely trustworthy and gifted team.',
    deity: 'Goddess Durga',
    paintingImage: '/images/paintings/meenakshi.webp',
    date: 'October 2024',
    verified: true,
  },
  {
    id: 'r4',
    name: 'Suresh Patel',
    city: 'Ahmedabad',
    state: 'Gujarat',
    rating: 5,
    review:
      'Ordered a large 24×36 Ganesha painting for my office. The sheer presence it creates in the space is incredible — even my clients comment on it. Shipped safely all the way to Gujarat, arrived without any damage. The framing quality is premium and adds so much elegance. Highly recommended!',
    deity: 'Lord Ganesha',
    paintingImage: '/images/paintings/ganesha.webp',
    date: 'September 2024',
    verified: true,
  },
  {
    id: 'r5',
    name: 'Meera Reddy',
    city: 'Hyderabad',
    state: 'Telangana',
    rating: 5,
    review:
      'I specifically requested Lord Krishna in a custom moonlit Vrindavan scene — something very close to my heart. The artist understood my vision perfectly and delivered something even more beautiful than I imagined. The brushwork is so refined, the expression on Krishna\'s face is deeply emotional. A true heirloom piece.',
    deity: 'Lord Krishna',
    paintingImage: '/images/paintings/krishna.webp',
    date: 'August 2024',
    verified: true,
  },
  {
    id: 'r6',
    name: 'Vikram Nair',
    city: 'Kochi',
    state: 'Kerala',
    rating: 5,
    review:
      'The Lakshmi painting is absolutely magnificent. I gifted it to my parents for their housewarming and they were moved to tears. The way the lotuses and gold coins are painted, the gentle expression on her face — it radiates pure shakti. The packaging was so careful, arrived in perfect condition from Bangalore to Kerala.',
    deity: 'Goddess Lakshmi',
    paintingImage: '/images/paintings/lakshmi.webp',
    date: 'July 2024',
    verified: true,
  },
  {
    id: 'r7',
    name: 'Lakshmi Iyer',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    rating: 5,
    review:
      'Words are insufficient to describe how beautiful the Saraswati painting is. I keep it in my music room and every time I sit to practice, it fills me with inspiration. The white lotus, the veena, the expression of pure wisdom — it\'s a masterpiece. The artist also incorporated a specific color theme I requested.',
    deity: 'Goddess Saraswati',
    paintingImage: '/images/paintings/saraswati.webp',
    date: 'June 2024',
    verified: true,
  },
  {
    id: 'r8',
    name: 'Deepak Gupta',
    city: 'Pune',
    state: 'Maharashtra',
    rating: 5,
    review:
      'I was skeptical about ordering such a personal item online, but Kala Kriti exceeded all expectations. The WhatsApp communication was prompt and professional. They shared work-in-progress photos, and I could see the painting evolving. The final Shiva painting is breathtaking — exactly the meditative, serene energy I wanted.',
    deity: 'Lord Shiva',
    paintingImage: '/images/paintings/shiva.webp',
    date: 'May 2024',
    verified: true,
  },
  {
    id: 'r9',
    name: 'Nandini Srinivas',
    city: 'Mysore',
    state: 'Karnataka',
    rating: 5,
    review:
      'The Sai Baba painting I received is one of the most precious possessions in our home. The compassion in his eyes is so authentic — it looks like he is truly looking at you with love. My elderly mother sits before it every morning and says she feels his presence. This is art that becomes devotion.',
    deity: 'Sai Baba',
    paintingImage: '/images/paintings/sai-baba.webp',
    date: 'April 2024',
    verified: true,
  },
]
