import { Article } from '../../types/blog';

export const article6: Article = {
  id: 'article-6',
  slug: '/skincare-products-in-order',
  title: 'The Correct Order to Apply Skincare Products',
  kicker: 'The Layering Masterclass',
  mainKeyword: 'skincare products in order',
  relatedKeywords: ['skincare layering order', 'morning and evening skincare routine'],
  category: 'Skincare Rituals',
  readTime: '7 min read',
  publishedDate: 'October 2026',
  image: '/src/assets/images/skincare_order_1792512584508.jpg',
  imageAlt: 'Organized step-by-step skincare products lined up sequentially with numbered steps from cleanser to daily sunscreen',
  metaTitle: 'The Correct Order to Apply Skincare Products | The Glow Journal',
  metaDescription: 'Master the correct order to apply skincare products in both morning and evening routines. Learn the golden rule of layering from watery toners to sunscreen.',
  excerpt: 'Even the most potent skincare serums fail if applied in the wrong sequence. Unlock the simple viscosity rule that guarantees optimal absorption and zero pilling.',
  intro: [
    'You have researched your skin type, carefully selected quality formulations, and assembled a lovely collection of bottles on your vanity. But when you stand in front of the mirror, a crucial question arises: What goes on first? Does serum precede toner? Does facial oil sit beneath moisturiser or on top? And where on earth does sunscreen fit?',
    'Understanding product layering is not an exercise in fussy ritualism; it is governed by straightforward physics and cosmetic chemistry. The human skin barrier is designed to keep external substances out. If you apply a dense, heavy oil or thick wax cream first, any lightweight watery serum applied on top will simply bounce off or pool on the surface, unable to penetrate.',
    'By organizing your morning and evening routines according to molecular density and product purpose, you maximize the efficacy of every drop while preventing dreaded product pilling.'
  ],
  sections: [
    {
      id: 'golden-rule-of-layering',
      title: 'The Golden Rule: Thinnest to Thickest Consistency',
      paragraphs: [
        'When in doubt, always follow this universal rule of cosmetic layering: apply products in order of ascending viscosity—from thinnest liquid consistency to thickest rich cream.',
        'Water-based products with small molecular structures (such as liquid essences and light hydration serums) penetrate quickly into the upper epidermis. Oil-based formulas, emollients, and occlusives have larger molecular structures designed to form a breathable physical seal over the skin. Layering light water-based formulas first ensures they penetrate fully before the occlusive seal is laid down.'
      ],
      bullets: [
        'Step 1: Watery liquids (cleansers, essences, hydrating toners).',
        'Step 2: Viscous liquids and gel serums (hyaluronic acid, niacinamide, Vitamin C).',
        'Step 3: Emulsion lotions and barrier creams (moisturisers).',
        'Step 4: Lipids and seals (facial oils at night, sunscreen in the morning).'
      ]
    },
    {
      id: 'general-rule-question',
      title: 'What is the general rule for the correct order to apply skincare products?',
      isQuestion: true,
      directAnswer: 'The fundamental rule is to layer formulas from thinnest (watery essences and lightweight serums) to thickest (creams and oils), always finishing with broad-spectrum sunscreen in the morning.',
      paragraphs: [
        'Applying thick occlusives before light serums acts like putting on a heavy winter coat and then attempting to slip a silk blouse underneath. The heavy coat blocks the silk from reaching your body. In the same way, petrolatum, silicones, and plant butters create an impermeable moisture barrier that blocks lighter hydrophilic actives.'
      ]
    },
    {
      id: 'morning-routine-order-detail',
      title: 'The Complete Morning Sequence: Defend and Protect',
      paragraphs: [
        'Here is the step-by-step order to prepare your skin for the day ahead:'
      ],
      subsections: [
        {
          id: 'am-cleanser',
          title: '1. Gentle Cleanser (or Water Rinse)',
          paragraphs: [
            'Rinse away overnight perspiration and natural oils with lukewarm water or a gentle non-foaming cleanser.'
          ]
        },
        {
          id: 'am-toner',
          title: '2. Hydrating Toner or Essence (Optional)',
          paragraphs: [
            'If you experience dehydration, patting two or three drops of an alcohol-free hydrating toner immediately preps damp skin for deeper serum absorption.'
          ]
        },
        {
          id: 'am-serum',
          title: '3. Antioxidant or Hydrating Serum',
          paragraphs: [
            'Apply your active morning serums—such as Vitamin C for free-radical neutralization, or niacinamide and hyaluronic acid for balanced moisture.'
          ]
        },
        {
          id: 'am-moisturiser',
          title: '4. Lightweight Moisturiser',
          paragraphs: [
            'Lock in hydration with an oil-free lotion or gel-cream. If your morning sunscreen is richly hydrating and your skin is oily, you can often skip this step entirely.'
          ]
        },
        {
          id: 'am-sunscreen',
          title: '5. Broad-Spectrum Sunscreen (The Final Layer)',
          paragraphs: [
            'Sunscreen must always be the final step of morning skincare, applied over moisturiser and allowed to set for 3 to 5 minutes before applying any makeup.'
          ]
        }
      ]
    },
    {
      id: 'sunscreen-before-after-question',
      title: 'Does sunscreen always go before or after moisturiser in the morning?',
      isQuestion: true,
      directAnswer: 'Sunscreen must always be applied AFTER moisturiser as the final step in your morning skincare routine, because moisturisers applied on top will dilute or disturb the protective UV film.',
      paragraphs: [
        'Sunscreen operates by forming a uniform, microscopic film across your skin. If you apply moisturiser over top of your sunscreen, the friction of rubbing and the oils in the cream will break apart that uniform UV shield, creating gaps where ultraviolet radiation can burn and damage skin cells.',
        'Always let your moisturiser absorb for two minutes, apply your sunscreen generously, and give it three minutes to dry and form its protective matrix before applying foundation or powders.'
      ]
    },
    {
      id: 'evening-routine-order-detail',
      title: 'The Complete Evening Sequence: Cleanse, Treat, and Restore',
      paragraphs: [
        'At night, your skin enters high cellular turnover mode, making it the ideal time for repairing actives and rich emollients:'
      ],
      subsections: [
        {
          id: 'pm-cleanse',
          title: '1. Cleanser (or Double Cleanse)',
          paragraphs: [
            'If wearing waterproof sunscreen or makeup, start with an oil-based balm or micellar water, followed by a gentle water-based cleanser to thoroughly purify pores.'
          ]
        },
        {
          id: 'pm-actives',
          title: '2. Exfoliating Acids or Retinoids (On Alternate Nights)',
          paragraphs: [
            'Apply targeted treatment actives—such as salicylic acid, glycolic acid, or retinol—to dry skin. Never mix multiple strong actives in the same evening.'
          ]
        },
        {
          id: 'pm-moisturiser',
          title: '3. Restorative Barrier Cream & Facial Oil',
          paragraphs: [
            'Finish with a nourishing ceramide cream. If your skin is intensely dry, pat two drops of squalane or rosehip oil on top as the ultimate occlusive seal.'
          ]
        }
      ],
      internalLinks: [
        {
          anchorText: 'how to choose the right sunscreen for your skin',
          url: '/how-to-choose-sunscreen',
          contextBefore: 'To discover why modern sunscreen textures fit so effortlessly over your morning serums, read our guide on ',
          contextAfter: ' for lightweight and non-greasy options.'
        },
        {
          anchorText: 'how to choose a moisturiser for your skin type',
          url: '/moisturiser-for-your-skin-type',
          contextBefore: 'Pairing the right cream with your serums is essential; explore ',
          contextAfter: ' to find the ideal texture for your skin’s hydration needs.'
        }
      ]
    },
    {
      id: 'preventing-pilling',
      title: 'How to Prevent Skincare Pilling and Separation',
      paragraphs: [
        'Have you ever smoothed on a moisturiser or foundation only to feel tiny little rubbery balls rolling across your cheeks? That annoying phenomenon is known as "pilling." Pilling occurs when incompatible formulation bases collide—most commonly when a silicone-heavy primer is layered over a water-dense gel without adequate absorption time.',
        'To prevent pilling, wait 60 to 90 seconds between steps, avoid excessively rubbing or buffing products into the skin, and use gentle pressing motions with clean palms.'
      ]
    }
  ],
  conclusion: {
    title: 'Simplicity and Flow',
    paragraphs: [
      'Mastering the order of your skincare products transforms your daily vanity routine from a guessing game into a satisfying, sensory ritual.',
      'Remember that you do not need all six or seven possible steps every day. A clean face, a focused active, a comforting moisturiser, and morning sun protection in the right order will always outperform an haphazardly layered ten-step routine.'
    ]
  },
  relatedSlugs: [
    '/skincare-routine-for-beginners',
    '/how-to-choose-sunscreen',
    '/common-skincare-mistakes'
  ]
};
