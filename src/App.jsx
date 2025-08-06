import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// UTILITIES
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ICONS
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const StarIcon = ({ className, isFilled = true }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill={isFilled ? "currentColor" : "none"}
    viewBox="0 0 20 20"
    stroke="currentColor"
    strokeWidth={isFilled ? 0 : 1.5}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);
const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const CheckCircleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ChevronDownIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);
const HeartIcon = ({ className, isFilled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill={isFilled ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const LeafIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ShieldIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);
const HomeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const BoxIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
    />
  </svg>
);
const TagIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6h.008v.008H6V6Z"
    />
  </svg>
);
const PhoneIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  </svg>
);
const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);
const MapPinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);
const LogoutIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
    />
  </svg>
);
const DashboardIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"
    />
  </svg>
);
const GiftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25v-8.25M12 15v-1.5M12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m0-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m0-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m7.5-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m0-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m-15-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m0-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v-1.5" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m0-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m7.5-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m0-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m-15-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5m0-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 0v-1.5m0 1.5v1.5m0 0v1.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 11.25v8.25a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25v-8.25"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v-1.5" />
  </svg>
);
const PencilSquareIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);
const WhatsAppIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.133-.38-.232" />
  </svg>
);

// --- DATA PRODUK ---
const allProducts = [
  {
    id: 1,
    name: "Risol Mayo Premium",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviews: 132,
    image: "https://placehold.co/600x600/efecea/634832?text=Risol+Mayo",
    isPromo: true,
    description:
      "Risol dengan isian mayonnaise premium, smoked beef, dan telur. Renyah di luar, lumer di dalam. Cocok untuk camilan kapan saja.",
    servingSuggestion:
      "Goreng dalam minyak panas hingga keemasan. Sajikan hangat dengan saus sambal.",
  },
  {
    id: 2,
    name: "Nugget Ayam Homemade",
    price: 35000,
    rating: 4.9,
    reviews: 210,
    image: "https://placehold.co/600x600/efecea/634832?text=Nugget+Ayam",
    isPromo: false,
    description:
      "Nugget ayam dibuat dari daging ayam pilihan tanpa MSG dan bahan pengawet. Aman untuk anak-anak.",
    servingSuggestion:
      "Goreng hingga matang atau masak menggunakan air fryer untuk pilihan lebih sehat.",
  },
  {
    id: 3,
    name: "Kebab Daging Sapi Spesial",
    price: 45000,
    rating: 4.7,
    reviews: 98,
    image: "https://placehold.co/600x600/efecea/634832?text=Kebab+Sapi",
    isPromo: false,
    description:
      "Kebab lezat dengan isian daging sapi panggang, sayuran segar, dan saus spesial Dapur Merifa.",
    servingSuggestion:
      "Panaskan di atas teflon dengan sedikit margarin hingga kulit kebab renyah.",
  },
  {
    id: 4,
    name: "Dimsum Ayam Udang",
    price: 40000,
    originalPrice: 48000,
    rating: 4.8,
    reviews: 150,
    image: "https://placehold.co/600x600/efecea/634832?text=Dimsum",
    isPromo: true,
    description:
      "Dimsum lembut dengan isian ayam dan udang cincang yang melimpah. Disajikan dengan saus asam manis.",
    servingSuggestion:
      "Kukus selama 10-15 menit hingga matang. Sajikan dengan saus cocolan.",
  },
  {
    id: 5,
    name: "Samosa Daging Kentang",
    price: 22000,
    rating: 4.6,
    reviews: 88,
    image: "https://placehold.co/600x600/efecea/634832?text=Samosa",
    isPromo: false,
    description:
      "Camilan khas India dengan isian daging cincang dan kentang berbumbu kari yang kaya rasa.",
    servingSuggestion:
      "Goreng dalam minyak panas hingga kecoklatan dan renyah.",
  },
  {
    id: 6,
    name: "Pastel Isi Sayur & Ayam",
    price: 20000,
    rating: 4.7,
    reviews: 112,
    image: "https://placehold.co/600x600/efecea/634832?text=Pastel",
    isPromo: false,
    description:
      "Pastel renyah dengan isian wortel, kentang, bihun, dan suwiran ayam yang gurih.",
    servingSuggestion:
      "Goreng hingga matang. Nikmat disantap dengan cabai rawit.",
  },
  {
    id: 7,
    name: "Kroket Kentang Keju",
    price: 28000,
    rating: 4.8,
    reviews: 95,
    image: "https://placehold.co/600x600/efecea/634832?text=Kroket",
    isPromo: false,
    description:
      "Kroket lembut dari kentang tumbuk dengan isian keju mozarella yang meleleh.",
    servingSuggestion:
      "Goreng hingga keemasan. Hati-hati saat panas karena keju di dalamnya lumer.",
  },
  {
    id: 8,
    name: "Cireng Bumbu Rujak",
    price: 18000,
    originalPrice: 22000,
    rating: 4.9,
    reviews: 350,
    image: "https://placehold.co/600x600/efecea/634832?text=Cireng",
    isPromo: true,
    description:
      "Cireng kenyal dan renyah disajikan dengan bumbu rujak pedas manis yang bikin nagih.",
    servingSuggestion:
      "Goreng cireng hingga mengembang. Sajikan dengan bumbu rujak yang telah disediakan.",
  },
  {
    id: 9,
    name: "Bakso Sapi Urat",
    price: 42000,
    rating: 4.9,
    reviews: 250,
    image: "https://placehold.co/600x600/efecea/634832?text=Bakso+Sapi",
    isPromo: false,
    description:
      "Bakso sapi dengan urat pilihan, kenyal dan kaya rasa. Lengkap dengan bumbu kuah instan.",
    servingSuggestion:
      "Rebus bakso hingga mengapung, sajikan dengan kuah panas, mie, dan sayuran.",
  },
  {
    id: 10,
    name: "Otak-Otak Ikan Tenggiri",
    price: 30000,
    rating: 4.7,
    reviews: 115,
    image: "https://placehold.co/600x600/efecea/634832?text=Otak-Otak",
    isPromo: false,
    description:
      "Dibuat dari ikan tenggiri segar, dibungkus daun pisang dan dipanggang. Aroma khas yang menggugah selera.",
    servingSuggestion:
      "Bakar di atas teflon atau panggang hingga harum. Cocol dengan saus kacang pedas.",
  },
  {
    id: 11,
    name: "Siomay Ikan & Ayam",
    price: 38000,
    originalPrice: 45000,
    rating: 4.8,
    reviews: 180,
    image: "https://placehold.co/600x600/efecea/634832?text=Siomay",
    isPromo: true,
    description:
      "Paket siomay lengkap dengan isian ikan dan ayam, tahu, kentang, dan telur. Disajikan dengan bumbu kacang kental.",
    servingSuggestion:
      "Kukus semua bahan selama 15 menit. Siram dengan bumbu kacang dan tambahkan perasan jeruk limau.",
  },
  {
    id: 12,
    name: "Pempek Kapal Selam",
    price: 35000,
    rating: 4.9,
    reviews: 220,
    image: "https://placehold.co/600x600/efecea/634832?text=Pempek",
    isPromo: false,
    description:
      "Pempek kapal selam asli Palembang dengan isian telur utuh. Disajikan dengan kuah cuko pedas, manis, dan asam.",
    servingSuggestion:
      "Goreng pempek dalam minyak panas hingga garing. Potong-potong dan siram dengan kuah cuko.",
  },
  {
    id: 13,
    name: "Tahu Bakso Tuna",
    price: 28000,
    rating: 4.6,
    reviews: 90,
    image: "https://placehold.co/600x600/efecea/634832?text=Tahu+Bakso",
    isPromo: false,
    description:
      "Tahu pong diisi dengan adonan bakso ikan tuna yang gurih. Cocok untuk digoreng atau dikukus.",
    servingSuggestion:
      "Bisa digoreng garing atau dikukus dan disajikan dengan kuah kaldu.",
  },
  {
    id: 14,
    name: "Chicken Wings BBQ",
    price: 55000,
    rating: 4.8,
    reviews: 155,
    image: "https://placehold.co/600x600/efecea/634832?text=Chicken+Wings",
    isPromo: false,
    description:
      "Sayap ayam yang telah dimarinasi dengan bumbu BBQ spesial. Siap panggang atau digoreng.",
    servingSuggestion:
      "Panggang di oven atau air fryer selama 20 menit pada suhu 180°C.",
  },
  {
    id: 15,
    name: "Donat Kentang Beku",
    price: 25000,
    originalPrice: 30000,
    rating: 4.9,
    reviews: 310,
    image: "https://placehold.co/600x600/efecea/634832?text=Donat",
    isPromo: true,
    description:
      "Donat kentang empuk dan lembut, siap digoreng kapan saja. Dilengkapi dengan gula halus.",
    servingSuggestion:
      "Goreng hingga keemasan, tiriskan, lalu taburi dengan gula halus.",
  },
  {
    id: 16,
    name: "Martabak Daging Mini",
    price: 32000,
    rating: 4.7,
    reviews: 102,
    image: "https://placehold.co/600x600/efecea/634832?text=Martabak",
    isPromo: false,
    description:
      "Martabak mini dengan isian daging sapi cincang dan daun bawang. Kulit renyah dan isian tebal.",
    servingSuggestion:
      "Goreng dengan sedikit minyak di atas teflon hingga kedua sisi kecoklatan.",
  },
  {
    id: 17,
    name: "Sosis Sapi Bratwurst",
    price: 60000,
    rating: 4.8,
    reviews: 130,
    image: "https://placehold.co/600x600/efecea/634832?text=Sosis",
    isPromo: false,
    description:
      "Sosis sapi ala Jerman dengan ukuran besar dan rasa daging yang kuat. Cocok untuk dibakar.",
    servingSuggestion:
      "Bakar atau panggang, sajikan dengan roti hotdog dan mustard.",
  },
  {
    id: 18,
    name: "Pisang Cokelat Lumer",
    price: 24000,
    rating: 4.9,
    reviews: 280,
    image: "https://placehold.co/600x600/efecea/634832?text=Piscok",
    isPromo: false,
    description:
      "Lumpia renyah berisi pisang manis dan cokelat premium yang meleleh saat digoreng.",
    servingSuggestion:
      "Goreng dalam minyak panas hingga kulitnya garing dan renyah.",
  },
  {
    id: 19,
    name: "Rolade Daging Ayam",
    price: 33000,
    rating: 4.6,
    reviews: 75,
    image: "https://placehold.co/600x600/efecea/634832?text=Rolade",
    isPromo: false,
    description:
      "Gulungan daging ayam giling dengan sayuran. Bisa digoreng atau dijadikan campuran sup.",
    servingSuggestion:
      "Potong-potong lalu goreng, atau masukkan langsung ke dalam kuah sup.",
  },
  {
    id: 20,
    name: "Kentang Goreng Shoestring",
    price: 28000,
    rating: 4.7,
    reviews: 190,
    image: "https://placehold.co/600x600/efecea/634832?text=Kentang",
    isPromo: false,
    description:
      "Kentang goreng potongan tipis (shoestring) yang renyah. Siap digoreng kapan saja.",
    servingSuggestion:
      "Goreng dalam minyak panas atau gunakan air fryer untuk hasil yang lebih sehat.",
  },
];

// --- CONFETTI PARTICLE COMPONENT ---
const ConfettiParticle = () => {
  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 5 + 3; // size between 3px and 8px

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top: "50%",
        left: "50%",
      }}
      initial={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
      animate={{
        x: `calc(-50% + ${(Math.random() - 0.5) * 70}px)`,
        y: `calc(-50% + ${(Math.random() - 0.5) * 70}px)`,
        scale: 0,
        opacity: 0,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
};

// --- EXPANDABLE TABS COMPONENT ---
const ExpandableTabs = ({ tabs, className }) => {
  const [selected, setSelected] = useState(null);
  const outsideClickRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target)
      ) {
        setSelected(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outsideClickRef]);

  const buttonVariants = {
    initial: { gap: 0, paddingLeft: ".5rem", paddingRight: ".5rem" },
    animate: (isSelected) => ({
      gap: isSelected ? ".5rem" : 0,
      paddingLeft: isSelected ? "1rem" : ".5rem",
      paddingRight: isSelected ? "1rem" : ".5rem",
    }),
  };

  const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
  };

  const transition = { type: "spring", bounce: 0, duration: 0.6 };

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 rounded-2xl border bg-white/80 backdrop-blur-lg p-1 shadow-lg",
        className
      )}
      style={{ borderColor: "rgba(99, 72, 50, 0.2)" }}
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isSelected = selected === index;
        return (
          <motion.a
            key={tab.title}
            href={tab.href}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isSelected}
            onFocus={() => setSelected(index)}
            onMouseEnter={() => setSelected(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              isSelected ? "text-white" : "text-gray-500 hover:text-[#634832]"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="expandable-tab-highlight"
                className="absolute inset-0 rounded-xl"
                style={{ backgroundColor: "#634832" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <Icon
              className={cn(
                "w-5 h-5 relative z-10",
                isSelected ? "text-white" : ""
              )}
            />
            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap relative z-10"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        );
      })}
    </div>
  );
};

// --- HEADER COMPONENT ---
function DapurMerifaHeader({
  visible,
  onLogoClick,
  onCartClick,
  onAuthAction,
  isLoggedIn,
  cartItemCount,
  party,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navLinks = [
    { name: "Produk", href: "#produk" },
    { name: "Promo", href: "#promo" },
    { name: "Tentang Kami", href: "#tentang" },
    { name: "Kontak", href: "#kontak" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed top-4 inset-x-0 max-w-3xl mx-auto z-[5000]",
              "flex items-center justify-between",
              "rounded-full border shadow-sm px-3 sm:px-6 py-2"
            )}
            style={{
              borderColor: "rgba(99, 72, 50, 0.2)",
              backgroundColor: "rgba(239, 236, 234, 0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            <button
              onClick={onLogoClick}
              className="text-lg sm:text-xl font-bold"
              style={{ color: "#634832" }}
            >
              Dapur Merifa
            </button>
            <div
              className="hidden md:flex items-center space-x-2"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={onLogoClick}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                  style={{
                    color: hoveredLink === link.name ? "#FFFFFF" : "#8a7967",
                  }}
                  onMouseEnter={() => setHoveredLink(link.name)}
                >
                  {hoveredLink === link.name && (
                    <motion.span
                      layoutId="highlight"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#634832" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={onAuthAction}
                className="hidden md:block px-4 py-2 rounded-full font-semibold text-white text-sm transition-transform hover:scale-105"
                style={{ backgroundColor: "#634832" }}
              >
                {isLoggedIn ? "Akun Saya" : "Masuk/Daftar"}
              </button>
              <button
                onClick={onCartClick}
                className="relative text-[#634832] p-2 rounded-full transition-colors duration-200 hover:bg-[#634832] hover:text-white group"
              >
                <AnimatePresence>
                  {party &&
                    [...Array(15)].map((_, i) => <ConfettiParticle key={i} />)}
                </AnimatePresence>
                <CartIcon />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white group-hover:bg-white group-hover:text-[#634832] transition-colors">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  aria-label="Toggle Menu"
                  className="text-[#634832]"
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[6000] md:hidden backdrop-blur-sm"
              onClick={toggleMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-2/3 max-w-xs z-[6001] md:hidden p-6 bg-[#efecea]"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  aria-label="Close Menu"
                  className="text-[#634832]"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="flex flex-col items-center text-center space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xl font-medium"
                    style={{ color: "#8a7967" }}
                    onClick={() => {
                      toggleMenu();
                      onLogoClick();
                    }}
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={() => {
                    toggleMenu();
                    onAuthAction();
                  }}
                  className="w-full mt-6 px-8 py-3 rounded-full font-semibold text-white text-center"
                  style={{ backgroundColor: "#634832" }}
                >
                  {isLoggedIn ? "Akun Saya" : "Masuk/Daftar"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// --- HERO SECTION COMPONENT ---
function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606787366850-de6330128214?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl font-medium tracking-wider uppercase"
          style={{ color: "#efecea" }}
        >
          Home Made Premium Frozen Food
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold mt-2"
        >
          Kelezatan Praktis, Kapan Saja.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-4 mb-8 max-w-2xl mx-auto text-base md:text-lg text-gray-200"
        >
          Nikmati kemudahan menyiapkan hidangan istimewa di rumah dengan produk
          pilihan kami yang dibuat dari bahan segar dan resep keluarga.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <a
            href="#produk"
            className="inline-block px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-white text-base md:text-lg transition-transform duration-300 ease-in-out hover:scale-105"
            style={{ backgroundColor: "#634832" }}
          >
            Belanja Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// --- PRODUCT CARD COMPONENT ---
function ProductCard({
  product,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  isFavorite,
}) {
  const { image, name, price, originalPrice, rating, reviews, isPromo } =
    product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:-translate-y-2 border border-gray-200/80 flex flex-col text-center md:text-left">
      <div onClick={() => onProductClick(product)} className="cursor-pointer">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-48 object-cover" />
          {isPromo && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-md">
              PROMO
            </div>
          )}
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 left-2 p-2 rounded-full bg-white/70 backdrop-blur-sm text-red-500 hover:bg-white transition-transform duration-200 hover:scale-110"
          >
            <HeartIcon className="w-5 h-5" isFilled={isFavorite} />
          </button>
        </div>
        <div className="p-4 pb-0">
          <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">
            {name}
          </h3>
          <div className="flex items-center justify-center md:justify-start mb-2">
            <p className="text-lg font-bold" style={{ color: "#634832" }}>
              Rp{price.toLocaleString("id-ID")}
            </p>
            {originalPrice && (
              <p className="text-xs text-gray-500 line-through ml-2">
                Rp{originalPrice.toLocaleString("id-ID")}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center md:justify-start text-xs text-gray-600 mb-4">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="ml-1">{rating}</span>
            <span className="mx-1">|</span>
            <span>{reviews} ulasan</span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={handleAddToCart}
          className="w-full py-2 rounded-lg font-semibold text-white transition-colors duration-300 text-sm"
          style={{ backgroundColor: "#634832" }}
        >
          Tambah
        </button>
      </div>
    </div>
  );
}

// --- PRODUCT SECTION COMPONENT ---
function ProductSection({
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [displayedProducts, setDisplayedProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    let products = [...allProducts];

    // Filtering
    if (searchTerm) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    switch (sortOrder) {
      case "promo":
        products.sort((a, b) => b.isPromo - a.isPromo);
        break;
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // 'latest'
        // No sort needed, keeps original order
        break;
    }

    setDisplayedProducts(products);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [searchTerm, sortOrder]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id="produk" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2">Home &gt; Produk</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Semua Produk Kami
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Temukan berbagai pilihan makanan beku premium yang dibuat dengan
            bahan-bahan berkualitas.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center md:text-left">
                Filter Produk
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pencarian
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Cari produk..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#634832] focus:border-[#634832]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Urutkan
                </label>
                <select
                  id="sort"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#634832] focus:border-[#634832]"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="latest">Terbaru</option>
                  <option value="promo">Promo</option>
                  <option value="price-asc">
                    Harga: Terendah ke Tertinggi
                  </option>
                  <option value="price-desc">
                    Harga: Tertinggi ke Terendah
                  </option>
                  <option value="name-asc">Nama: A-Z</option>
                </select>
              </div>
            </div>
          </aside>
          <main className="w-full md:w-3/4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isFavorite={wishlist.some((item) => item.id === product.id)}
                />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                {Array.from(
                  {
                    length: Math.ceil(
                      displayedProducts.length / productsPerPage
                    ),
                  },
                  (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={cn(
                        "px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                        currentPage === i + 1
                          ? "bg-[#634832] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100 border"
                      )}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </nav>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

// --- PRODUCT DETAIL SECTION COMPONENT ---
function ProductDetailSection({
  product,
  onBackClick,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onBuyNow,
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const isFavorite = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white py-12 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-8 text-center md:text-left">
          <button onClick={onBackClick} className="hover:text-[#634832]">
            Home
          </button>{" "}
          &gt;
          <button onClick={onBackClick} className="hover:text-[#634832]">
            {" "}
            Produk
          </button>{" "}
          &gt;
          <span className="text-gray-800"> {product.name}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="mx-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg object-cover aspect-square"
            />
            <div className="flex gap-4 mt-4">
              <img
                src={product.image}
                alt="thumbnail 1"
                className="w-1/4 rounded-md border-2 border-[#634832] cursor-pointer"
              />
              <img
                src="https://placehold.co/400x400/efecea/634832?text=View+2"
                alt="thumbnail 2"
                className="w-1/4 rounded-md border-2 border-transparent hover:border-[#634832] cursor-pointer"
              />
              <img
                src="https://placehold.co/400x400/efecea/634832?text=View+3"
                alt="thumbnail 3"
                className="w-1/4 rounded-md border-2 border-transparent hover:border-[#634832] cursor-pointer"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-yellow-400" />{" "}
                <span className="ml-1 text-gray-700">
                  {product.rating} ({product.reviews} ulasan)
                </span>
              </div>
              <span className="mx-3 text-gray-300">|</span>
              <span className="text-green-600 font-semibold">
                Stok Tersedia
              </span>
            </div>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mb-6">
              <p
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#634832" }}
              >
                Rp{product.price.toLocaleString("id-ID")}
              </p>
              {product.originalPrice && (
                <p className="text-lg md:text-xl text-gray-400 line-through">
                  Rp{product.originalPrice.toLocaleString("id-ID")}
                </p>
              )}
            </div>
            <p className="text-gray-600 mb-8">{product.description}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 max-w-sm mx-auto md:max-w-none md:mx-0">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 rounded-l-full hover:bg-gray-100"
                >
                  <MinusIcon />
                </button>
                <span className="px-6 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 rounded-r-full hover:bg-gray-100"
                >
                  <PlusIcon />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: "#634832" }}
              >
                Tambah ke Keranjang
              </button>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <button
                onClick={handleBuyNow}
                className="w-full max-w-sm mx-auto md:max-w-none md:mx-0 py-3 rounded-full font-semibold text-[#634832] border border-[#634832] hover:bg-gray-100"
              >
                Beli Sekarang
              </button>
              <button
                onClick={() => onToggleWishlist(product)}
                className={cn(
                  "p-3 rounded-full border transition-colors",
                  isFavorite
                    ? "bg-red-50 text-red-500 border-red-200"
                    : "border-gray-300 text-gray-500 hover:bg-gray-100"
                )}
              >
                <HeartIcon className="w-6 h-6" isFilled={isFavorite} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav
              className="-mb-px flex space-x-8 justify-center md:justify-start"
              aria-label="Tabs"
            >
              <button
                onClick={() => setActiveTab("description")}
                className={cn(
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                  activeTab === "description"
                    ? "border-[#634832] text-[#634832]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Deskripsi
              </button>
              <button
                onClick={() => setActiveTab("serving")}
                className={cn(
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                  activeTab === "serving"
                    ? "border-[#634832] text-[#634832]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Penyajian
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={cn(
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                  activeTab === "reviews"
                    ? "border-[#634832] text-[#634832]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Ulasan
              </button>
            </nav>
          </div>
          <div className="py-6 text-gray-600 text-center md:text-left">
            {activeTab === "description" && <p>{product.description}</p>}
            {activeTab === "serving" && <p>{product.servingSuggestion}</p>}
            {activeTab === "reviews" && (
              <div>
                <p>Ulasan untuk produk ini akan ditampilkan di sini.</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Anda Mungkin Juga Suka
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isFavorite={wishlist.some((item) => item.id === p.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// --- CART SECTION COMPONENT ---
function CartSection({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onBackClick,
  onCheckout,
}) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 15000;
  const total = subtotal + shippingCost;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 py-12 md:py-24"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Keranjang Belanja Anda
        </h1>
        {cart.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">
              Keranjang Anda masih kosong.
            </p>
            <button
              onClick={onBackClick}
              className="px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: "#634832" }}
            >
              {" "}
              Lanjutkan Belanja{" "}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-md">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 border-b py-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Harga: Rp{item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-2 rounded-l-full hover:bg-gray-100"
                    >
                      <MinusIcon />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-2 rounded-r-full hover:bg-gray-100"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  <p
                    className="font-semibold w-32 text-center sm:text-right"
                    style={{ color: "#634832" }}
                  >
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-2"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                <h2 className="text-2xl font-bold mb-4 border-b pb-4">
                  Ringkasan Pesanan
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>Rp{subtotal.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Pengiriman</p>
                    <p>Rp{shippingCost.toLocaleString("id-ID")}</p>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-4 mb-6">
                  <p>Total</p>
                  <p style={{ color: "#634832" }}>
                    Rp{total.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Masukkan Kode Promo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#634832] focus:border-[#634832]"
                  />
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full py-3 mb-3 rounded-full font-semibold text-white"
                  style={{ backgroundColor: "#634832" }}
                >
                  Lanjutkan ke Checkout
                </button>
                <button
                  onClick={onBackClick}
                  className="w-full text-center text-sm text-gray-600 hover:text-[#634832]"
                >
                  Lanjutkan Belanja
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

// --- CHECKOUT SECTION COMPONENT ---
function CheckoutSection({ cart, onBackToCart, onOrderComplete }) {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (step === 4 && !orderId) {
      setOrderId(`DM-${Math.floor(Math.random() * 90000) + 10000}`);
    }
  }, [step, orderId]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 15000;
  const total = subtotal + shippingCost;

  const handleWhatsAppNotification = () => {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp Anda
    const items = cart
      .map((item) => `- ${item.name} (x${item.quantity})`)
      .join("\n");
    const message = `Halo Dapur Merifa, saya baru saja menyelesaikan pesanan.\n\n*Nomor Pesanan:* ${orderId}\n*Item:*\n${items}\n*Total:* Rp ${total.toLocaleString(
      "id-ID"
    )}\n\nMohon segera diproses ya. Terima kasih!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const ProgressIndicator = () => (
    <div className="flex justify-center items-center mb-12">
      {[1, 2, 3].map((s, index) => (
        <React.Fragment key={s}>
          <div className="flex flex-col md:flex-row items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                step >= s
                  ? "bg-[#634832] text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {step > s ? <CheckCircleIcon className="w-6 h-6" /> : s}
            </div>
            <p
              className={cn(
                "ml-0 md:ml-3 mt-2 md:mt-0 font-semibold text-sm",
                step >= s ? "text-gray-800" : "text-gray-500"
              )}
            >
              {s === 1 ? "Pengiriman" : s === 2 ? "Pembayaran" : "Tinjau"}
            </p>
          </div>
          {index < 2 && (
            <div
              className={cn(
                "flex-auto border-t-2 mx-2 md:mx-4",
                step > s ? "border-[#634832]" : "border-gray-200"
              )}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
  const OrderSummary = () => (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
      <h2 className="text-2xl font-bold mb-4 border-b pb-4">
        Ringkasan Pesanan
      </h2>
      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-sm">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-grow">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">
              Rp{(item.price * item.quantity).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2 mb-4 border-t pt-4">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rp{subtotal.toLocaleString("id-ID")}</p>
        </div>
        <div className="flex justify-between">
          <p>Pengiriman</p>
          <p>Rp{shippingCost.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="flex justify-between font-bold text-xl border-t pt-4">
        <p>Total</p>
        <p style={{ color: "#634832" }}>Rp{total.toLocaleString("id-ID")}</p>
      </div>
    </div>
  );
  if (step === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-50 flex items-center justify-center py-24 px-4"
      >
        <div className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <CheckCircleIcon className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Pesanan Diterima!
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Terima kasih telah berbelanja di Dapur Merifa. Kami akan segera
            memproses pesanan Anda.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg py-4 px-6 mb-8">
            <p className="text-sm text-gray-600">Nomor Pesanan Anda</p>
            <p className="text-2xl font-bold text-[#634832] tracking-wider">
              {orderId}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOrderComplete}
              className="px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: "#634832" }}
            >
              {" "}
              Kembali ke Beranda{" "}
            </button>
            <button
              onClick={handleWhatsAppNotification}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105 bg-green-500"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Notifikasi via WhatsApp</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 py-12 md:py-24"
    >
      <div className="container mx-auto px-4">
        <ProgressIndicator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-md">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Informasi Pengiriman
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Alamat Lengkap
                    </label>
                    <textarea
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-8 py-3 rounded-full font-semibold text-white"
                  style={{ backgroundColor: "#634832" }}
                >
                  Lanjutkan ke Pembayaran
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Metode Pembayaran</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-amber-50 has-[:checked]:border-[#634832]">
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4 text-[#634832] focus:ring-[#634832]"
                      defaultChecked
                    />
                    <span className="ml-3 text-gray-700 font-medium">
                      Transfer Bank
                    </span>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-amber-50 has-[:checked]:border-[#634832]">
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4 text-[#634832] focus:ring-[#634832]"
                    />
                    <span className="ml-3 text-gray-700 font-medium">
                      E-Wallet (GoPay, OVO, Dana)
                    </span>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-amber-50 has-[:checked]:border-[#634832]">
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4 text-[#634832] focus:ring-[#634832]"
                    />
                    <span className="ml-3 text-gray-700 font-medium">
                      Kartu Kredit/Debit
                    </span>
                  </label>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full mt-8 py-3 rounded-full font-semibold text-white"
                  style={{ backgroundColor: "#634832" }}
                >
                  Lanjutkan untuk Tinjau
                </button>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Tinjau Pesanan Anda</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Alamat Pengiriman</h3>
                    <p className="text-gray-600">
                      Jl. Merdeka No. 17, Ambarawa, Kab. Semarang, Jawa Tengah,
                      50611
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Metode Pembayaran</h3>
                    <p className="text-gray-600">Transfer Bank</p>
                  </div>
                </div>
                <div className="mt-6 flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#634832] focus:ring-[#634832] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Saya setuju dengan Syarat & Ketentuan yang berlaku.
                  </label>
                </div>
                <button
                  onClick={() => setStep(4)}
                  className="w-full mt-8 py-3 rounded-full font-semibold text-white"
                  style={{ backgroundColor: "#634832" }}
                >
                  Bayar Sekarang
                </button>
              </div>
            )}
            <button
              onClick={() =>
                step > 1 ? setStep((s) => s - 1) : onBackToCart()
              }
              className="w-full text-center text-sm text-gray-600 hover:text-[#634832] mt-4"
            >
              {step > 1 ? "Kembali" : "Kembali ke Keranjang"}
            </button>
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// --- FAQ ITEM COMPONENT ---
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <ChevronDownIcon
          className={cn(
            "w-6 h-6 transition-transform duration-300",
            isOpen ? "transform rotate-180" : ""
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: "16px" }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- CONTACT SECTION COMPONENT ---
function ContactSection() {
  const faqs = [
    {
      q: "Bagaimana cara memesan produk?",
      a: "Anda dapat memesan produk langsung melalui website ini dengan menambahkannya ke keranjang dan melanjutkan ke proses checkout. Anda juga bisa menghubungi kami melalui WhatsApp untuk pemesanan manual.",
    },
    {
      q: "Apa saja metode pembayaran yang diterima?",
      a: "Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri), E-Wallet (GoPay, OVO, Dana), dan pembayaran tunai saat pengambilan langsung (COD di tempat).",
    },
    {
      q: "Berapa lama waktu pengiriman?",
      a: "Untuk area Ambarawa dan sekitarnya, kami menyediakan pengiriman instan (1-3 jam). Untuk pengiriman ke luar kota, estimasi waktu adalah 2-4 hari kerja menggunakan kurir khusus makanan beku.",
    },
    {
      q: "Apakah produk Dapur Merifa halal?",
      a: "Ya, semua produk kami dibuat dari bahan-bahan yang 100% halal dan diolah di dapur yang menjaga kebersihan sesuai standar.",
    },
  ];

  return (
    <section id="kontak" className="py-20 bg-[#efecea]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Punya pertanyaan atau ingin bekerja sama? Jangan ragu untuk
            menghubungi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Kolom Kiri: Info & Form */}
          <div className="bg-white p-8 rounded-lg shadow-md h-full">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Kirim Pesan
            </h3>
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nama Anda"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Alamat Email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                />
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">
                  Subjek
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subjek Pesan"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Pesan
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  placeholder="Tulis pesan Anda di sini..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full font-semibold text-white"
                  style={{ backgroundColor: "#634832" }}
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
            <div className="mt-8 border-t pt-6 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Informasi Kontak
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Alamat:</strong> Jl. Pahlawan No. 45, Ambarawa, Kab.
                Semarang, Jawa Tengah
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Telepon/WA:</strong> +62 812-3456-7890
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> kontak@dapurmerifa.com
              </p>
              <p className="text-gray-600">
                <strong>Jam Operasional:</strong> Senin - Sabtu, 08:00 - 17:00
                WIB
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Peta & FAQ */}
          <div className="flex flex-col gap-8">
            <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126639.47935736497!2d110.3303641775084!3d-7.269092945417381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70809a4358e62d%3A0x4027a76e3528b30!2sAmbarawa%2C%2C%20Semarang%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1722531500931!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex-grow">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Tanya Jawab (FAQ)
              </h3>
              <div>
                {faqs.map((faq, index) => (
                  <FaqItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- PROMO SECTION COMPONENT ---
function PromoSection() {
  const BentoCard = ({ className, children }) => (
    <div
      className={cn("relative rounded-2xl overflow-hidden group", className)}
    >
      {children}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
    </div>
  );

  const CardContent = ({ title, subtitle, buttonText }) => (
    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full text-white">
      <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
      <p className="mt-2 text-sm md:text-base opacity-90">{subtitle}</p>
      <button className="mt-auto self-start flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
        {buttonText} <ArrowRightIcon />
      </button>
    </div>
  );

  const MobilePromoCard = ({ bgImage, title, subtitle, buttonText }) => (
    <div
      className="relative rounded-2xl overflow-hidden group h-48 bg-cover bg-center"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 p-6 flex flex-col h-full text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-1 text-sm opacity-90">{subtitle}</p>
        <button className="mt-auto self-start flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
          {buttonText} <ArrowRightIcon />
        </button>
      </div>
    </div>
  );

  return (
    <section id="promo" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Promo Spesial Bulan Ini
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Jangan lewatkan penawaran terbaik dari Dapur Merifa khusus untuk
            Anda!
          </p>
        </div>

        {/* Desktop Promo Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-[600px]">
          <BentoCard
            className="md:col-span-2 md:row-span-2 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://placehold.co/1200x1200/634832/FFFFFF?text=PROMO+1')",
            }}
          >
            <CardContent
              title="PROMO MERDEKA: DISKON 17%!"
              subtitle="Rayakan semangat kemerdekaan dengan kelezatan praktis. Berlaku untuk semua produk hingga 31 Agustus."
              buttonText="Belanja Diskon"
            />
          </BentoCard>
          <BentoCard
            className="md:col-span-2 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://placehold.co/1200x600/634832/FFFFFF?text=PROMO+2')",
            }}
          >
            <CardContent
              title="PAKET HEMAT KELUARGA"
              subtitle="Isi stok kulkas! Dapatkan 3 produk pilihan hanya dengan Rp99.000."
              buttonText="Lihat Paket"
            />
          </BentoCard>
          <BentoCard
            className="bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://placehold.co/600x600/634832/FFFFFF?text=PROMO+3')",
            }}
          >
            <CardContent
              title="GRATIS ONGKIR"
              subtitle="Min. belanja Rp75rb untuk area Ambarawa."
              buttonText="Cek Area"
            />
          </BentoCard>
          <BentoCard
            className="bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://placehold.co/600x600/634832/FFFFFF?text=PROMO+4')",
            }}
          >
            <CardContent
              title="COBAIN YANG BARU!"
              subtitle="Harga spesial untuk Pempek Kapal Selam."
              buttonText="Pesan Sekarang"
            />
          </BentoCard>
        </div>

        {/* Mobile Promo List */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          <MobilePromoCard
            bgImage="https://placehold.co/800x400/634832/FFFFFF?text=DISKON"
            title="DISKON 17%!"
            subtitle="Promo Merdeka hingga 31 Agustus."
            buttonText="Belanja Diskon"
          />
          <MobilePromoCard
            bgImage="https://placehold.co/800x400/634832/FFFFFF?text=PAKET+HEMAT"
            title="PAKET HEMAT"
            subtitle="3 produk pilihan Rp99.000."
            buttonText="Lihat Paket"
          />
        </div>
      </div>
    </section>
  );
}

// --- ABOUT SECTION COMPONENT ---
function AboutSection() {
  const ValueCard = ({ icon, title, children }) => (
    <div className="text-center p-6 bg-white/50 rounded-lg shadow-sm">
      <div
        className="flex items-center justify-center h-16 w-16 rounded-full mx-auto mb-4"
        style={{ backgroundColor: "rgba(99, 72, 50, 0.1)" }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );

  return (
    <section id="tentang" className="py-20 bg-[#efecea] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Cerita Hangat dari Dapur Merifa
          </h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Selamat datang di Dapur Merifa, tempat di mana setiap gigitan adalah
            cerita tentang kualitas, cinta, dan kehangatan rumah. Sejak 2015,
            kami berkomitmen untuk menyajikan makanan beku premium yang tidak
            hanya praktis, tetapi juga sehat dan lezat, layaknya masakan seorang
            ibu untuk keluarganya.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:pr-12 text-center md:text-left"
          >
            <h3
              className="text-lg font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#8a7967" }}
            >
              Sebuah Perjalanan dari Hati
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Kisah Pendiri Kami, <br /> Merlin Nur Pratiwi
            </h2>
            <p className="text-gray-700 leading-relaxed mt-4">
              Perjalanan Dapur Merifa berawal dari dapur sederhana saya di
              Ambarawa, Semarang. Sebagai seorang ibu, saya selalu ingin
              memberikan yang terbaik untuk keluarga, termasuk makanan yang
              lezat, sehat, dan bebas dari bahan pengawet.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Dari kecintaan inilah, pada tahun 2015, Dapur Merifa lahir. Saya
              ingin berbagi kelezatan resep-resep keluarga, memastikan setiap
              produk dibuat dari bahan baku segar pilihan dan diolah dengan
              standar kebersihan tertinggi. Dapur Merifa adalah cara saya
              menghadirkan kembali kehangatan meja makan di tengah kesibukan
              keluarga modern.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[400px] md:h-[500px]"
          >
            <img
              src="https://placehold.co/800x1000/efecea/634832?text=Pendiri"
              alt="Merlin Nur Pratiwi, pendiri Dapur Merifa"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard
            icon={<HeartIcon className="w-8 h-8 text-[#634832]" />}
            title="Dibuat dengan Cinta"
          >
            Setiap produk adalah hasil dari resep keluarga yang diolah dengan
            sepenuh hati.
          </ValueCard>
          <ValueCard
            icon={<LeafIcon className="w-8 h-8 text-[#634832]" />}
            title="Bahan Baku Pilihan"
          >
            Kami hanya menggunakan bahan segar berkualitas dari pemasok lokal
            terpercaya.
          </ValueCard>
          <ValueCard
            icon={<ShieldIcon className="w-8 h-8 text-[#634832]" />}
            title="100% Halal & Sehat"
          >
            Semua produk kami dijamin halal, tanpa tambahan MSG dan bahan
            pengawet.
          </ValueCard>
          <ValueCard
            icon={<HomeIcon className="w-8 h-8 text-[#634832]" />}
            title="Kualitas Rumahan"
          >
            Cita rasa otentik masakan rumah yang kini bisa Anda nikmati kapan
            saja.
          </ValueCard>
        </div>
      </div>
    </section>
  );
}

// --- ACCOUNT SECTION COMPONENT ---
function AccountSection({
  onLogout,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onProductClick,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [reviewingProductId, setReviewingProductId] = useState(null);

  const user = {
    name: "Merlin Nur Pratiwi",
    email: "merlin.np@example.com",
    points: 5250,
  };

  const orders = [
    {
      id: "DM-73845",
      date: "2 Agu 2025",
      status: "Selesai",
      total: "Rp 80.000",
      items: [allProducts[0], allProducts[1]],
    },
    {
      id: "DM-72910",
      date: "15 Jul 2025",
      status: "Selesai",
      total: "Rp 45.000",
      items: [allProducts[2]],
    },
    {
      id: "DM-72883",
      date: "1 Jul 2025",
      status: "Dibatalkan",
      total: "Rp 22.000",
      items: [allProducts[4]],
    },
  ];

  const rewards = [
    { name: "Voucher Diskon Rp 10.000", cost: 1000 },
    { name: "Gratis Ongkir", cost: 500 },
    { name: "Produk Gratis (Cireng)", cost: 2000 },
  ];

  const submittedReviews = [
    {
      productId: 3,
      productName: "Kebab Daging Sapi Spesial",
      rating: 5,
      comment:
        "Dagingnya banyak dan bumbunya meresap sempurna. Pasti pesan lagi!",
    },
    {
      productId: 8,
      productName: "Cireng Bumbu Rujak",
      rating: 4,
      comment: "Cirengnya renyah, bumbu rujaknya mantap pedasnya pas.",
    },
  ];

  const NavItem = ({ tabName, icon, children }) => {
    const Icon = icon;
    return (
      <button
        onClick={() => setActiveTab(tabName)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
          activeTab === tabName
            ? "bg-[#634832] text-white"
            : "hover:bg-gray-200"
        )}
      >
        <Icon className="w-6 h-6" />
        <span className="font-semibold">{children}</span>
      </button>
    );
  };

  const AddressForm = () => (
    <form className="space-y-4 mt-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alamat Jalan
        </label>
        <textarea
          rows="3"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provinsi
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
          >
            <option>Jawa Tengah</option>
            <option>D.I. Yogyakarta</option>
            <option>Jawa Barat</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kota/Kabupaten
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kode Pos
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Label Alamat
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="addressLabel"
              className="h-4 w-4 text-[#634832] focus:ring-[#634832]"
              defaultChecked
            />{" "}
            <span className="ml-2">Rumah</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="addressLabel"
              className="h-4 w-4 text-[#634832] focus:ring-[#634832]"
            />{" "}
            <span className="ml-2">Kantor</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={() => setShowAddressForm(false)}
          className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "#634832" }}
        >
          Simpan Alamat
        </button>
      </div>
    </form>
  );

  const StarRating = ({ rating, setRating }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating && setRating(star)}
        >
          <StarIcon
            className={cn(
              "w-6 h-6",
              star <= rating ? "text-yellow-400" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );

  const ReviewForm = ({ product, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    return (
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(product.id);
        }}
        className="mt-4 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating Anda
          </label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ulasan Anda
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
            placeholder="Bagaimana pendapat Anda tentang produk ini?"
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setReviewingProductId(null)}
            className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: "#634832" }}
          >
            Kirim Ulasan
          </button>
        </div>
      </motion.form>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "reviews":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Ulasan Saya</h2>
            <div className="space-y-4">
              <h3 className="font-semibold">Produk yang perlu diulas</h3>
              {orders
                .filter((o) => o.status === "Selesai")
                .flatMap((o) => o.items)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-sm border"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{product.name}</p>
                      </div>
                      <button
                        onClick={() =>
                          setReviewingProductId(
                            reviewingProductId === product.id
                              ? null
                              : product.id
                          )
                        }
                        className="px-4 py-2 rounded-lg font-semibold text-sm text-white"
                        style={{ backgroundColor: "#634832" }}
                      >
                        {reviewingProductId === product.id
                          ? "Tutup"
                          : "Tulis Ulasan"}
                      </button>
                    </div>
                    <AnimatePresence>
                      {reviewingProductId === product.id && (
                        <ReviewForm
                          product={product}
                          onSubmit={() => setReviewingProductId(null)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ))}
            </div>
            <div className="mt-12">
              <h3 className="font-semibold mb-4">Riwayat Ulasan Anda</h3>
              <div className="space-y-4">
                {submittedReviews.map((review) => (
                  <div
                    key={review.productId}
                    className="bg-white p-4 rounded-lg shadow-sm border"
                  >
                    <p className="font-semibold">{review.productName}</p>
                    <div className="flex items-center my-2">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-600 italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "points":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Poin & Hadiah</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 text-center">
              <p className="text-gray-600">Poin Anda Saat Ini</p>
              <p className="text-4xl font-bold text-[#634832]">
                {user.points.toLocaleString("id-ID")}
              </p>
            </div>
            <h3 className="font-semibold mb-4">Tukarkan Poin Anda</h3>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div
                  key={reward.name}
                  className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{reward.name}</p>
                    <p className="text-sm text-gray-500">
                      {reward.cost.toLocaleString("id-ID")} Poin
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:bg-gray-400"
                    style={{ backgroundColor: "#634832" }}
                    disabled={user.points < reward.cost}
                  >
                    Tukarkan
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "wishlist":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Daftar Keinginan (Wishlist)
            </h2>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                Anda belum memiliki produk favorit.
              </p>
            )}
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Riwayat Pesanan</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-4 rounded-lg shadow-sm border"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <div>
                      <p className="font-bold text-lg text-[#634832]">
                        {order.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Tanggal: {order.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "px-3 py-1 text-sm font-semibold rounded-full mt-2 sm:mt-0",
                        order.status === "Selesai" &&
                          "bg-green-100 text-green-800",
                        order.status === "Dibatalkan" &&
                          "bg-red-100 text-red-800"
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    {order.items.map((item) => item.name).join(", ")}
                  </p>
                  <p className="text-right font-bold mt-2">
                    Total: {order.total}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "details":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Detail Akun</h2>
            <form className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alamat Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                />
              </div>
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ubah Password
                </label>
                <input
                  type="password"
                  placeholder="Password Baru"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: "#634832" }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        );
      case "addresses":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Alamat Pengiriman</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="px-4 py-2 rounded-lg font-semibold text-sm text-white"
                style={{ backgroundColor: "#634832" }}
              >
                {showAddressForm ? "Tutup Form" : "Tambah Alamat"}
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-2">
                    Alamat Utama{" "}
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      Rumah
                    </span>
                  </h3>
                  <p className="text-gray-600">
                    Jl. Pahlawan No. 45, Ambarawa, Kab. Semarang, Jawa Tengah,
                    50611
                  </p>
                </div>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="text-sm text-[#634832] font-semibold"
                >
                  Ubah
                </button>
              </div>

              <AnimatePresence>
                {showAddressForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: "24px" }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden border-t pt-6"
                  >
                    <AddressForm />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      default: // dashboard
        const nextRewardCost = 7500;
        const progressPercentage = (user.points / nextRewardCost) * 100;
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Dasbor Akun</h2>
            <p className="text-gray-600 mb-6">
              Selamat datang kembali, {user.name}!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Latest Order */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-2">Pesanan Terbaru</h3>
                {orders.length > 0 ? (
                  <div>
                    <p className="font-semibold text-[#634832]">
                      {orders[0].id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span className="font-medium text-green-600">
                        {orders[0].status}
                      </span>
                    </p>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm text-[#634832] font-semibold mt-2"
                    >
                      Lacak Pesanan
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Anda belum memiliki pesanan.</p>
                )}
              </div>

              {/* Points */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-2">Poin Loyalitas</h3>
                <p className="text-3xl font-bold text-[#634832]">
                  {user.points.toLocaleString("id-ID")}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-[#634832] h-2.5 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {user.points.toLocaleString("id-ID")} /{" "}
                  {nextRewardCost.toLocaleString("id-ID")} Poin
                </p>
                <button
                  onClick={() => setActiveTab("points")}
                  className="text-sm text-[#634832] font-semibold mt-2"
                >
                  Tukarkan Hadiah
                </button>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <BoxIcon className="w-8 h-8 mx-auto text-[#634832]" />
                    <p className="text-sm font-semibold mt-1">Pesanan</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <HeartIcon className="w-8 h-8 mx-auto text-[#634832]" />
                    <p className="text-sm font-semibold mt-1">Wishlist</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("addresses")}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <MapPinIcon className="w-8 h-8 mx-auto text-[#634832]" />
                    <p className="text-sm font-semibold mt-1">Alamat</p>
                  </button>
                  <button
                    onClick={() => setActiveTab("details")}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <UserIcon className="w-8 h-8 mx-auto text-[#634832]" />
                    <p className="text-sm font-semibold mt-1">Detail Akun</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <nav className="space-y-2">
                <NavItem tabName="dashboard" icon={DashboardIcon}>
                  Dasbor
                </NavItem>
                <NavItem tabName="orders" icon={BoxIcon}>
                  Riwayat Pesanan
                </NavItem>
                <NavItem tabName="wishlist" icon={HeartIcon}>
                  Wishlist
                </NavItem>
                <NavItem tabName="points" icon={GiftIcon}>
                  Poin & Hadiah
                </NavItem>
                <NavItem tabName="reviews" icon={PencilSquareIcon}>
                  Ulasan Saya
                </NavItem>
                <NavItem tabName="details" icon={UserIcon}>
                  Detail Akun
                </NavItem>
                <NavItem tabName="addresses" icon={MapPinIcon}>
                  Alamat
                </NavItem>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-gray-200"
                >
                  <LogoutIcon className="w-6 h-6" />
                  <span className="font-semibold">Keluar</span>
                </button>
              </nav>
            </div>
          </aside>
          <main className="md:col-span-3">{renderContent()}</main>
        </div>
      </div>
    </motion.section>
  );
}

// --- AUTHENTICATION SECTION COMPONENT ---
function AuthSection({ onLogin, onRegister, onBack }) {
  const [isRegister, setIsRegister] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 py-24 md:py-32 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            {isRegister ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="text-2xl font-bold text-center mb-2">
                  Buat Akun Baru
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Daftar untuk checkout lebih cepat.
                </p>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nomor HP
                    </label>
                    <input
                      type="tel"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Konfirmasi Password
                    </label>
                    <input
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: "#634832" }}
                    >
                      Buat Akun
                    </button>
                  </div>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                  Sudah punya akun?{" "}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="font-semibold text-[#634832] hover:underline"
                  >
                    Masuk di sini
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="text-2xl font-bold text-center mb-2">
                  Selamat Datang Kembali
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Masuk untuk pengalaman belanja terbaik.
                </p>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email atau No. HP
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#634832] focus:ring-[#634832]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-[#634832] focus:ring-[#634832] border-gray-300 rounded"
                      />
                      <label htmlFor="remember">Ingat saya</label>
                    </div>
                    <a
                      href="#"
                      className="font-semibold text-[#634832] hover:underline"
                    >
                      Lupa password?
                    </a>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: "#634832" }}
                    >
                      Masuk
                    </button>
                  </div>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                  Belum punya akun?{" "}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="font-semibold text-[#634832] hover:underline"
                  >
                    Daftar di sini
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={onBack}
          className="w-full text-center text-sm text-gray-600 hover:text-[#634832] mt-4"
        >
          Kembali ke Beranda
        </button>
      </div>
    </motion.section>
  );
}

// --- TOAST NOTIFICATION COMPONENT ---
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Hilang setelah 3 detik

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-3 rounded-full shadow-lg"
      style={{ backgroundColor: "#634832", color: "white" }}
    >
      <CheckCircleIcon className="w-6 h-6 text-white" />
      <p className="font-semibold">{message}</p>
    </motion.div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState("home"); // 'home', 'productDetail', 'cart', 'checkout', 'account', 'auth'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [party, setParty] = useState(false);
  const prevCartCountRef = useRef(cart.length);

  useEffect(() => {
    const currentCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const prevCartCount = prevCartCountRef.current;

    if (currentCartCount > prevCartCount) {
      setParty(true);
      const timer = setTimeout(() => setParty(false), 1000);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = currentCartCount;
  }, [cart]);

  const showToast = (message) => {
    setToast({ show: true, message });
  };

  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(
      `${quantity > 1 ? quantity + "x " : ""}"${product.name}" ditambahkan!`
    );
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isFavorite = prevWishlist.some((item) => item.id === product.id);
      if (isFavorite) {
        showToast(`"${product.name}" dihapus dari wishlist.`);
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        showToast(`"${product.name}" ditambahkan ke wishlist.`);
        return [...prevWishlist, product];
      }
    });
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setView("productDetail");
    window.scrollTo(0, 0);
  };

  const handleOrderComplete = () => {
    setCart([]);
    navigateToHome();
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView("account");
    showToast("Berhasil Masuk!");
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setView("account");
    showToast("Akun berhasil dibuat!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView("home");
    showToast("Anda telah keluar.");
  };

  const handleBuyNow = (product, quantity) => {
    handleAddToCart(product, quantity);
    navigateToCheckout();
  };

  const navigateToHome = () => {
    setView("home");
    setSelectedProduct(null);
  };
  const navigateToCart = () => {
    setView("cart");
    setSelectedProduct(null);
  };
  const navigateToCheckout = () => {
    setView("checkout");
    setSelectedProduct(null);
  };
  const navigateToAccount = () => {
    setView("account");
    setSelectedProduct(null);
  };
  const navigateToAuth = () => {
    setView("auth");
    setSelectedProduct(null);
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      navigateToAccount();
    } else {
      navigateToAuth();
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderContent = () => {
    switch (view) {
      case "auth":
        return (
          <AuthSection
            key="auth"
            onLogin={handleLogin}
            onRegister={handleRegister}
            onBack={navigateToHome}
          />
        );
      case "account":
        return (
          <AccountSection
            key="account"
            onLogout={handleLogout}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductSelect}
          />
        );
      case "checkout":
        return (
          <CheckoutSection
            key="checkout"
            cart={cart}
            onBackToCart={navigateToCart}
            onOrderComplete={handleOrderComplete}
          />
        );
      case "cart":
        return (
          <CartSection
            key="cart"
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onBackClick={navigateToHome}
            onCheckout={navigateToCheckout}
          />
        );
      case "productDetail":
        return (
          <ProductDetailSection
            key={selectedProduct.id}
            product={selectedProduct}
            onBackClick={navigateToHome}
            onProductClick={handleProductSelect}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onBuyNow={handleBuyNow}
          />
        );
      default:
        return (
          <motion.div
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection />
            <ProductSection
              onProductClick={handleProductSelect}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
            />
            <PromoSection />
            <AboutSection />
            <ContactSection />
          </motion.div>
        );
    }
  };

  return (
    <main className="bg-[#f0f0f0]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
        .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
        .aspect-h-9 { /* no styles needed if padding-bottom is set */ }
        .aspect-w-16 > iframe { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
        .aspect-square { aspect-ratio: 1 / 1; }
        .aspect-\\[4\\/5\\] { aspect-ratio: 4 / 5; }
      `}</style>

      <DapurMerifaHeader
        visible={true}
        onLogoClick={navigateToHome}
        onCartClick={navigateToCart}
        onAuthAction={handleAuthAction}
        isLoggedIn={isLoggedIn}
        cartItemCount={cartItemCount}
        party={party}
      />

      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>

      <AnimatePresence>
        {toast.show && (
          <Toast
            message={toast.message}
            onClose={() => setToast({ show: false, message: "" })}
          />
        )}
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
