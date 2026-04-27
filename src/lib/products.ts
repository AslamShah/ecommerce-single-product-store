export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  specs: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "apex-01",
    name: "APEX-01 CLIPPER",
    tagline: "9,000 RPM Brushless Motor / Carbon Blade / 300 Min Runtime",
    price: 249,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb4MP4qXAG5kUYy-odkqWejISfrRhPhXRivVOg4THqnUlxePZbQ_36v45WM2Oz0B2TV768YqKUCGa0sbZTPNB_xq9AeuB9BjdtmpqYV-uXErmPldugqOTB7H-k80Uk9beZsrz1V1Kg8pO8cLaaQYYGxJX7RiQG7YpRI0AiHZrL0kt5EzMJFDGbN3S6n_MJ7nh1yZgDD-eibUEnmeSstra5KHIdTPyOb85F8CaTpT6-eXocYYUSLKxp4xBXHDiriBQSGpV7YQxpJcc",
    specs: "9,000 RPM / Carbon Blade",
    badge: "CORE SERIES",
  },
];

export const heroImages = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDeQJh5Yh1lyalEmbwZlayj2p1GhC4h3wTwNe2mFmDlUen3p-iKBSoVbCIUkIxy-VXrG1q4pDPQY0xfPIiuibSYbSd0Qpbtk0joyzeR4g82MxV4z72NnUMP4rSk_u1JPDEDwAcxgYsuRb4mjsn5ZzIRC6af38ns1cP_vNWgDkn_fGFzhzGppB_kSHc9w7XxrvmAOeiv6l48Hzt3ubm1Ay_bJhDGYgUEFxITOJ6W_sykSPaNlO9rwkMj2KyTwlySH70n9MseXaM8OY",
  internal: "https://lh3.googleusercontent.com/aida-public/AB6AXuCehDDb0Xg7-rmoO_hYhPL0Z-0hEbeIjO87RHaEkTieicRHczV_2BcpsXZgYDjQfXKFIcpRgnsrKpNqfUFwKv18ZiKZWHQhUCmvgNLM9bJGQcfUhLsarsLOnKQ3ZDvir4GIbCvcLpyOh71sfjNJCJRcCLs5p4pwOQQdop8EgIp8i0zwpmbYnL6m6pVxycUuNJMWMuZwv2EWqgRKvSvVh578q4aJTDtg5bXPcbckWw-gm1x5XGk5w9pgjAFrSlALUsGZ-xdkwHIdGFE",
  carbonFiber: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU5A2ITq2o_qChQbxG05Gm3r-9GBMBzWkh8TX8k2BVG5o_G0A-J8-KIjQz4fRVkpnxJCwFVEN75Rx4qBhI-_BImmxLE3qXUEKQl1IeNojs1kU0NT1RqXb7fG5q21jfi7UZAgtNg8ISETPglJ4JmY-F8cpT01zm4PdJG01gElgSaFU3oTcsDHSG_qhI7EA1TfmpBmWgRXLwg8NkoIH04CjXLqvvwyAYDthadjdlCn3U75Lno4ZR_52s7RKDMv6BcoXTDwDcf_xk_CA",
  productKit: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhWMZlntM9CkLKPUTmbZU_fPlclbcsm48zOUazhCqIx5bpvsvoKea-kjjMBaZ-Ma8tHMmTupUloKsfoamGLfpFTsNMdZ7JMeIEe50Jb3xrGdgOwmfhD3aNl3N3-y0SRGVb6hWBN5eNz0S17Z0icQr3Si_MLTKnKHNmjkKcq0ajAExjFqLNLAvJ7Dl_wvAky1jh4sdjp1Ls9OmBD7coW3N2pkBBjYfKMck5D2LggnQqVFGSrLySfzO93h__er4zlOe3_QRPAWc27V8",
  productDetail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK9SY8rW7goUDP7Og6JWfr55OgMaeRP32_jFd_KQpTVZns3SVv4llrI1-grz4DHvmvr18t__iw-LoKwUXYyE5VFKrCWrU9pNp6jtF1ivQ6xZFQcMAAq_Ft6y3ia6fQ456mnJM5h_cBsf3pC0pkl1uOdJYwFqwghWqU91PtZ2pd-QxfXlr_U8Jnsbu-R71o938s1a2hpIoAMGFgoKx2UkgjZHlWo1icZwSNF4xnpyTfF2GPdFtPG_xg5d9Fg9ulPkSDNY608TV_v9o",
  usageAction: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsgAMe_OoV4LkKVcXY_2PdUv1XgazhntWWEyy1Jk0cpucX1iZJ8meQK_UDCOXPKJOKA6cyiI0vhIEFS7nTmCbrrPO_sgRcUrvNuTf6eAMwgUPxHDmvxEHQ9wLwQSGsWP5sr11oJBS0puoJ_BZ2BkYSAOr-ZaOx1nFaMjfBLLeDmlHXfAqoZK-Ce-yQKTX2h79UoolIdc4zuVd5JjqbXrsYb0fxtZ00uxqyBUFrKQw2-EpFcSa3Y86N1fYNNjU-jpxXRYQ1lVQj8ag",
  bladeDetail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXUddAmMtKnY6sz53oW6uDoLm0DTcknAvyZkbfT9AGkqEr0m9DY-d1g6fMzziCNpxpHCoE8XtX6zJiEPASGC2P7qSlxVYqr2oUnz2xVXnUWRfrjCHsYTEf55A2lhfs_HNCM0FkAHKng_L5LUZwx-UZvFXAQmBzKREtB4itDEb9MwXC_-cAfmCphTEaaojZag0Vm5gapsn-_qR6HjaqCzJArJlhD1jxJXss6Lw3G9k0yCcQp9Gz8uZ3xYefiOmIDRSjP2a4TO_vLNA",
  chargingBase: "https://lh3.googleusercontent.com/aida-public/AB6AXuAO32Q8VHqa6tunWtDkmshFXqlg3Xa1HRWwXjBii8hpgESUYK-zfh5zE4jBKBEEVndJ9jUCdhv4BSA1yU_6DYQP4z1v9Fv71SR4It693kmeo4pPk0EYsq39J8y83qh1O6MqjnlpRF0OIyApBGDMFUgkAcgk9mBXt6gHwqkaWuurPr3FPl4SsfsMWEHRsxAkPK1pPDEWjkDVO0zdCr6o9vWRWMMa7wozwCTVxdVxGe1vCpWQ9FeLbghrZIhStw6WI0xa8JZNL6sFVi8",
  technicalDiagram: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQdr497k2MaS14xBrqAGbAdqrbgHAba6amu-5JNkNL9YPiFlU3ogYQRK16IIyTsriD8ktykVe2qvk34s980oqIXVwhOdv460AWB1tS3tuCIEPEg4XcKjBhMkyvBGWDWpSgWViCWCRCZ2gTMGElBVa3nii7kfIeIZFxQaeq0Ekf45XyOvq2lEjVmywmXilQAF_RhlyVAYT3F5N29z6bIqr8ambZswoyMZBYImNvii4F1RtMWe8djFT_2ZiDvTBZqKw5OWp2VARGkFU",
};

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const testimonials = [
  {
    quote: "The balance is unlike anything I've used in 15 years. It doesn't fight you; it follows you.",
    author: "MARCUS VANE",
    role: "MASTER BARBER, NYC",
  },
  {
    quote: "Zero-gapping this machine was the smoothest process. The mechanical feedback is surgical.",
    author: "ELARA CHEN",
    role: "CREATIVE DIRECTOR, LON",
  },
  {
    quote: "The runtime is actually as advertised. I can go through a full Saturday shift on one charge.",
    author: "JULIAN ROSS",
    role: "OWNER, THE CUT LAB",
  },
];

export const techSpecs = [
  {
    label: "VECTOR MOTORS",
    description: "Auto-torque technology detects resistance and adjusts RPM in real-time.",
  },
  {
    label: "DIAMOND CARBON",
    description: "Blades stay cooler and sharper 4x longer than standard stainless steel.",
  },
];