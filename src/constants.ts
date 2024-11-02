export const specialties = [
  'Bipolar',
  'LGBTQ',
  'Medication/Prescribing',
  'Suicide History/Attempts',
  'General Mental Health (anxiety, depression, stress, grief, life transitions)',
  "Men's issues",
  'Relationship Issues (family, friends, couple, etc)',
  'Trauma & PTSD',
  'Personality disorders',
  'Personal growth',
  'Substance use/abuse',
  'Pediatrics',
  "Women's issues (post-partum, infertility, family planning)",
  'Chronic pain',
  'Weight loss & nutrition',
  'Eating disorders',
  'Diabetic Diet and nutrition',
  'Coaching (leadership, career, academic and wellness)',
  'Life coaching',
  'Obsessive-compulsive disorders',
  'Neuropsychological evaluations & testing (ADHD testing)',
  'Attention and Hyperactivity (ADHD)',
  'Sleep issues',
  'Schizophrenia and psychotic disorders',
  'Learning disorders',
  'Domestic abuse',
];

const colors = [
  'green',
  'blue',
  'red',
  'purple',
  'orange',
  'yellow',
  'pink',
  'brown',
  'gray',
  'geekblue',
  'volcano',
  'lime',
  'cyan',
  'magenta',
];

export const SPECIALTY_TO_COLOR = specialties.map((specialty, index) => ({
  specialty,
  color: colors[index % colors.length],
}));

export const DEFAULT_PAGE_SIZE = 10;
