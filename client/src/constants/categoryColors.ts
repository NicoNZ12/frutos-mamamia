type ColorStyle = {
  bg: string;
  text: string;
}

type CategoryColors = Record<string, ColorStyle>;

export const categoryColors: CategoryColors = {
  "MIX DE FRUTAS": { bg: "bg-yellow-100", text: "text-yellow-800" },
  "CONDIMENTOS Y ESPECIAS": { bg: "bg-orange-100", text: "text-orange-800" },
  "HARINAS": { bg: "bg-amber-100", text: "text-amber-800" },
  "FRUTOS SECOS": { bg: "bg-red-100", text: "text-red-800" },
  "DESHIDRATADOS": { bg: "bg-lime-100", text: "text-lime-800" },
  "CEREALES Y SEMILLAS": { bg: "bg-green-100", text: "text-green-800" },
  "ENDULZANTES": { bg: "bg-pink-100", text: "text-pink-800" },
  "VARIOS": { bg: "bg-gray-100", text: "text-gray-800" },
  "HIERBAS E INFUSIONES": { bg: "bg-teal-100", text: "text-teal-800" },
  "LECHES VEGETALES": { bg: "bg-cyan-100", text: "text-cyan-800" },
  "LEGUMBRES": { bg: "bg-purple-100", text: "text-purple-800" },
  "CONFITURAS": { bg: "bg-fuchsia-100", text: "text-fuchsia-800" },
};